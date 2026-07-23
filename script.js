// ==========================================
// 1. 기본 글로벌 변수 선언
// ==========================================
let index = 0;
let scores = {};
let currentResultPowerName = '';
let currentLang = 'ko'; // 기본 언어: 한국어

const $ = (id) => document.getElementById(id);

// ==========================================
// 2. 다국어 텍스트 데이터 (i18n)
// ==========================================
const i18n = {
  ko: {
    title: "나와 잘 맞는<br>엑소 초능력 찾기",
    subtitle: "당신만의 능력을 찾아보세요",
    introTitle: "당신의 능력이 깨어납니다",
    introDesc: "정답은 없어요. 가장 마음이 가는 선택지를 골라보세요.",
    startBtn: "능력 찾기 시작하기 →",
    restartBtn: "다시 테스트하기",
    shareTwitter: "X(트위터)에 공유하기",
    copyLink: "🔗 링크 복사",
    resultPrefix: "당신의 능력은 ",
    copySuccess: "링크가 복사되었습니다! 원하시는 곳에 공유해보세요. 📋",
    questions: [
      { q:'낯선 환경에 놓였을 때, 나는?', a:[['A','일단 분위기를 살피며 자연스럽게 적응한다.','water'],['B','내 방식대로 빠르게 주도권을 잡는다.','fire'],['C','문제 해결에 필요한 행동부터 한다.','strength']] },
      { q:'친구가 힘들어할 때 가장 먼저 하는 일은?', a:[['A','옆에서 조용히 이야기를 들어준다.','healing'],['B','재미있는 계획을 세워 기분 전환을 돕는다.','teleport'],['C','해결할 방법을 함께 찾아본다.','wind']] },
      { q:'가장 끌리는 주말 풍경은?', a:[['A','파도 소리를 들으며 느긋하게 쉬는 시간','water'],['B','사랑하는 사람과 보내는 편안한 시간','healing'],['C','가볍게 떠나는 즉흥 여행','teleport']] },
      { q:'팀 프로젝트에서 나의 역할은?', a:[['A','흔들릴 때 중심을 잡고 끝까지 밀어붙인다.','strength'],['B','주도적으로 의견을 제시하고 팀을 이끈다.','fire'],['C','상황에 따라 새로운 아이디어와 방향을 제안한다.','wind']] },
      { q:'나를 가장 잘 표현하는 단어는?', a:[['A','책임감','strength'],['B','유연함','water'],['C','자유로움','wind']] },
      { q:'내가 영화 속 주인공이라면 어떤 장면이 좋을까?', a:[['A','예상 못 한 곳에서 등장하는 장면','teleport'],['B','누군가를 다시 웃게 만드는 장면','healing'],['C','모두 앞에서 용감하게 나서는 장면','fire']] },
      { q:'친구들과 여행을 간다면 나는 주로?', a:[['A','짐이나 예약처럼 필요한 일을 맡는다','strength'],['B','친구들의 컨디션을 챙긴다','healing'],['C','지도를 켜고 길을 안내한다','teleport']] },
      { q:'마음이 복잡할 때 가장 효과적인 방법은?', a:[['A','혼자 조용히 생각정리 하기','water'],['B','밖에 나가 산책하기','wind'],['C','좋아하는 음악을 크게 듣기','fire']] }
    ],
    powers: {
      water: { name:'물', tag:'WATER · 공감과 유연함', desc:'당신은 물처럼 부드럽지만 강한 사람이에요. 주변의 감정을 세심하게 읽고, 어떤 상황에서도 나만의 흐름을 찾아갑니다. 부드러워 보여도 필요할땐 강한 흐름을 만들어낼 수 있어요. 팀에서는 갈등을 조율하거나 분위기를 안정시키는 역할과도 잘 맞아요.', traits:['공감 능력','침착함','적응력'] },
      fire: { name:'불', tag:'FIRE · 열정과 추진력', desc:'당신은 주위를 밝히는 뜨거운 에너지를 가졌어요. 하고 싶은 일이 생기면 망설이지 않고, 사람들에게 용기를 건넵니다. 새로운 도전이나 중요한 순간에 더 큰 힘을 발휘해요.', traits:['열정','활발함','용기'] },
      strength: { name:'힘', tag:'FORCE · 책임감과 의지', desc:'당신은 든든한 버팀목이 되는 사람이에요. 어려운 순간에도 쉽게 포기하지 않고, 믿는 것을 행동으로 증명합니다. 실제로 해결가능한 행동을 하는 타입으로, 위기에서 모두가 의지하는 사람이 될 수 있어요.', traits:['책임감','끈기','신뢰감'] },
      teleport: { name:'순간이동', tag:'TELEPORT · 호기심과 기민함', desc:'당신은 변화와 새로운 경험을 즐기는 탐험가예요. 변화에 잘 적응하여 빠르게 기회를 포착하고, 남들이 생각하지 못한 길을 발견합니다. 호기심이 많고 어디든 가보고 싶어하는 사람에게 잘 맞아요.', traits:['호기심','재치','실행력'] },
      wind: { name:'바람', tag:'WIND · 자유와 창의성', desc:'당신은 틀에 갇히지 않는 자유로운 영혼이에요. 자유로운 시선으로 세상을 바라보며, 새로운 가능성을 불어넣습니다. 한가지 방식에 갇히지 않고 자연스럽게 흐름을 바꾸며, 답답한 분위기를 환기하는데 강해요.', traits:['창의성','자유로움','낙관성'] },
      healing: { name:'치유', tag:'HEALING · 다정함과 따뜻함', desc:'당신은 사람들의 마음을 편안하게 하는 존재예요. 진심 어린 관심과 다정한 말로 주변에 좋은 에너지를 전합니다. 다른 사람의 아픔이나 분위기를 잘 알아차리고, 곁에 있는 것만으로도 편안함을 줘요. 사람과 사람 사이를 따뜻하게 이어주는 역할을 잘 해요.', traits:['배려심','다정함','평온함'] }
    }
  },
  en: {
    title: "Find Your<br>EXO Power Match",
    subtitle: "Discover your unique superpower",
    introTitle: "Your Power Is Awakening",
    introDesc: "There are no right answers. Choose what resonates with you most.",
    startBtn: "Start Test →",
    restartBtn: "Test Again",
    shareTwitter: "Share on X",
    copyLink: "🔗 Copy Link",
    resultPrefix: "Your Power is ",
    copySuccess: "Link copied to clipboard! 📋",
    questions: [
      { q:'When placed in an unfamiliar environment, I...', a:[['A','Observe the vibe and adapt naturally.','water'],['B','Quickly take initiative my way.','fire'],['C','Focus on actions needed to solve problems.','strength']] },
      { q:'When a friend is going through a tough time, I...', a:[['A','Quietly listen to their story by their side.','healing'],['B','Plan something fun to cheer them up.','teleport'],['C','Help them figure out practical solutions.','wind']] },
      { q:'My dream weekend landscape is...', a:[['A','Relaxing calmly while listening to wave sounds.','water'],['B','Cozy quality time with loved ones.','healing'],['C','A spontaneous getaway trip.','teleport']] },
      { q:'My role in a team project is...', a:[['A','Staying grounded and pushing through until the end.','strength'],['B','Leading the team with strong opinions.','fire'],['C','Suggesting fresh ideas and new directions.','wind']] },
      { q:'The word that best describes me is...', a:[['A','Responsibility','strength'],['B','Flexibility','water'],['C','Freedom','wind']] },
      { q:'If I were the main character in a movie, my scene would be...', a:[['A','Making an unexpected grand entrance.','teleport'],['B','Bringing a smile back to someone\'s face.','healing'],['C','Bravely stepping up in front of everyone.','fire']] },
      { q:'When traveling with friends, I usually...', a:[['A','Take care of essentials like packing and reservations.','strength'],['B','Check on everyone\'s condition and mood.','healing'],['C','Turn on the map and lead the way.','teleport']] },
      { q:'My way to recharge after a tiring day is...', a:[['A','Quietly organizing my thoughts alone.','water'],['B','Going outside for a walk.','wind'],['C','Listening to my favorite music loudly.','fire']] }
    ],
    powers: {
      water: { name:'Water', tag:'WATER · Empathy & Adaptability', desc:'Like water, you are gentle yet resilient. You read emotions delicately and always find your own flow in any situation.', traits:['Empathy','Calmness','Adaptability'] },
      fire: { name:'Fire', tag:'FIRE · Passion & Drive', desc:'You possess a passionate energy that lights up your surroundings. You never hesitate when you find something you want to pursue.', traits:['Passion','Energy','Courage'] },
      strength: { name:'Force', tag:'FORCE · Responsibility & Will', desc:'You are a reliable pillar for others. You don\'t give up easily and prove your beliefs through action.', traits:['Responsibility','Persistence','Trust'] },
      teleport: { name:'Teleportation', tag:'TELEPORT · Curiosity & Agility', desc:'You are an explorer who thrives on change and new experiences. You adapt quickly and spot opportunities others miss.', traits:['Curiosity','Wit','Execution'] },
      wind: { name:'Wind', tag:'WIND · Freedom & Creativity', desc:'You are a free spirit unrestricted by rules. You look at the world with a fresh perspective and bring vitality to stifling atmospheres.', traits:['Creativity','Freedom','Optimism'] },
      healing: { name:'Healing', tag:'HEALING · Warmth & Kindness', desc:'You bring comfort to people\'s hearts. With genuine warmth, you radiate positive energy and connect people together.', traits:['Caring','Kindness','Serenity'] }
    }
  }
};

