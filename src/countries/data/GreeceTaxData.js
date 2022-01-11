export const GreeceTaxData = {
    id: 4,
    name: "Greece",
    locale: "el-GR",
    currency: "EUR",
    flag: "greece.png",
    taxBrackets: [
      {start: 0, end: 10000, ratePercent: 9},
      {start: 10001, end: 20000, ratePercent: 22},
      {start: 20001, end: 30000, ratePercent: 28},
      {start: 30001, end: 40000, ratePercent: 36},
      {start: 40001, end: -1, ratePercent: 44}
    ],
    socialSecurity: {
        percent: 14.12,
        maxAmount: 6500
    }
}