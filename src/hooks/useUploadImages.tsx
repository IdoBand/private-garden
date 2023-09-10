import { useState } from "react"
import { Controller, useForm } from "react-hook-form";
import { PhotoIcon } from '@heroicons/react/24/solid'
export const useUploadImages = (limitImages: number, existingImages: number, smallButton: boolean =false, htmlForId?: string, callback? :() => void) => {
    const { setError, clearErrors, formState: { errors }, control } = useForm();
    const [imageFiles, setImageFiles] = useState<File[]>([])

    function deleteImageFromArray(index: number) {
        const updatedArray = imageFiles.filter((image, idx) => idx !== index )
        setImageFiles(updatedArray)
    }
    function deleteAllImages() {
        setImageFiles([])
    }

    const filesInput = (
        <div className="image-select-container">
            <Controller
            name={`images${ htmlForId}`}
            control={control}
            defaultValue=""
            render={({ field }) => (
                <>
                    <input 
                        type="file" 
                        id={`images${ htmlForId}`}
                        className='large-file-upload-button' 
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
                                    message: limitImages > 1 ? `Upload up to ${limitImages} images please` : 'Upload only 1 image please'
                                });
                            }
                    }} />
                    {smallButton ?
                        <label
                            htmlFor={`images${ htmlForId}`}
                            className="small-file-upload-button"
                        >
                            <PhotoIcon width={20} color="#007449" />
                        </label>
                    :   
                        <label
                            htmlFor={`images${ htmlForId}`}
                            className='large-file-upload-button'
                            >
                            <PhotoIcon className="" width={15}/>Upload Images
                        </label>
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
        deleteImageFromArray,
        deleteAllImages,
    }
}