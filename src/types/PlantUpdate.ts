export class PlantUpdate {
    id: string
    plantId: String;
    plantName: String;
    dateAdded: String;
    updateImageBufferArray: any
    irrigation: {
        IrrigationBoolean: Boolean,
        waterQuantity?: Number | undefined,
        fertilizer?: String | undefined,
        fertilizerQuantity?: Number | undefined
    }
    notes: string
    constructor(id: string, plantId: string, plantName: string, dateAdded: string, updateImageBufferArray: any,
        IrrigationBoolean: boolean, waterQuantity: number | undefined, fertilizer: string | undefined, fertilizerQuantity: number | undefined, notes: string) {
        this.id = id
        this.plantId = plantId
        this.plantName = plantName
        this.dateAdded = dateAdded
        this.updateImageBufferArray = updateImageBufferArray
        this.irrigation = {
            IrrigationBoolean,
            waterQuantity,
            fertilizer,
            fertilizerQuantity
        }
        this.notes = notes
    }
    dateValidator(date?: string | null) {
        if (date) {return date}
        const newDate = new Date(); 
        const options = {day: '2-digit', month: '2-digit', year: 'numeric' }as const;
        const dateString = newDate.toLocaleDateString('en-US', options);
        return dateString;
    }
}