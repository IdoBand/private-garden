export class AbstractPlant {
    name: string;
    dateAdded: number;
    irrigations: []
    constructor (name: string) {
        this.name = name
        this.dateAdded = 1
        this.irrigations = []
    }
}