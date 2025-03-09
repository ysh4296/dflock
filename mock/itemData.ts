// 보통 자물쇠 1번 아이템 획득 정보
const normalLock1: Item[] = [
  {
    name: "스페셜 클론 레어 아바타 풀세트 상자",
    quantity: 1,
    probability: 0.1875,
  },
  { name: "무기 강화권[리노] 상자", quantity: 1, probability: 0.25 },
  {
    name: "그랜드 마스터 계약 패키지 15일 상자",
    quantity: 1,
    probability: 0.4,
  },
  { name: "고대의 황금 증폭서", quantity: 1, probability: 0.025 },
  { name: "장비 보호권", quantity: 1, probability: 0.025 },
  { name: "증폭 보호권", quantity: 1, probability: 0.025 },
  { name: "해방된 칼레이도 박스", quantity: 1, probability: 4.0 },
  { name: "해방된 칼레이도 박스", quantity: 10, probability: 0.4 },
  { name: "해방된 칼레이도 박스", quantity: 30, probability: 0.13 },
  { name: "칸나의 맛있는 수제빵", quantity: 10, probability: 13 },
  { name: "칸나의 맛있는 수제빵", quantity: 20, probability: 7.0 },
  { name: "칸나의 맛있는 수제빵", quantity: 50, probability: 3.5 },
  { name: "칸나의 맛있는 우유", quantity: 10, probability: 13 },
  { name: "칸나의 맛있는 우유", quantity: 20, probability: 7.0 },
  { name: "칸나의 맛있는 우유", quantity: 50, probability: 3.5 },
  { name: "패왕의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "달인의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "성장의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "큐브의 계약 7일", quantity: 1, probability: 5.5 },
  { name: "응축된 라이언 코어", quantity: 10, probability: 4.0333 },
  { name: "응축된 라이언 코어", quantity: 30, probability: 4.0333 },
  { name: "응축된 라이언 코어", quantity: 50, probability: 4.0333 },
  { name: "빛나는 조화의 결정체", quantity: 10, probability: 1.5667 },
  { name: "빛나는 조화의 결정체", quantity: 30, probability: 1.5667 },
  { name: "빛나는 조화의 결정체", quantity: 50, probability: 1.5667 },
  { name: "종말의 계시 1개 상자", quantity: 10, probability: 1.0 },
  { name: "종말의 계시 1개 상자", quantity: 20, probability: 0.5 },
  { name: "상공인협의회 은화", quantity: 10, probability: 1.6 },
  { name: "상공인협의회 은화", quantity: 20, probability: 1.5 },
  { name: "상공인협의회 은화", quantity: 30, probability: 1.5 },
  { name: "마스터 칼레이도 박스[계정귀속]", quantity: 1, probability: 0.1 },
  { name: "플래티넘 엠블렘[용맹의 축복]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[영광의 축복]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[임무 시작]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[오버드라이브]", quantity: 1, probability: 0.01 },
];

// 보통 자물쇠 2번 아이템 획득 정보
const normalLock2: Item[] = [
  {
    name: "스페셜 클론 레어 아바타 풀세트 상자",
    quantity: 1,
    probability: 0.1875,
  },
  { name: "무기 강화권[리노] 상자", quantity: 1, probability: 0.25 },
  {
    name: "그랜드 마스터 계약 패키지 15일 상자",
    quantity: 1,
    probability: 0.4,
  },
  { name: "고대의 황금 증폭서", quantity: 1, probability: 0.025 },
  { name: "장비 보호권", quantity: 1, probability: 0.025 },
  { name: "증폭 보호권", quantity: 1, probability: 0.025 },
  { name: "해방된 칼레이도 박스", quantity: 1, probability: 4.0 },
  { name: "해방된 칼레이도 박스", quantity: 10, probability: 0.4 },
  { name: "해방된 칼레이도 박스", quantity: 30, probability: 0.13 },
  { name: "칸나의 맛있는 수제빵", quantity: 10, probability: 13 },
  { name: "칸나의 맛있는 수제빵", quantity: 20, probability: 7.0 },
  { name: "칸나의 맛있는 수제빵", quantity: 50, probability: 3.5 },
  { name: "칸나의 맛있는 우유", quantity: 10, probability: 13 },
  { name: "칸나의 맛있는 우유", quantity: 20, probability: 7.0 },
  { name: "칸나의 맛있는 우유", quantity: 50, probability: 3.5 },
  { name: "패왕의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "달인의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "성장의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "큐브의 계약 7일", quantity: 1, probability: 5.5 },
  { name: "응축된 라이언 코어", quantity: 10, probability: 4.0333 },
  { name: "응축된 라이언 코어", quantity: 30, probability: 4.0333 },
  { name: "응축된 라이언 코어", quantity: 50, probability: 4.0333 },
  { name: "빛나는 조화의 결정체", quantity: 10, probability: 1.5667 },
  { name: "빛나는 조화의 결정체", quantity: 30, probability: 1.5667 },
  { name: "빛나는 조화의 결정체", quantity: 50, probability: 1.5667 },
  { name: "종말의 계시 1개 상자", quantity: 10, probability: 1.0 },
  { name: "종말의 계시 1개 상자", quantity: 20, probability: 0.5 },
  { name: "상공인협의회 은화", quantity: 10, probability: 1.6 },
  { name: "상공인협의회 은화", quantity: 20, probability: 1.5 },
  { name: "상공인협의회 은화", quantity: 30, probability: 1.5 },
  { name: "마스터 칼레이도 박스[계정귀속]", quantity: 1, probability: 0.1 },
  { name: "플래티넘 엠블렘[용맹의 축복]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[영광의 축복]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[임무 시작]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[오버드라이브]", quantity: 1, probability: 0.01 },
];

// 마일리지 자물쇠 1번 아이템 획득 정보
const mileageLock1: Item[] = [
  {
    name: "스페셜 클론 레어 아바타 풀세트 상자",
    quantity: 1,
    probability: 0.1875,
  },
  { name: "무기 강화권[리노] 상자", quantity: 1, probability: 0.25 },
  {
    name: "그랜드 마스터 계약 패키지 15일 상자",
    quantity: 1,
    probability: 0.4,
  },
  { name: "고대의 황금 증폭서", quantity: 1, probability: 0.025 },
  { name: "장비 보호권", quantity: 1, probability: 0.025 },
  { name: "증폭 보호권", quantity: 1, probability: 0.025 },
  { name: "해방된 칼레이도 박스", quantity: 1, probability: 4.0 },
  { name: "해방된 칼레이도 박스", quantity: 10, probability: 0.4 },
  { name: "해방된 칼레이도 박스", quantity: 30, probability: 0.13 },
  { name: "칸나의 맛있는 수제빵", quantity: 10, probability: 13 },
  { name: "칸나의 맛있는 수제빵", quantity: 20, probability: 7.0 },
  { name: "칸나의 맛있는 수제빵", quantity: 50, probability: 3.5 },
  { name: "칸나의 맛있는 우유", quantity: 10, probability: 13 },
  { name: "칸나의 맛있는 우유", quantity: 20, probability: 7.0 },
  { name: "칸나의 맛있는 우유", quantity: 50, probability: 3.5 },
  { name: "패왕의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "달인의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "성장의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "큐브의 계약 7일", quantity: 1, probability: 5.5 },
  { name: "응축된 라이언 코어", quantity: 10, probability: 4.0333 },
  { name: "응축된 라이언 코어", quantity: 30, probability: 4.0333 },
  { name: "응축된 라이언 코어", quantity: 50, probability: 4.0333 },
  { name: "빛나는 조화의 결정체", quantity: 10, probability: 1.5667 },
  { name: "빛나는 조화의 결정체", quantity: 30, probability: 1.5667 },
  { name: "빛나는 조화의 결정체", quantity: 50, probability: 1.5667 },
  { name: "종말의 계시 1개 상자", quantity: 10, probability: 1.0 },
  { name: "종말의 계시 1개 상자", quantity: 20, probability: 0.5 },
  { name: "상공인협의회 은화", quantity: 10, probability: 1.6 },
  { name: "상공인협의회 은화", quantity: 20, probability: 1.5 },
  { name: "상공인협의회 은화", quantity: 30, probability: 1.5 },
  { name: "마스터 칼레이도 박스[계정귀속]", quantity: 1, probability: 0.1 },
  { name: "플래티넘 엠블렘[용맹의 축복]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[영광의 축복]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[임무 시작]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[오버드라이브]", quantity: 1, probability: 0.01 },
];

// 마일리지 자물쇠 2번 아이템 획득 정보
const mileageLock2: Item[] = [
  {
    name: "스페셜 클론 레어 아바타 풀세트 상자",
    quantity: 1,
    probability: 0.1875,
  },
  { name: "무기 강화권[리노] 상자", quantity: 1, probability: 0.25 },
  {
    name: "그랜드 마스터 계약 패키지 15일 상자",
    quantity: 1,
    probability: 0.4,
  },
  { name: "고대의 황금 증폭서", quantity: 1, probability: 0.025 },
  { name: "장비 보호권", quantity: 1, probability: 0.025 },
  { name: "증폭 보호권", quantity: 1, probability: 0.025 },
  { name: "해방된 칼레이도 박스", quantity: 1, probability: 4.0 },
  { name: "해방된 칼레이도 박스", quantity: 10, probability: 0.4 },
  { name: "해방된 칼레이도 박스", quantity: 30, probability: 0.13 },
  { name: "칸나의 맛있는 수제빵", quantity: 10, probability: 13 },
  { name: "칸나의 맛있는 수제빵", quantity: 20, probability: 7.0 },
  { name: "칸나의 맛있는 수제빵", quantity: 50, probability: 3.5 },
  { name: "칸나의 맛있는 우유", quantity: 10, probability: 13 },
  { name: "칸나의 맛있는 우유", quantity: 20, probability: 7.0 },
  { name: "칸나의 맛있는 우유", quantity: 50, probability: 3.5 },
  { name: "패왕의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "달인의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "성장의 계약 3일", quantity: 1, probability: 5.5 },
  { name: "큐브의 계약 7일", quantity: 1, probability: 5.5 },
  { name: "응축된 라이언 코어", quantity: 10, probability: 4.0333 },
  { name: "응축된 라이언 코어", quantity: 30, probability: 4.0333 },
  { name: "응축된 라이언 코어", quantity: 50, probability: 4.0333 },
  { name: "빛나는 조화의 결정체", quantity: 10, probability: 1.5667 },
  { name: "빛나는 조화의 결정체", quantity: 30, probability: 1.5667 },
  { name: "빛나는 조화의 결정체", quantity: 50, probability: 1.5667 },
  { name: "종말의 계시 1개 상자", quantity: 10, probability: 1.0 },
  { name: "종말의 계시 1개 상자", quantity: 20, probability: 0.5 },
  { name: "상공인협의회 은화", quantity: 10, probability: 1.6 },
  { name: "상공인협의회 은화", quantity: 20, probability: 1.5 },
  { name: "상공인협의회 은화", quantity: 30, probability: 1.5 },
  { name: "마스터 칼레이도 박스[계정귀속]", quantity: 1, probability: 0.1 },
  { name: "플래티넘 엠블렘[용맹의 축복]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[영광의 축복]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[임무 시작]", quantity: 1, probability: 0.01 },
  { name: "플래티넘 엠블렘[오버드라이브]", quantity: 1, probability: 0.01 },
];
