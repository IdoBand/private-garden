import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from 'react'
import GreenButton from '../../Button/GreenButton';
import { Plant } from "../../../types/Plant";
import { fetchAddPlant } from "../../../hooks/fetchers";
import ImageCropDialog from "../../ImageCrop/ImageCropDialog";
interface addPlantDataObject {
  plantName: string;
  plantImage: 'image/jpeg' | 'image/jpg';
}
interface AddPlantFormProps {
  // plants: Plant[]
  // setPlants: React.Dispatch<React.SetStateAction<Plant[]>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  refetch: any
  setResponseMessage: React.Dispatch<React.SetStateAction<string>>
  plantName?: string | null
  plantImage?: File | null
}

export default function AddPlantForm({setModal, refetch, setResponseMessage, plantName='', plantImage}: AddPlantFormProps) {
  
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const imageFileRef = useRef<File | null>(null);
  const imageFileNameRef = useRef<string>('noname')
  
  function assignCroppedImageToRef(file: any) {
    imageFileRef.current = file
    
  }
  useEffect(() => {
    if (plantImage) {
      setImagePreviewUrl(URL.createObjectURL(plantImage))
      imageFileRef.current = plantImage
      imageFileNameRef.current = plantImage.name
    }
  }, [])
  
  async function extractNewPlantFromForm(data: addPlantDataObject) {
    const response = await fetchAddPlant(data.plantName, imageFileRef.current)
    console.log(response);
    reset()
    setModal(false)
    setResponseMessage(response)
  }
  
  return (
    <>
        <form className="form" onSubmit={handleSubmit(data => {
          extractNewPlantFromForm(data as addPlantDataObject);
        })} id="add-plant-form">
          <div className="form-header">Add a New Plant</div>
          <div className="form-section">
            <label>Plant Name:</label>
            <input {...register("plantName", {required: true})} type="text" defaultValue={plantName as string}/>
            {errors.plantName && <span className="error-span">Plant name is required.</span>}
          </div>
          <div className="form-section">
            <label>Plant Image:</label>
            <Controller
              name="plantImage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                  <>
                    <input type="file" onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const selectedFile = e.target.files[0];
                        // imageFileNameRef makes sure that the cropped image will receive the image's original name
                        imageFileNameRef.current = selectedFile.name
                        field.onChange(e.target.files[0]);
                        setImagePreviewUrl(URL.createObjectURL(selectedFile));
                      }
                    }} />
                  </>
                )}
            />
          </div>
          <div className="form-section">
          {imagePreviewUrl && <>
                                <ImageCropDialog 
                                  imageUrl={imagePreviewUrl} 
                                  cropInit={null} 
                                  zoomInit={null} 
                                  aspectInit={null}
                                  assignCroppedImageToRef={assignCroppedImageToRef}
                                  imageFileName={imageFileRef.current}
                                />
                                <img src={imagePreviewUrl} width="300" alt="Preview" />
                              </>}
          </div>
          <GreenButton onClick={handleSubmit} text="Submit"/>
        </form>
    </>
  )
}