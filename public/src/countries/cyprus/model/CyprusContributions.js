export class CyprusContributions {
    /**
     * @param {Number} socialInsurancePercent
     * @param {Number} healthContributionPercent
     */
    constructor(socialInsurancePercent, healthContributionPercent) {
        this.socialInsurancePercent = socialInsurancePercent;
        this.healthContributionPercent = healthContributionPercent;

        Object.freeze(this.socialInsurancePercent);
        Object.freeze(this.healthContributionPercent);
        Object.freeze(this);
    }
}