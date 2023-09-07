import { ImgBuffer } from "./interface"
export abstract class AbstractManager {
    bufferToImage(bufferArray: any): string {
        let binary: string = ''
        const bytes = new Uint8Array(bufferArray)
        const len = bytes.byteLength
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        const bin = btoa(binary)
        return `data:image/png;base64,${bin}`
    }
    decideImg(img: ImgBuffer | string) {
        if (typeof img === 'string') {
            return img
        }
        if (img instanceof File) {
            return URL.createObjectURL(img)
        }
        return ''
    }
    decideMultipleImg(imgArray: ImgBuffer[] | string[]) {
        return imgArray.map(img => {
            return this.decideImg(img)
        })
    }
    extractDateString(date: Date | number) {
        const dateInstance = new Date(date).toISOString()
        return dateInstance.slice(8,10) + '-' + dateInstance.slice(5,7) + '-' + dateInstance.slice(0,4)
    }
    getDateStringFormatForInput(date: Date | number) {
        const dateInstance = new Date(date).toISOString()
        return dateInstance.slice(0,4) + '-' + dateInstance.slice(5,7) + '-' + dateInstance.slice(8,10)
    }
    capitalize(str: string, boolean?: boolean): string {
        let words;
        if (boolean) { // coming from Random Plant 'name_is_like_this'
            words = str.split('_')
        } else {   // coming from My Garden 'name is like this'
            words = str.split(' ')
        }
        const capitalizedWords = words.map(word => {
            const firstLetter = word.charAt(0).toUpperCase();
            const restOfWord = word.slice(1);
            return `${firstLetter}${restOfWord}`;
        })
        return capitalizedWords.join(' ')   
    }
     getTodaysDateString() {
        const today = new Date();
        const year = today.getFullYear();
        const month = `${today.getMonth() + 1}`.padStart(2, "0");
        const day = `${today.getDate()}`.padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    serializeDate(date: Date | number): number {
        if (date instanceof Date) {
            date = date.getTime()
        }
        return date
    }
    generateImgSrcUrl(imageFiles: File[]) {
        return imageFiles.map(file => {return URL.createObjectURL(file)})
    }
}