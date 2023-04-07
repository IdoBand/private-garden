import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from 'react'
import GreenButton from '../../Button/GreenButton';
import { useAppDispatch, useAppSelector } from "../../../redux/counterHooks"
import ImageCropDialog from "../../ImageCrop/ImageCropDialog";
import { fetchAddPlant, fetchEditPlant } from "../../../hooks/fetchers";
import { current } from "@reduxjs/toolkit";
import getCroppedImg from "../../ImageCrop/canvasToFile";
interface addPlantDataObject {
  plantName: string;
  plantImage: 'image/jpeg' | 'image/jpg';
}
interface AddPlantFormProps {
  // plants: Plant[]
  // setPlants: React.Dispatch<React.SetStateAction<Plant[]>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  refetch?: any
  setResponseMessage: React.Dispatch<React.SetStateAction<string>>
  addOrEdit: string
  plantName?: string | null
  plantImageString?: string | null
}


export default function AddOrEditPlantForm({setModal, refetch, setResponseMessage, plantName='', plantImageString, addOrEdit}: AddPlantFormProps) {
  
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const imageFileRef = useRef<File | null>(null);
  const dispatch = useAppDispatch()
  const currentPlant = useAppSelector(state => state.plants.currentPlant)
  
  function assignCroppedImageToRef(file: any) {
    imageFileRef.current = file
    
  }
  const formHeader: string = addOrEdit === 'add' ? 'Add a New Plant': 'Edit a Plant' ;

  useEffect(() => {
    // coming from edit --> image already uploaded, string
    if (plantImageString) {
      setImagePreviewUrl(plantImageString)
    }
  }, [])
  
  async function extractDataFromForm(data: addPlantDataObject) {
    let response;
    if (addOrEdit === 'add') {
      response = await fetchAddPlant(data.plantName, imageFileRef.current)
    } else if (addOrEdit === 'edit') {
      response = await fetchEditPlant(currentPlant?.id as string, data.plantName, imageFileRef.current)
    }
    
    console.log(response);
    reset()
    setModal(false)
    setResponseMessage(response)
  }
  
  return (
    <>
        <form className="form" onSubmit={handleSubmit(data => {
          extractDataFromForm(data as addPlantDataObject);
        })} id="add-plant-form">
          <div className="form-header">{formHeader}</div>
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
                    <input type="file" accept="image/jpeg, image/jpg" onChange={(e) => {
                      console.log(e.target.files);
                      
                      if (e.target.files && e.target.files.length > 0) {
                        const selectedFile = e.target.files[0];
                        // imageFileRef makes sure that the cropped image will receive the image's original name
                        
                        field.onChange(selectedFile);
                        imageFileRef.current = selectedFile
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
                                  imageName={currentPlant?.name as string}
                                />
                                <img className="preview-image" src={imagePreviewUrl} alt="Preview" />
                              </>}
          </div>
          <GreenButton onClick={handleSubmit} text="Submit"/>
        </form>
    </>
  )
}