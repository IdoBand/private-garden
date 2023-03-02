export class AbstractPlant {
    name: string;
    dateAdded: number;
    irrigations: [];
    path: string;
    constructor (name: string) {
        this.name = name
        this.dateAdded = 1
        this.irrigations = []
        this.path = `/src/assets/plants/${this.validateName(name)}.jpeg`
       
        console.log(this.path)
    }
    validateName(name: string): string {
        const subNames = name.split(' ')
        return  subNames.map(name => name.toLowerCase()).join('')
    }
}

export class Plant extends AbstractPlant {
    constructor(name: string) {
        super(name)
    }
}