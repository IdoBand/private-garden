import { ImgBuffer } from "./interface";
export class PlantUpdate {
    updateId: string
    plantId: string;
    plantName: string;
    dateAdded: string;
    updateImageBufferArray: any
    irrigation: {
        IrrigationBoolean: boolean,
        waterQuantity: number,
        fertilizer?: string | undefined,
        fertilizerQuantity: Number
    }
    notes: string
    checked: boolean
    constructor(updateId: string, plantId: string, plantName: string, dateAdded: string, updateImageBufferArray: any,
        IrrigationBoolean: boolean, waterQuantity: number, fertilizer: string | undefined, fertilizerQuantity: number, notes: string) {
        this.updateId = updateId
        this.plantId = plantId
        this.plantName = plantName
        this.dateAdded = dateAdded
        this.updateImageBufferArray = this.decideImg(updateImageBufferArray)
        this.irrigation = {
            IrrigationBoolean,
            waterQuantity,
            fertilizer,
            fertilizerQuantity
        }
        this.notes = notes
        this.checked = false
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