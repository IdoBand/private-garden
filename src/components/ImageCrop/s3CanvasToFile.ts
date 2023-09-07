export const loadImageFromS3 = async (url: string): Promise<File> => {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const blob = await response.blob();
  
        const filename = "image.jpg"
  
        const file = new File([blob], filename, { type: blob.type });
        return file;
    } catch (error) {
        console.log(error);
        throw new Error("Error loading image from S3");
    }
};
export async function convertMultipleExistingImages(urls: string[]) {

    if (urls.length > 0) {
        const converted = await Promise.all(
            urls.map( async (url) => {
            return await loadImageFromS3(url)
        }))
        return converted
    }
    return []
}
  