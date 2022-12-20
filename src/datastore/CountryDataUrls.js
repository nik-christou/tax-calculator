const CYPRUS_TAX_DATA_URL = new URL('/data/cyprus_data_v2.json', import.meta.url);
const AUSTRALIA_TAX_DATA_URL = new URL('/data/australia_data_v2.json', import.meta.url);
const GREECE_TAX_DATA_URL = new URL('/data/greece_data_v2.json', import.meta.url);
const GERMANY_TAX_DATA_URL = new URL('/data/germany_data_v2.json', import.meta.url);

const countriesDataUrlsList = [
    CYPRUS_TAX_DATA_URL,
    AUSTRALIA_TAX_DATA_URL,
    GERMANY_TAX_DATA_URL,
    GREECE_TAX_DATA_URL
];

export const countriesDataUrls = Object.freeze(countriesDataUrlsList);