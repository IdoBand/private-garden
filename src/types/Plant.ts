import { PlantUpdate } from "./PlantUpdate";
export class AbstractPlant {
    id: string
    name: string;
    family: string | null;
    #dateAdded: string;
    updates: PlantUpdate[];
    imageBufferArray: any;
    checked: boolean
    constructor (id: string, name: string, dateAdded: string, imageBufferArray: any) {
        this.id = id
        this.name = name
        this.family = null
        this.#dateAdded = dateAdded
        this.updates = []
        this.checked = false
        this.imageBufferArray = this.decideImg(imageBufferArray)
    }
    validateName(name: string): string {
        const sanitizedName = name.replace(/\s{2,}/g, ' ').trim()
        if (sanitizedName.includes(' ')) {
            const subNames = sanitizedName.split(' ')
            return  subNames.map(sanitizedName => sanitizedName.toLowerCase()).join('')
        }
        return sanitizedName
    }
    dateValidator(date?: string | null) {
        if (date) {return date}
        const newDate = new Date(); 
        const options = {day: '2-digit', month: '2-digit', year: 'numeric' }as const;
        const dateString = newDate.toLocaleDateString('en-US', options);
        return dateString;
    }
    decideImg(img: any) {
        if (img.data.data.length) {
            return img.data.data
        }
        return 0
    }
}

export class Plant extends AbstractPlant {
    family: string | null;
    dateAdded: string;
    updates: PlantUpdate[];
    imageBufferArray: any;
    checked: boolean
    constructor (id: string, name: string, dateAdded: string, imageBufferArray: any) {
        super(id, name, dateAdded, imageBufferArray)
        this.family = null
        this.dateAdded = dateAdded
        this.updates = []
        this.checked = false
        this.imageBufferArray = this.decideImg(imageBufferArray)
    }
}