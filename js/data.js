// 단어 데이터: [그림 파일 이름, 영어, 한글, (읽을 소리: 영어와 다를 때만)]
// 출처: 앱/먹고입어요/기획서.md 3장 (테마와 단어), 5장 (테마별 게임 배정)
// games: [게임 id, 단계 1·2·3] 배정. mission: 놀이 끝에 보여 주는 화면 밖 미션.
// 주제 하나에 단어 5의 배수를 넣는 것이 원칙이다. 지금은 주제 6개 × 20개 = 120개 (묶음 4개씩, 묶음마다 5개).
window.A = window.A || {};

// 모든 주제가 같은 게임 8개를 같은 순서로 쓴다 (카드는 맨 위, 묻고 답하기는 맨 아래 가로 한 줄)
const ALL_GAMES = [
  ['card', 1], ['pick', 1], ['balloon', 1], ['match', 1],
  ['ox', 2], ['scratch', 2], ['maze', 3], ['qa', 3],
];

// 복수형 단어: "These are ..." 로 말한다 (기획서 4-4장)
const PLURAL_IDS = new Set([
  'grapes', 'chopsticks', 'beans', 'jeans', 'shorts', 'socks', 'sneakers',
  'boots', 'clothes', 'glasses', 'gloves', 'balletshoes', 'cherries',
]);

// 관사(a/an)를 붙이지 않는 단어: 색깔("This is red.")과 셀 수 없는 말("This is milk.")
const COLOR_IDS = new Set([
  'redcircle', 'orangecircle', 'yellowcircle', 'greencircle', 'bluecircle',
  'purplecircle', 'pinkcircle', 'browncircle', 'blackcircle', 'whitecircle',
]);
const NO_ART_IDS = new Set([
  ...COLOR_IDS,
  'broccoli', 'corn', 'garlic', 'ginger', 'salad', 'lettuce',             // 채소
  'chocolate', 'popcorn', 'honey', 'cheese', 'bread', 'icecream', 'shavedice',   // 간식
  'rice', 'soup', 'bacon', 'curryrice', 'spaghetti', 'milk', 'juice', 'tea', 'hotdrink', 'sushi',  // 식사·음료
]);

const FOOD_MISSION = '오늘 먹은 음식 하나를 영어로 말해 보기';
const CLOTHES_MISSION = '오늘 입은 옷 이름을 영어로 말해 보기';

A.THEMES = [
  { id: 'veg', ko: '채소', en: 'Vegetables', icon: '🥕', cover: 'carrot', color: '#c9ebc3',
    games: ALL_GAMES,
    mission: FOOD_MISSION,
    words: [
      ['carrot', 'carrot', '당근'], ['broccoli', 'broccoli', '브로콜리'], ['corn', 'corn', '옥수수'], ['eggplant', 'eggplant', '가지'], ['cucumber', 'cucumber', '오이'],
      ['potato', 'potato', '감자'], ['onion', 'onion', '양파'], ['mushroom', 'mushroom', '버섯'], ['pepper', 'pepper', '피망'], ['garlic', 'garlic', '마늘'],
      ['beans', 'beans', '콩'], ['sprout', 'sprout', '새싹'], ['ginger', 'ginger', '생강'], ['herb', 'herb', '허브'], ['salad', 'salad', '샐러드'],
      ['pumpkin', 'pumpkin', '호박'], ['radish', 'radish', '무'], ['napacabbage', 'cabbage', '배추'], ['sweetpotato', 'sweet potato', '고구마'],
      ['lettuce', 'lettuce', '상추'],
    ] },
];

// 5개씩 묶음으로 나누기 (맨 끝 묶음은 5개보다 적을 수 있음)
A.GROUP_SIZE = 5;
A.THEMES.forEach(t => {
  t.words = t.words.map(([id, en, ko, say]) => ({
    id, en, ko, say: say || en,
    art: NO_ART_IDS.has(id) ? '' : (/^[aeiou]/i.test(en) ? 'an' : 'a'),
    plural: PLURAL_IDS.has(id),
  }));
  t.groups = [];
  for (let i = 0; i < t.words.length; i += A.GROUP_SIZE) {
    t.groups.push(t.words.slice(i, i + A.GROUP_SIZE));
  }
});
