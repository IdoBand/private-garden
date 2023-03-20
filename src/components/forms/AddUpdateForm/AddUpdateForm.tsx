import { useForm, Controller } from "react-hook-form";
import GreenButton from '../../Button/GreenButton';
import { PlantUpdate } from "../../../types/PlantUpdate";
import { useState, useRef } from 'react'
import { Plant } from "../../../types/Plant";
import { capitalize, todaysDateString, dateInRightFormat } from "../../../hooks/helpfulFunctions";
import { fetchAddPlantUpdate } from "../../../hooks/fetchers";
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
}

export default function AddPlantUpdateForm({currentPlant,setModal , refetch }: AddPlantUpdateFormProps) {
  
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
  const [irrigationFormSection, setIrrigationFormSection] = useState<boolean>(false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const imageFileRef = useRef(null);
  const imageFileNameRef = useRef<string>('noname')
  function assignCroppedImageToRef(file: any) {
    imageFileRef.current = file
  }
  async function extractNewUpdateFromForm(data: addPlantUpdateDataObject) {
    data.date = dateInRightFormat(data.date)
    if (data.updateImage) {
      data.updateImage = imageFileRef.current
    }
    await addPlantUpdateRequest(data)
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
          <div className="form-header">Add a New Update</div>
          <div className="form-subheader">{capitalize(currentPlant.name)}</div>
          <div className="form-section">
            <label className="form-label">Date:</label>
            <input type="date" defaultValue={todaysDateString()} {...register("date", {required: true})} />
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
                                  imageFileName={imageFileNameRef.current}
                                />
                                <img src={imagePreviewUrl} width="350" alt="Preview" />
                              </>}
          </div>
          <div className="form-section">
            <label className="form-label">Irrigation:</label>
            <input type="checkbox" {...register("irrigationBoolean")} onChange={() => setIrrigationFormSection(!irrigationFormSection)}/>
          </div>
          {irrigationFormSection && 
          <>
            <div className="form-section">
                <label className="form-label">Water Quantity (ml):</label>
                <input {...register("waterQuantity")} />
            </div>
                <div className="form-section">
                <label className="form-label">Fertilizer:</label>
                <input {...register("fertilizer")} />
            </div>
                <div className="form-section">
                <label className="form-label">Fertilizer Quantity (ml):</label>
                <input {...register("fertilizerQuantity")} />
            </div>
          </>
          }
          <div className="form-section">
            <label className="form-label">Notes:</label>
          </div>
          <>
            <div className="form-section">
                <textarea id="notes-form-input" {...register("notes")} />
            </div>
          </>
          <GreenButton onClick={handleSubmit} text="Submit"/>
        </form>
    </>
  )
}
