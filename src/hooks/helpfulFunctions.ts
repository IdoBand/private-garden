export function bufferToImage(arrayBuffer: any) {
    let binary: string = ''
    const bytes = new Uint8Array(arrayBuffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa(binary)
}
export function capitalize(str: string): string {
    const words = str.split(' ')
    const capitalizedWords = words.map(word => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1);
        return `${firstLetter}${restOfWord}`;
    })
    return capitalizedWords.join(' ')   
}

export function todaysDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const day = `${today.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
    }

export function dateInRightFormat(date: string): string{
    return date.slice(8,10) + '-' + date.slice(5,7) + '-' + date.slice(0,4)
}
export function handleImageLoad(event: React.SyntheticEvent<HTMLImageElement>) {
    const img = event.currentTarget;
    if (img.width > img.height) {
      img.width = 600;
    } else {
      img.width = 300;

    }
  }