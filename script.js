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
    introDesc: "There are no right answers. Choose what resonates with you most.<br>A recommended song matched to your power will be provided.<br>The song is determined by the combination of your top two powers.",
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
const songRecommendationsKo = {
  water: {
    fire: { title: "Artificial Love", desc: "차가운 물의 힘 안에 뜨거운 불꽃을 숨긴 타입. 평소엔 침착하지만, 소중한 것을 지키는 순간 거센 증기와 파도를 일으킨다" },
    strength: { title: "오아시스 (Oasis)", desc: "물처럼 유연하게 흐르면서도, 거대한 파도처럼 모두를 지켜 내는 단단한 힘을 가진 타입" },
    teleport: { title: "기억을 걷는 밤 (Walk On Memories)", desc: "물결을 타듯 공간을 가로질러, 필요한 곳에 가장 먼저 닿는 신비로운 이동 능력을 가진 타입" },
    wind: { title: "Flatline", desc: "차가운 바람처럼 숨을 앗아가고, 거친 물결마저 고요히 멈춰 세우는 치명적 정적을 만들어내는 타입" },
    healing: { title: "Sing For You", desc: "맑은 물이 상처를 씻어 내듯, 지친 사람의 마음과 몸을 조용히 회복시키는 따뜻한 타입" }
  },
  fire: {
    water: { title: "Thunder", desc: "불꽃 같은 번개와 거센 비가 만나 폭풍을 만드는 타입. 뜨거운 추진력을 물의 흐름으로 증폭시켜, 한 번 움직이면 거대한 변화를 일으킨다" },
    strength: { title: "Back it up", desc: "쉽게 꺼지지 않는 불꽃처럼 끝까지 버티는 타입. 강한 힘으로 앞을 막아서는 동시에, 포기하지 않는 의지로 모두를 이끈다" },
    teleport: { title: "Electric Kiss", desc: "불꽃이 번쩍이는 찰나처럼 시야에서 사라졌다가 목표 앞에 나타나는 타입. 빠른 판단과 폭발적인 공격으로 빈틈을 만들지 않는다" },
    wind: { title: "Ko Ko Bop", desc: "뜨거운 불꽃에 자유로운 바람을 더한 타입. 불길을 거센 회오리처럼 퍼뜨리며, 어디에도 얽매이지 않고 자신만의 속도로 나아간다" },
    healing: { title: "Lucky", desc: "따뜻한 불꽃으로 얼어붙은 마음을 녹이고, 곁에 있는 사람에게 용기와 행운을 전하는 다정함" }
  },
  strength: {
    water: { title: "MAMA", desc: "깊고 거대한 파도가 웅장하게 밀려와 모든 것을 단숨에 잠식하고 짓눌러버리는 파괴력" },
    fire: { title: "Power", desc: "뜨겁게 타오르는 불꽃에 강력한 힘을 더해, 어떤 위기마저 정면으로 돌파해 버리는 폭발적인 에너지" },
    teleport: { title: "중독 (Overdose)", desc: "순간이동하듯 빈틈없이 파고들어, 묵직한 힘으로 상대를 단숨에 붙잡고 빠져나갈 수 없게 만드는 강렬한 중독성" },
    wind: { title: "Don't Fight the Feeling", desc: "거센 바람을 타고 폭발하듯 뻗어 나가는 힘처럼, 자유로운 리듬 위를 강렬하게 장악하는 에너지" },
    healing: { title: "전야 (The Eve)", desc: "강한 힘으로 감싸 안은 뒤 상처까지 어루만져, 묵직하면서도 부드럽게 마음을 회복시키는 카리스마" }
  },
  teleport: {
    water: { title: "Groove", desc: "물결을 타듯 공간 사이를 부드럽게 넘나드는 타입. 소리 없이 사라졌다가 원하는 곳에 자연스럽게 모습을 드러낸다" },
    fire: { title: "Lotto", desc: "불꽃처럼 예측할 수 없는 순간에 나타나는 타입. 위험한 곳에도 망설임 없이 뛰어들어 판을 뒤집는 이동 능력을 지녔다" },
    strength: { title: "Obsession", desc: "강한 힘을 실은 순간이동으로 적의 빈틈을 정확히 파고드는 타입. 사라졌다 나타나는 한 번의 움직임만으로 전세를 바꾼다" },
    wind: { title: "유성우 (Lady Luck)", desc: "바람과 함께 하늘을 가로지르듯 자유롭게 이동하는 타입. 눈 깜짝할 사이에 멀어진 곳까지 닿는 가벼운 발걸음이 특징이다" },
    healing: { title: "Angel (너의 세상으로)", desc: "도움이 필요한 사람 곁이라면 어디든 즉시 닿는 타입. 상처 입은 이들에게 가장 먼저 찾아가 안전한 곳으로 데려온다" }
  },
  wind: {
    water: { title: "후폭풍 (Bad Dream)", desc: "거센 바람을 타고 몰아친 물결처럼 차갑게 휘감겨, 벗어나려 할수록 더 깊이 빠져드는 치명적인 잔상" },
    fire: { title: "Crazy", desc: "불길처럼 타오르는 치명적인 열망에 거친 바람이 몰아쳐, 아무도 막을 수 없게 폭발해 버리는 순수함" },
    strength: { title: "Monster", desc: "모든 것을 쓸어버리는 거친 태풍처럼 몰아쳐, 상대를 단숨에 제압하고 짓눌러버리는 압도적인 파괴력" },
    teleport: { title: "Paradise", desc: "눈 깜짝할 사이 바람을 가르며 낯선 곳으로 사라져, 현실마저 잊게 만드는 자유롭고 아찔한 해방감" },
    healing: { title: "Cloud 9", desc: "거친 바람마저 잠재우는 따뜻한 숨결처럼 스며들어, 지친 마음을 단숨에 감싸고 되살리는 달콤한 위로" }
  },
  healing: {
    water: { title: "Universe", desc: "차가운 아픔을 맑고 따뜻한 물결로 부드럽게 씻어내며 마음을 감싸주는 감성적인 치유" },
    fire: { title: "LIGHTSABER", desc: "어둠 속에서도 따뜻한 빛과 온기를 만들어 내는 타입. 지친 사람에게 다시 일어설 용기와 희망을 건넨다" },
    strength: { title: "지나갈 테니 (Been Through)", desc: "새벽의 차가운 기운이 지난 밤의 상처를 스쳐 식혀주고, 묵직한 서늘함으로 다시 나아갈 바닥을 단단하게 받쳐준다" },
    teleport: { title: "Let Me In", desc: "도움이 필요한 곳이라면 어디든 가장 먼저 닿는 타입. 멀리 있는 사람의 마음에도 순식간에 다가가 위로를 전한다" },
    wind: { title: "Heaven", desc: "부드러운 바람처럼 곁을 감싸며 답답한 마음을 가볍게 풀어 주는 타입. 조용하지만 오래 남는 회복의 힘을 지녔다" }
  }
};
const songRecommendationsEn = {
  water: {
    fire: { title: "Artificial Love", desc: "A type that hides burning flames inside calm water. Usually quiet, but creates fierce steam and surging waves the moment they protect what matters." },
    strength: { title: "오아시스 (Oasis)", desc: "A type with the solid strength to flow flexibly like water while defending everyone like a massive wave." },
    teleport: { title: "기억을 걷는 밤 (Walk On Memories)", desc: "A type with a mysterious mobility, riding the waves through space to reach wherever needed first." },
    wind: { title: "Flatline", desc: "A type that creates a lethal silence, taking away breath like a cold wind and stilling even rough waters." },
    healing: { title: "Sing For You", desc: "A warm type that quietly restores weary minds and bodies, just as clear water washes away wounds." }
  },
  fire: {
    water: { title: "Thunder", desc: "A type that creates a storm when fiery lightning meets heavy rain. Amplifying burning passion with the flow of water, a single move triggers massive change." },
    strength: { title: "Back it up", desc: "A type that holds out until the end like an unextinguishable flame. Blocking obstacles with raw force while leading everyone with unyielding determination." },
    teleport: { title: "Electric Kiss", desc: "A type that vanishes and instantly appears before a target like a flash of fire. Leaves no openings with quick judgment and explosive strikes." },
    wind: { title: "Ko Ko Bop", desc: "A type that adds free-spirited wind to burning flames. Spreading sparks like a fierce whirlwind, advancing at their own pace unbound by anything." },
    healing: { title: "Lucky", desc: "A gentle type that melts frozen hearts with warm flames and delivers courage and good fortune to those nearby." }
  },
  strength: {
    water: { title: "MAMA", desc: "A destructive force where deep, massive waves surge majestically to engulf and crush everything in an instant." },
    fire: { title: "Power", desc: "An explosive energy that adds strong power to ablaze flames, breaking straight through any crisis." },
    teleport: { title: "중독 (Overdose)", desc: "An intense, addictive force that teleports into openings, seizing targets with heavy power so they cannot escape." },
    wind: { title: "Don't Fight the Feeling", desc: "An energy that dominates free rhythms with raw force, like power bursting forth on a strong wind." },
    healing: { title: "전야 (The Eve)", desc: "A charismatic type that gently restores hearts with a heavy yet soft touch, embracing with solid strength before healing wounds." }
  },
  teleport: {
    water: { title: "Groove", desc: "A type that gracefully glides through space like riding water currents. Vanishing soundlessly and reappearing naturally wherever desired." },
    fire: { title: "Lotto", desc: "A type that emerges in unpredictable moments like fire. Possessing mobility that leaps into danger without hesitation to turn the tide." },
    strength: { title: "Obsession", desc: "A type that precisely targets openings with power-infused teleportation. Shifting the momentum with a single move of vanishing and reappearing." },
    wind: { title: "유성우 (Lady Luck)", desc: "A type that moves freely like cutting through the sky with the wind. Characterized by light footsteps that reach distant places in the blink of an eye." },
    healing: { title: "Angel (너의 세상으로)", desc: "A type that instantly reaches anyone in need. Finding injured souls first to bring them to a safe place." }
  },
  wind: {
    water: { title: "후폭풍 (Bad Dream)", desc: "A fatal lingering trace that wraps around coldly like waves riding strong winds, drawing you deeper the more you try to escape." },
    fire: { title: "Crazy", desc: "Pure intensity where wild winds blow over a burning desire like fire, exploding beyond anyone's control." },
    strength: { title: "Monster", desc: "An overwhelming, destructive force that sweeps through like a fierce typhoon, instantly overpowering and subduing opponents." },
    teleport: { title: "Paradise", desc: "A thrilling sense of freedom that cuts through the wind to vanish into unfamiliar places, making you forget reality in an instant." },
    healing: { title: "Cloud 9", desc: "A sweet comfort that wraps around weary hearts, seeping in like a warm breath that calms even harsh winds." }
  },
  healing: {
    water: { title: "Universe", desc: "An emotional healing that gently wraps around the heart, washing away cold pain with clear, warm waves." },
    fire: { title: "LIGHTSABER", desc: "A type that creates warm light and heat even in darkness, offering courage and hope to weary people so they can rise again." },
    strength: { title: "지나갈 테니 (Been Through)", desc: "A heavy coolness that cools down past wounds with a chilly dawn breeze, solidly supporting the ground to move forward again." },
    teleport: { title: "Let Me In", desc: "A type that reaches help-needing places first. Instantly drawing close to distant hearts to offer comfort." },
    wind: { title: "Heaven", desc: "A type that gently wraps around you like a soft breeze, lightening a heavy heart. Possessing a quiet yet long-lasting power of recovery." }
  }
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
  // 점수가 높은 순서대로 정렬 (1위: 메인, 2위: 서브)
  const sortedPowers = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const mainKey = sortedPowers[0];
  
  // 2. 메인을 제외한 나머지 초능력 후보
  const otherPowers = sortedPowers.filter(p => p !== mainKey);
  
  // 3. 2위/3위 동점일 때 편향 방지 (랜덤 처리)
  let subKey;
  if (scores[otherPowers[0]] === scores[otherPowers[1]]) {
    subKey = Math.random() < 0.5 ? otherPowers[0] : otherPowers[1];
  } else {
    subKey = otherPowers[0];
  }

  // 4. 예외 안전장치
  if (!subKey) {
    const remaining = Object.keys(powerIcons).filter(p => p !== mainKey);
    subKey = remaining[Math.floor(Math.random() * remaining.length)];
  }
  const power = i18n[currentLang].powers[mainKey];
  const style = powerIcons[mainKey];

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

// 5. 🎧 현재 언어(currentLang)에 맞는 추천곡 데이터 선택
  const songData = currentLang === 'en' ? songRecommendationsEn : songRecommendationsKo;
  const recSong = songData[mainKey][subKey];
  const subPowerName = i18n[currentLang].powers[subKey].name;

  // 6. UI 안내 문구도 언어에 맞게 분기
  const guideTitle = currentLang === 'en'
    ? `💡 Main [${power.name}] + Sub [${subPowerName}]`
    : `💡 주 능력 [${power.name}] 다음으로 가까운 <b>근접 초능력: [${subPowerName}]</b>`;

  const guideDesc = currentLang === 'en'
    ? `A recommended song tailored for your unique combination of powers.`
    : `두 성향이 함께 어우러진 당신을 위한 맞춤 추천곡입니다.`;

  const recArea = $('recommendArea');
  if (recArea) {
    recArea.innerHTML = `
      <div style="margin-top:14px; padding:14px 16px; background:rgba(255,255,255,0.08); border-radius:12px; text-align:left; border:1px solid rgba(255,255,255,0.15);">
        <p style="font-size:0.88rem; color:#e0e0e0; margin:0 0 4px 0; font-weight:500;">
          ${guideTitle}
        </p>
        <p style="font-size:0.82rem; color:#b0b0b0; margin:0 0 10px 0; line-height:1.4;">
          ${guideDesc}
        </p>
        <div style="padding-top:8px; border-top:1px dashed rgba(255,255,255,0.2);">
          <h4 style="font-size:1rem; color:#fff; margin:0 0 4px 0; font-weight:bold;">🎵 EXO - ${recSong.title}</h4>
          <p style="font-size:0.85rem; color:#e0e0e0; margin:0; line-height:1.4;">${recSong.desc}</p>
        </div>
      </div>
    `;
  }
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

  document.body.className = `lang-${lang}`;
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
