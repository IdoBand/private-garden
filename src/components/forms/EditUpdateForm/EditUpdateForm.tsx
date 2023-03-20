import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import GreenButton from '../../Button/GreenButton';
import { Plant } from "../../../types/Plant";
import { capitalize } from "../../../hooks/helpfulFunctions";
import { PlantUpdate } from "../../../types/PlantUpdate";
import { useAppSelector } from "../../../redux/counterHooks";

interface editUpdateDataObject {
    plantName: string;
    plantImage: 'image/jpeg' | 'image/jpg';
  }
interface EditUpdateFormProps {
currentPlant: Plant
setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function EditUpdateForm({currentPlant, setModal}: EditUpdateFormProps) {
    
    const update = useAppSelector(state => state.plants.currentUpdate)
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
    const [irrigationFormSection, setIrrigationFormSection] = useState<boolean>(false)
    function extract(data: editUpdateDataObject) {

    } return (
<>
        <form className="form" onSubmit={handleSubmit(data => {
            extract(data as editUpdateDataObject);
            })} >
            <div className="form-header">Edit an Update</div>
            <div className="form-subheader">{capitalize(currentPlant.name)}</div>
            <div className="form-section">
                <label className="form-label">Date:</label>
                <input type="date" defaultValue={update!.dateAdded as string} {...register("date", {required: true})} />
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