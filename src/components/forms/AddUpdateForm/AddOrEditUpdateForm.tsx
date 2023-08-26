import { useForm } from "react-hook-form";
import Button from "../../Button/Button";
import { Plant, PlantUpdate } from "../../../types/interface";
import { useState} from 'react'
import { plantUpdateManager } from "../../../types/PlantUpdateManager";
import { fetchAddPlantUpdate, fetchEditPlantUpdate } from "../../../util/fetch";
import { useUploadImages } from "../../../hooks/useUploadImages";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import ExistingImage from "../../ExistingImage/ExistingImage";
import getCroppedImg from "../../ImageCrop/canvasToFile";
import { deleteImageFromCurrentUpdate } from "../../../redux/plantsSlice";
interface addPlantUpdateDataObject {
  dateAdded: Date | number
  images: File[] 
  notes: string
  irrigationBoolean: boolean,
  waterQuantity: number,
  fertilizer: string,
  fertilizerQuantity: number
}
interface AddPlantUpdateFormProps {
  currentPlant: Plant
  refetch: any
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  addOrEdit: 'add' | 'edit'
  showSnackbar: any
}

export default function AddOrEditPlantUpdateForm({currentPlant, setModal , refetch, addOrEdit, showSnackbar }: AddPlantUpdateFormProps) {
  const plantUpdate = useAppSelector(state => state.plants.currentUpdate)
  const existingImages = useAppSelector(state => state.plants.currentUpdate?.images as string []) || [] 
  const [irrigationFormSection, setIrrigationFormSection] = useState<boolean>(plantUpdate ? plantUpdate.irrigation.boolean : false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { imageFiles, filesInput, errorMessage, deleteImageFromArray } = useUploadImages(3, existingImages? existingImages.length : 0)
  const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false)
  const formHeader: string = addOrEdit === 'add' ? 'Add a New Update': 'Edit an Update';
  const dispatch = useAppDispatch()

  async function convertExistingImages() {
    const converted = await Promise.all(
      existingImages.map(async (image: string) => {
        return await getCroppedImg(image, { height:0, width:0, x:0, y:0})
      })
    )
    return converted
  }
  async function extractAndOrganize(data: addPlantUpdateDataObject) {
    setIsSubmitClicked(true)
    const existing = await convertExistingImages()
    const imageFilesArray = imageFiles.concat(existing)
    const newPlantUpdate: Partial<PlantUpdate> = {
      userId: currentPlant.userId,
      plantId: currentPlant._id as string,
      dateAdded: new Date(data.dateAdded),
      notes: data.notes,
      irrigation: {
        boolean: data.irrigationBoolean,
        waterQuantity: data.waterQuantity,
        fertilizer: data.fertilizer,
        fertilizerQuantity: data.fertilizerQuantity
      }
    }
    let response;
    let snackbarMessage = ''
    let snackbarVariant = 'success'
    if (addOrEdit === 'add') {
      try {
        response = await fetchAddPlantUpdate(newPlantUpdate, imageFilesArray)
        if (response.success) {
          snackbarMessage = "Update added successfully"
        }
      } catch (err) {
        snackbarMessage = "Failed to add update"
        snackbarVariant = "error"
      }
    } else if (addOrEdit === 'edit') {
      try {
        newPlantUpdate._id = plantUpdate!._id as string
        response = await fetchEditPlantUpdate(newPlantUpdate, imageFilesArray)
        if (response.success) {
          snackbarMessage = "Update edited successfully"
        }
      } catch (err) {
        snackbarMessage = "Failed to edit update"
        snackbarVariant = "error"
      }
    }
    await refetch(currentPlant._id)
    setModal(false)
    showSnackbar(snackbarMessage, snackbarVariant)
  }

  return (
    <>
        <form className="form" onSubmit={handleSubmit(data => {extractAndOrganize(data as addPlantUpdateDataObject);})} >
          <div className="form-header">{formHeader}</div>
          <div className="form-subheader">{plantUpdateManager.capitalize(currentPlant.plantName)}</div>
          <div className="form-section">
            <label className="form-label">Date:</label>
            <input type="date" {...register("dateAdded", {required: true})} defaultValue={addOrEdit === 'add' ? plantUpdateManager.getTodaysDateString() : plantUpdateManager.getDateStringFormatForInput(plantUpdate!.dateAdded)} />
            {errors.date && <span className="error-span">Date is required.</span>}
          </div>
          
          <div className="form-section">
            <label className="form-label">Images: {imageFiles.length + existingImages!.length}/3</label>
            {filesInput}
          </div>
          {errorMessage}
          <div className="plant-updates-images-container">
            {imageFiles &&  // new images uploaded by the user - Files
              imageFiles.map((image, idx) => {
                const url = URL.createObjectURL(image)
                return <ExistingImage  
                  key={url}
                  src={url}
                  idx={idx}
                  handleImageDelete={() => {deleteImageFromArray(idx)}}
                  imgClassName='plant-update-edit-form-image'
                  />
                  })
            }
            {existingImages && // existing images in the plantUpdate - Strings
              existingImages.map((image, idx) => {
                return <ExistingImage 
                  key={image}
                  src={image}
                  idx={idx}
                  handleImageDelete={() => {dispatch(deleteImageFromCurrentUpdate(idx))}}
                  imgClassName='plant-update-edit-form-image'
                  />
                  })
            }
          </div>
          
          <div className="form-section">
            <label className="form-label">Irrigation:</label>
            <input type="checkbox" {...register("irrigationBoolean")} onChange={() => setIrrigationFormSection(!irrigationFormSection)} checked={irrigationFormSection}/>
          </div>
          {irrigationFormSection && 
          <>
            <div className="form-section">
                <label className="form-label">Water Quantity (ml):</label>
                <input {...register("waterQuantity")} className="one-line-text-input" type="number" min="0" defaultValue={plantUpdate! ? +plantUpdate!.irrigation.waterQuantity : 0}/>
            </div>
            <div className="form-section">
                <label className="form-label">Fertilizer:</label>
                <input {...register("fertilizer")} className="one-line-text-input" defaultValue={plantUpdate ? plantUpdate!.irrigation.fertilizer : ''}/>
            </div>
            <div className="form-section">
                <label className="form-label">Fertilizer Quantity (ml):</label>
                <input {...register("fertilizerQuantity")} className="one-line-text-input" type="number" min="0" defaultValue={plantUpdate ? +plantUpdate!.irrigation.fertilizerQuantity : 0}/>
            </div>
          </>
          }
          <div className="form-section">
            <label className="form-label">Notes:</label>
          </div>
          <>
            <div className="form-section">
                <textarea id="notes-form-input" {...register("notes")} defaultValue={plantUpdate ? plantUpdate.notes : ''}/>
            </div>
          </>
          <Button className="green-button" type="submit" onClick={handleSubmit} text="Submit" isDisabled={isSubmitClicked} />
        </form>
    </>
  )
}
