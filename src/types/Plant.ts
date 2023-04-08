import { PlantUpdate } from "./PlantUpdate";
import { ImgBuffer } from "./interface";
import { bufferToImage } from "../hooks/helpfulFunctions";
export abstract class AbstractPlant {
    id: string
    name: string
    family: string
    dateAdded: string
    updates: PlantUpdate[]
    profileImageString: string
    checked: boolean
    constructor (id: string, name: string, dateAdded: string, profileImageString: any) {
        this.id = id
        this.name = name
        this.family = ''
        this.dateAdded = dateAdded
        this.updates = []
        this.checked = false
        this.profileImageString = this.decideImg(profileImageString)
    }
    nameValidator(name: string): string {
        const sanitizedName = name.replace(/\s{2,}/g, ' ').trim()
        if (sanitizedName.includes(' ')) {
            const subNames = sanitizedName.split(' ')
            return subNames.map(sanitizedName => sanitizedName.toLowerCase()).join('')
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
    decideImg(img: ImgBuffer | string) {
        if (typeof img === 'string') {
            return img
        }
        if (img.data.data.length) {
            return bufferToImage(img.data.data)
        }
        return ''
    }
}

export class Plant extends AbstractPlant {
    // in the future there will be different types of plants
    #dateAdded: string
    constructor (id: string, name: string, dateAdded: string, profileImageString: any) {
        super(id, name, dateAdded, profileImageString)
        this.#dateAdded = dateAdded
    }
}