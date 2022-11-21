const DOWNLOAD_LINK = "http://10.0.2.2:3000/api/download/";

const categoriesOptions = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Pragma: "cache",
    "Cache-Control": "max-age=86400",
  },
};

const miscOptions = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Pragma: "no-cache",
    "Cache-Control": "no-cache",
  },
};

export const categoriesImages = [
  {
    name: "Apples",
    src: {
      uri: `${DOWNLOAD_LINK}apples/allApples.jpg`,
      ...categoriesOptions,
    },
  },
  {
    name: "Bananas",
    src: {
      uri: `${DOWNLOAD_LINK}bananas/allBananas.jpg`,
      ...categoriesOptions,
    },
  },
  {
    name: "Lettuce",
    src: {
      uri: `${DOWNLOAD_LINK}lettuce/allLettuce.jpg`,
      ...categoriesOptions,
    },
  },
  {
    name: "Oranges",
    src: {
      uri: `${DOWNLOAD_LINK}oranges/allOranges.jpg`,
      ...categoriesOptions,
    },
  },
  {
    name: "Potatoes",
    src: {
      uri: `${DOWNLOAD_LINK}potatoes/allPotatoes.jpg`,
      ...categoriesOptions,
    },
  },
  {
    name: "Onions",
    src: {
      uri: `${DOWNLOAD_LINK}onions/allOnions.jpg`,
      ...categoriesOptions,
    },
  },
  {
    name: "View All",
    src: {
      uri: `${DOWNLOAD_LINK}misc/viewAllIcon.png`,
      ...categoriesOptions,
    },
  },
];

export const miscImages = [
  {
    name: "Dark Logo",
    src: {
      uri: `${DOWNLOAD_LINK}misc/DarkLogo.png`,
      ...miscOptions,
    },
  },
  {
    name: "Light Login Logo",
    src: {
      uri: `${DOWNLOAD_LINK}misc/LightLoginLogo.png`,
      ...miscOptions,
    },
  },
  {
    name: "Login BG",
    src: {
      uri: `${DOWNLOAD_LINK}misc/loginBG.jpg`,
      ...miscOptions,
    },
  },
];
