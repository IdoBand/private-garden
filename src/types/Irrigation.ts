export class irrigation {
    id: string;
    date: string;
    fertilizer: string;
    waterQuantity: number
    constructor(id: string, date: string, fertilizer: string, waterQuantity: number) {
        this.id = id
        this.date = this.dateValidator(date)
        this.fertilizer = fertilizer
        this.waterQuantity = waterQuantity
    }
    dateValidator(date?: string | null) {
        if (date) {return date}
        const newDate = new Date(); 
        const options = {day: '2-digit', month: '2-digit', year: 'numeric' }as const;
        const dateString = newDate.toLocaleDateString('en-US', options);
        return dateString;
    }
}