// 초능력별 이모티콘 및 네온 컬러 스타일 지정
const powerIcons = {
  water: { icon: '💧', color: '#60dfff' },
  fire: { icon: '🔥', color: '#ff846a' },
  strength: { icon: '✊', color: '#d692ff' },
  teleport: { icon: '🛸', color: '#908e8e' },
  wind: { icon: '🌀', color: '#6cef8a' },
  healing: { icon: '🌿', color: '#ffacd8' }
};

// ==========================================
// 3. 주요 실행 함수
// ==========================================
function start() {
  index = 0;
  scores = Object.fromEntries(Object.keys(powerIcons).map((key) => [key, 0]));
  $('intro').classList.add('hidden');
  $('result').classList.add('hidden');
  $('quiz').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  const currentQuestions = i18n[currentLang].questions;
  const item = currentQuestions[index];
  $('count').textContent = `QUESTION ${index + 1} / ${currentQuestions.length}`;
  $('bar').style.width = `${(index / currentQuestions.length) * 100}%`;
  $('question').textContent = item.q;
  $('answers').innerHTML = '';
  item.a.forEach(([letter, text, power]) => {
    const button = document.createElement('button');
    button.className = 'answer';
    button.innerHTML = `<span>${letter}</span>${text}`;
    button.onclick = () => {
      scores[power] += 1;
      index += 1;
      index < currentQuestions.length ? renderQuestion() : showResult();
    };
    $('answers').append(button);
  });
}

