export class AbstractPlant {
    id: string
    name: string;
    family: string | null;
    #dateAdded: string;
    irrigations: any[];
    imageBufferArray: any;
    checked: boolean
    constructor (id: string, name: string, dateAdded: string, irrigations: any[], imageBufferArray: any) {
        this.id = id
        this.name = name
        this.family = null
        this.#dateAdded = dateAdded
        this.irrigations = irrigations
        this.checked = false
        this.imageBufferArray = imageBufferArray
    }
    validateName(name: string): string {
        if (name.includes(' ')) {
            const subNames = name.split(' ')
            return  subNames.map(name => name.toLowerCase()).join('')
        }
        return name
    }
    dateValidator(date?: string | null) {
        if (date) {return date}
        const newDate = new Date(); 
        const options = {day: '2-digit', month: '2-digit', year: 'numeric' }as const;
        const dateString = newDate.toLocaleDateString('en-US', options);
        return dateString;
    }
}

export class Plant extends AbstractPlant {
    family: string | null;
    #dateAdded: string;
    irrigations: any[];
    imageBufferArray: any;
    checked: boolean
    constructor (id: string, name: string, dateAdded: string, irrigations: any[], imageBufferArray: any) {
        super(id, name, dateAdded, irrigations, imageBufferArray)
        this.family = null
        this.#dateAdded = dateAdded
        this.irrigations = irrigations
        this.checked = false
        this.imageBufferArray = imageBufferArray
    }
}