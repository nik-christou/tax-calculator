
export class ResidenceType {

    /**
     * @param {Number} id
     * @param {String} type
     */
    constructor(id, type) {
        this.id = id;
        this.type = type;

        Object.freeze(this.id);
        Object.freeze(this.type);
        Object.freeze(this);
    }
}