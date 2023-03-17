import { useForm, Controller } from "react-hook-form";
import GreenButton from '../../Button/GreenButton';
import { PlantUpdate } from "../../../types/PlantUpdate";
import { useState } from 'react'
import { Plant } from "../../../types/Plant";
import { capitalize, todaysDateString, dateInRightFormat } from "../../../hooks/helpfulFunctions";
import { fetchAddPlantUpdate } from "../../../hooks/fetchers";
interface addPlantUpdateDataObject {
  date: string;
  updateImage?: File |'image/jpeg' | 'image/jpg';
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

  async function extractNewUpdateFromForm(data: addPlantUpdateDataObject) {
    
    data.date = dateInRightFormat(data.date)
    console.log(data.updateImage);
    
    if (!data.updateImage) {
      data.updateImage = await new File(['logo.jpg'], '../../assets/logo.jpg', { type: "image/jpg" })
      console.log('default image should be uploaded')
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
    console.log(res.message)
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
                <input type="file" onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    field.onChange(e.target.files[0])
                  }
                }} />
                )}
            />
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
