import { useForm, Controller } from "react-hook-form";
import GreenButton from '../../Button/GreenButton';
import { PlantUpdate } from "../../../types/PlantUpdate";
import { useState, useRef } from 'react'
import { Plant } from "../../../types/Plant";
import { capitalize, todaysDateString, dateInRightFormat, dateInInputFormat } from "../../../hooks/helpfulFunctions";
import { fetchAddPlantUpdate, fetchEditPlantUpdate } from "../../../hooks/fetchers";
import ImageCropDialog from '../../ImageCrop/ImageCropDialog'
interface addPlantUpdateDataObject {
  date: string
  updateImage?: File |'image/jpeg' | 'image/jpg' | null
  irrigationBoolean: boolean
  waterQuantity?: string
  fertilizer?: string
  fertilizerQuantity?: string
  notes?: string
  updateId?: string
}
interface AddPlantUpdateFormProps {
  currentPlant: Plant
  refetch: any
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  addOrEdit: 'add' | 'edit'
  setResponseMessage: React.Dispatch<React.SetStateAction<string>>
  currentUpdate?: PlantUpdate
}

export default function AddOrEditPlantUpdateForm({currentPlant, setModal , refetch, addOrEdit, currentUpdate, setResponseMessage }: AddPlantUpdateFormProps) {

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
  const [irrigationFormSection, setIrrigationFormSection] = useState<boolean>(currentUpdate ? currentUpdate.irrigation.IrrigationBoolean : false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const imageFileRef = useRef<File | null>(null);
  const formHeader: string = addOrEdit === 'add' ? 'Add a New Update': 'Edit an Update' ;
  function assignCroppedImageToRef(file: any) {
    imageFileRef.current = file
  }
  
  async function extractAndOrganize(data: addPlantUpdateDataObject) {
    data.date = dateInRightFormat(data.date)
    if (data.updateImage) {
      data.updateImage = imageFileRef.current
    }
    let responseMessage: string = ''
    if (addOrEdit === 'add') {
      responseMessage = await await fetchAddPlantUpdate(data, currentPlant)
    } else if (addOrEdit === 'edit') {
      data.updateId = currentUpdate?.updateId
      responseMessage = await fetchEditPlantUpdate(data, currentPlant)
    }
    refetch()
    setResponseMessage(responseMessage)
    setModal(false)
  }
  
  return (
    <>
        <form className="form" onSubmit={handleSubmit(data => {
          extractAndOrganize(data as addPlantUpdateDataObject);
          })} >
          <div className="form-header">{formHeader}</div>
          <div className="form-subheader">{capitalize(currentPlant.name)}</div>
          <div className="form-section">
            <label className="form-label">Date:</label>
            <input type="date" {...register("date", {required: true})} defaultValue={addOrEdit === 'add' ? todaysDateString() : dateInInputFormat(currentUpdate!.dateAdded)} />
            {errors.date && <span className="error-span">Date is required.</span>}
          </div>
          
          <div className="form-section">
            <label className="form-label">Plant Image:</label>
            <Controller
              name="updateImage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                    <input type="file" accept="image/jpeg, image/jpg" onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const selectedFile = e.target.files[0];
                        // imageFileRef makes sure that the cropped image will receive the image's original name
                        field.onChange(e.target.files[0]);
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
                                  imageName={imageFileRef.current?.name as string}
                                />
                                <img src={imagePreviewUrl} width="350" alt="Preview" />
                              </>}
          </div>
          <div className="form-section">
            <label className="form-label">Irrigation:</label>
            <input type="checkbox" {...register("irrigationBoolean")} onChange={() => setIrrigationFormSection(!irrigationFormSection)} checked={irrigationFormSection}/>
          </div>
          {irrigationFormSection && 
          <>
            <div className="form-section">
                <label className="form-label">Water Quantity (ml):</label>
                <input {...register("waterQuantity")} type="number" min="0" defaultValue={currentUpdate! ? +currentUpdate!.irrigation.waterQuantity : 0}/>
            </div>
            <div className="form-section">
                <label className="form-label">Fertilizer:</label>
                <input {...register("fertilizer")} defaultValue={currentUpdate ? currentUpdate!.irrigation.fertilizer : ''}/>
            </div>
            <div className="form-section">
                <label className="form-label">Fertilizer Quantity (ml):</label>
                <input {...register("fertilizerQuantity")} type="number" min="0" defaultValue={currentUpdate ? +currentUpdate!.irrigation.fertilizerQuantity : 0}/>
            </div>
          </>
          }
          <div className="form-section">
            <label className="form-label">Notes:</label>
          </div>
          <>
            <div className="form-section">
                <textarea id="notes-form-input" {...register("notes")} defaultValue={currentUpdate ? currentUpdate.notes : ''}/>
            </div>
          </>
          <GreenButton type="submit" onClick={handleSubmit} text="Submit"/>
        </form>
    </>
  )
}