function showResult() {
  const currentPowers = i18n[currentLang].powers;
  const key = Object.keys(currentPowers).reduce((best, k) => scores[k] > scores[best] ? k : best, 'water');
  const power = currentPowers[key];
  const style = powerIcons[key];

  currentResultPowerName = power.name;

  $('quiz').classList.add('hidden');
  $('result').classList.remove('hidden');
  $('resultIcon').textContent = style.icon;
  $('resultIcon').style.color = style.color;
  $('resultTag').textContent = power.tag;
  $('resultTag').style.color = style.color;
  $('resultName').textContent = `${i18n[currentLang].resultPrefix}${power.name}`;
  $('resultName').style.color = style.color;
  $('description').textContent = power.desc;
  $('traits').innerHTML = power.traits.map((trait) => `<span># ${trait}</span>`).join('');
}

// ------------------------------------------
// 🔗 공유 기능
// ------------------------------------------
function shareTwitter() {
  const text = currentLang === 'ko' 
    ? `⚡ 나와 잘 맞는 엑소 세계관 초능력은 [ ${currentResultPowerName} ]!\n당신의 숨겨진 초능력을 지금 확인해보세요!`
    : `⚡ My EXO Power Match is [ ${currentResultPowerName} ]!\nFind out your hidden superpower now!`;
  const url = window.location.href;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=600,height=450');
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert(i18n[currentLang].copySuccess);
  }).catch(() => {
    alert('링크 복사에 실패했습니다.');
  });
}

// ------------------------------------------
// 🌐 언어 변경 처리 함수 (한국어 / English)
// ------------------------------------------
function setLanguage(lang) {
  currentLang = lang;
  
  const koBtn = $('langKo');
  const enBtn = $('langEn');
  if (koBtn && enBtn) {
    koBtn.classList.toggle('active', lang === 'ko');
    enBtn.classList.toggle('active', lang === 'en');
  }

  // UI 텍스트 언어 변환
  const h1 = document.querySelector('h1');
  const subtitle = document.querySelector('.subtitle');
  const introH2 = document.querySelector('#intro h2');
  const introCenter = document.querySelector('#intro .center');

  if (h1) h1.innerHTML = i18n[lang].title;
  if (subtitle) subtitle.textContent = i18n[lang].subtitle;
  if (introH2) introH2.textContent = i18n[lang].introTitle;
  if (introCenter) introCenter.textContent = i18n[lang].introDesc;
  if ($('startBtn')) $('startBtn').textContent = i18n[lang].startBtn;
  if ($('restartBtn')) $('restartBtn').textContent = i18n[lang].restartBtn;

  // 공유 버튼 텍스트 변경
  if ($('copyLinkBtn')) $('copyLinkBtn').textContent = i18n[lang].copyLink;

  // 현재 진행 중인 화면 즉시 갱신
  if ($('quiz') && !$('quiz').classList.contains('hidden')) {
    renderQuestion();
  } else if ($('result') && !$('result').classList.contains('hidden')) {
    showResult();
  }
}

// ==========================================
// 4. 이벤트 연결
// ==========================================
if ($('startBtn')) $('startBtn').onclick = start;
if ($('restartBtn')) $('restartBtn').onclick = start;
if ($('shareTwitterBtn')) $('shareTwitterBtn').onclick = shareTwitter;
if ($('copyLinkBtn')) $('copyLinkBtn').onclick = copyLink;