export const loadImageFromS3 = async (url: string): Promise<File> => {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const blob = await response.blob();
  
        const filename = "image.jpg"; // Adjust the filename as needed.
  
        const file = new File([blob], filename, { type: blob.type });
        return file;
    } catch (error) {
        console.log(error);
        throw new Error("Error loading image from S3");
    }
  };
  