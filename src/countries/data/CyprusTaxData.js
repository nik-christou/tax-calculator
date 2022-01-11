export const CyprusTaxData = {
    id: 1,
    name: "Cyprus",
    locale: "el-GR",
    currency: "EUR",
    flag: "cyprus.png",
    additionalOptions: true,
    taxBrackets: [
        {start: 0, end: 19500, ratePercent: 0},
        {start: 19501, end: 28000, ratePercent: 20},
        {start: 28001, end: 36300, ratePercent: 25},
        {start: 36301, end: 60000, ratePercent: 30},
        {start: 60000, end: -1, ratePercent: 35}
    ],
    employed: {
        socialInsurancePercent: 8.3,
        healthContributionPercent: 2.65
    },
    selfEmployed: {
        socialInsurancePercent: 15.6,
        healthContributionPercent: 4.00
    }
};