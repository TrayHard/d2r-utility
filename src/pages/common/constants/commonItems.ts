// Enum для обычных предметов
export enum ECommonItem {
  "arrows" = "arrows",
  "bolts" = "bolts",
  "staminaPotions" = "staminaPotions",
  "antidotes" = "antidotes",
  "thawingPotions" = "thawingPotions",
  "hp1" = "hp1",
  "hp2" = "hp2",
  "hp3" = "hp3",
  "hp4" = "hp4",
  "hp5" = "hp5",
  "mp1" = "mp1",
  "mp2" = "mp2",
  "mp3" = "mp3",
  "mp4" = "mp4",
  "mp5" = "mp5",
  "rej1" = "rej1",
  "rej2" = "rej2",
}

// Маппинг ID к предметам
export const idToCommonItemMapper: Record<number, ECommonItem> = {
  2218: ECommonItem.arrows,
  2220: ECommonItem.bolts,
  2207: ECommonItem.staminaPotions,
  2208: ECommonItem.antidotes,
  2211: ECommonItem.thawingPotions,
  2266: ECommonItem.hp1,
  2267: ECommonItem.hp2,
  2268: ECommonItem.hp3,
  2269: ECommonItem.hp4,
  2270: ECommonItem.hp5,
  2271: ECommonItem.mp1,
  2272: ECommonItem.mp2,
  2273: ECommonItem.mp3,
  2274: ECommonItem.mp4,
  2275: ECommonItem.mp5,
  2209: ECommonItem.rej1,
  2210: ECommonItem.rej2,
};

// Обратный маппинг для записи
export const commonItemToIdMapper: Record<ECommonItem, number> = {
  [ECommonItem.arrows]: 2218,
  [ECommonItem.bolts]: 2220,
  [ECommonItem.staminaPotions]: 2207,
  [ECommonItem.antidotes]: 2208,
  [ECommonItem.thawingPotions]: 2211,
  [ECommonItem.hp1]: 2266,
  [ECommonItem.hp2]: 2267,
  [ECommonItem.hp3]: 2268,
  [ECommonItem.hp4]: 2269,
  [ECommonItem.hp5]: 2270,
  [ECommonItem.mp1]: 2271,
  [ECommonItem.mp2]: 2272,
  [ECommonItem.mp3]: 2273,
  [ECommonItem.mp4]: 2274,
  [ECommonItem.mp5]: 2275,
  [ECommonItem.rej1]: 2209,
  [ECommonItem.rej2]: 2210,
};

// Группировка предметов по типам
export const commonItemGroups = {
  simple: [
    ECommonItem.arrows,
    ECommonItem.bolts,
    ECommonItem.staminaPotions,
    ECommonItem.antidotes,
    ECommonItem.thawingPotions,
  ],
  healthPotions: [
    ECommonItem.hp1,
    ECommonItem.hp2,
    ECommonItem.hp3,
    ECommonItem.hp4,
    ECommonItem.hp5,
  ],
  manaPotions: [
    ECommonItem.mp1,
    ECommonItem.mp2,
    ECommonItem.mp3,
    ECommonItem.mp4,
    ECommonItem.mp5,
  ],
  rejuvenationPotions: [ECommonItem.rej1, ECommonItem.rej2],
};

// Маппинг для получения ECommonItem из настроек
export const settingsKeyToCommonItemMapper = {
  arrows: ECommonItem.arrows,
  bolts: ECommonItem.bolts,
  staminaPotions: ECommonItem.staminaPotions,
  antidotes: ECommonItem.antidotes,
  thawingPotions: ECommonItem.thawingPotions,
  healthPotions: commonItemGroups.healthPotions,
  manaPotions: commonItemGroups.manaPotions,
  rejuvenationPotions: commonItemGroups.rejuvenationPotions,
};
