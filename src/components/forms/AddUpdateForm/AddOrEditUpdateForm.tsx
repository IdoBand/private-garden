import { useForm, Controller } from "react-hook-form";
import GreenButton from '../../Button/GreenButton';
import { PlantUpdate } from "../../../types/PlantUpdate";
import { useState, useRef } from 'react'
import { Plant } from "../../../types/Plant";
import { capitalize, todaysDateString, dateInRightFormat, dateInInputFormat } from "../../../hooks/helpfulFunctions";
import { fetchAddPlantUpdate, fetchEditPlantUpdate } from "../../../hooks/fetchers";
import ImageCropDialog from '../../ImageCrop/ImageCropDialog'
interface addPlantUpdateDataObject {
  date: string;
  updateImage?: File |'image/jpeg' | 'image/jpg' | null;
  irrigationBoolean: boolean;
  waterQuantity?: string;
  fertilizer?: string;
  fertilizerQuantity?: string;
  notes?: string;
}
interface AddPlantUpdateFormProps {
  currentPlant: Plant
  refetch: any
//   setPlants: React.Dispatch<React.SetStateAction<PlantUpdate[]>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  addOrEdit: string
  currentUpdate?: PlantUpdate
}

export default function AddOrEditPlantUpdateForm({currentPlant, setModal , refetch, addOrEdit, currentUpdate }: AddPlantUpdateFormProps) {
  if (currentUpdate) {

  }
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
  const [irrigationFormSection, setIrrigationFormSection] = useState<boolean>(currentUpdate ? currentUpdate.irrigation.IrrigationBoolean : false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null)
  const imageFileRef = useRef(null);
  const imageFileNameRef = useRef<string>('noname')
  const formHeader: string = addOrEdit === 'add' ? 'Add a New Update': 'Edit an Update' ;
  function assignCroppedImageToRef(file: any) {
    imageFileRef.current = file
  }
  
  async function extractNewUpdateFromForm(data: addPlantUpdateDataObject) {
    data.date = dateInRightFormat(data.date)
    if (data.updateImage) {
      data.updateImage = imageFileRef.current
    }
   
    if (addOrEdit === 'add') {
      await addPlantUpdateRequest(data)
    } else if (addOrEdit === 'edit') {
      // await fetchEditPlantUpdate()
    }
    
    refetch()
    setModal(false)
  }


  async function addPlantUpdateRequest(updateObject: addPlantUpdateDataObject) {
    
    const res = await fetchAddPlantUpdate(updateObject, currentPlant)
    if (res.message === 'Update was saved successfully!') {
      const newPlantUpdate = new PlantUpdate(
        res.newUpdateId,
        currentPlant.id,
        currentPlant.name,
        updateObject.date,
        updateObject.updateImage,
        updateObject.irrigationBoolean,
        +(updateObject.waterQuantity as string),
        updateObject.fertilizer,
        +(updateObject.fertilizerQuantity as string),
        updateObject.notes as string
        )
    }
  };
  
  return (
    <>
        <form className="form" onSubmit={handleSubmit(data => {
          extractNewUpdateFromForm(data as addPlantUpdateDataObject);
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
                    <input type="file" onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const selectedFile = e.target.files[0];
                        // imageFileNameRef makes sure that the cropped image will receive the image's original name
                        imageFileNameRef.current = selectedFile.name
                        console.log(imageFileNameRef.current)
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
                                  imageName={currentPlant?.name as string}
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
                <input {...register("waterQuantity")} type="number" min="0" defaultValue={currentUpdate!.irrigation.waterQuantity ? +currentUpdate!.irrigation.waterQuantity : undefined}/>
            </div>
                <div className="form-section">
                <label className="form-label">Fertilizer:</label>
                <input {...register("fertilizer")} defaultValue={currentUpdate!.irrigation.fertilizer ? currentUpdate!.irrigation.fertilizer : ''}/>
            </div>
                <div className="form-section">
                <label className="form-label">Fertilizer Quantity (ml):</label>
                <input {...register("fertilizerQuantity")} type="number" min="0" defaultValue={currentUpdate!.irrigation.fertilizerQuantity ? +currentUpdate!.irrigation.fertilizerQuantity : undefined}/>
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
          <GreenButton onClick={handleSubmit} text="Submit"/>
        </form>
    </>
  )
}
