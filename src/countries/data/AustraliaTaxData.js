export const AustraliaTaxData = {
    id: 2,
    name: "Australia",
    locale: "en-AU",
    currency: "AUD",
    flag: "australia.png",
    additionalOptions: true,
    residents: {
        medicarePercent: 2,
        taxBrackets: [
            {start: 0, end: 18200, fixedCharge: 0, ratePercent: 0},
            {start: 18201, end: 37000, fixedCharge: 0, ratePercent: 19},
            {start: 37001, end: 90000, fixedCharge: 3572, ratePercent: 32.5},
            {start: 90001, end: 180000, fixedCharge: 20797, ratePercent: 37},
            {start: 180001, end: -1, fixedCharge: 54096, ratePercent: 45}
        ]
    },
    nonResidents: {
        taxBrackets: [
            {start: 0, end: 90000, fixedCharge: 0, ratePercent: 32.5},
            {start: 90001, end: 180000, fixedCharge: 29250, ratePercent: 32.5},
            {start: 180001, end: -1, fixedCharge: 62550, ratePercent: 45}
        ]
    }
}