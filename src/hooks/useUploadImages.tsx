import { useState } from "react"
import UploadButton from "../components/Button/UploadButton"
import { Controller, useForm } from "react-hook-form";
import { PhotoIcon } from '@heroicons/react/24/solid'
export const useUploadImages = (limitImages: number, existingImages: number, smallButton: boolean =false, callback? :() => void) => {
    const { setError, clearErrors, formState: { errors }, control } = useForm();
    const [imageFiles, setImageFiles] = useState<File[]>([])

    function deleteImageFromArray(index: number) {
        const updatedArray = imageFiles.filter((image, idx) =>  idx !== index )
        setImageFiles(updatedArray)
    }

    const filesInput = (
        <div className="image-select-container">
            <Controller
            name="images"
            control={control}
            defaultValue=""
            render={({ field }) => (
                <>
                    <input 
                        type="file" 
                        id="images" 
                        className='file-upload-button' 
                        accept="image/jpeg, image/jpg" 
                        multiple 
                        onChange={(e) => {
                            if ((e.target.files && e.target.files.length > 0 && e.target.files.length < limitImages + 1 - existingImages) ) {
                                if (callback) {
                                    callback()
                                }
                                const selectedFiles = Array.from(e.target.files)
                                field.onChange(selectedFiles)
                                clearErrors('images')
                                setImageFiles(selectedFiles)
                            } else {
                                setImageFiles([])
                                setError("images", {
                                    type: "manual",
                                    message: `Upload up to ${limitImages} images please`
                                });
                            }
                    }} />
                    {smallButton ?
                        <label htmlFor="images" style={{cursor: 'pointer', border: 'none', outline: 'none', background: 'none'}}><PhotoIcon width={20} color="#007449" /></label>
                    :   
                        <UploadButton htmlFor="images" text='Upload Images' />
                    }
                </>
                )}
                />
         </div>
    )
    
    const errorMessage = <div>{errors.images && <div className="error-div">{errors.images.message as string}</div>}</div>
    return {
        imageFiles,
        filesInput,
        errorMessage,
        deleteImageFromArray
    }
}