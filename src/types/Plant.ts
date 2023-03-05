export class AbstractPlant {
    id: string
    name: string;
    #dateAdded: number;
    irrigations: [];
    path: string;
    checked: boolean
    constructor (name: string, id: string) {
        this.id = id
        this.name = name
        this.#dateAdded = 1
        this.irrigations = []
        this.checked = false
        this.path = `/src/assets/plants/${this.validateName(name)}.jpeg`
    }
    validateName(name: string): string {
        const subNames = name.split(' ')
        return  subNames.map(name => name.toLowerCase()).join('')
    }
}

export class Plant extends AbstractPlant {
    constructor(name: string, id: string) {
        super(name, id)
    }
}