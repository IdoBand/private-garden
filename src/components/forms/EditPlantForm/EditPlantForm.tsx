import { useForm, Controller } from "react-hook-form";
import GreenButton from '../../Button/GreenButton';
import { Plant } from "../../../types/Plant";
import { useAppSelector } from "../../../redux/counterHooks";
import { capitalize } from "../../../hooks/helpfulFunctions";
import { fetchEditPlant } from "../../../hooks/fetchers";
interface editPlantDataObject {
  plantName: string;
  plantImage: 'image/jpeg' | 'image/jpg';
}
interface EditPlantFormProps {
//   setPlants: React.Dispatch<React.SetStateAction<Plant[]>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}


export default function EditPlantForm({setModal}: EditPlantFormProps) {
  
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();
  const currentPlant = useAppSelector(state => state.plants.currentPlant)
  async function extractNewPlantFromForm(data: editPlantDataObject) {
    await fetchEditPlant(data.plantImage, data.plantImage)
    reset()
    setModal(false)
  }
  
  return (
    <>
        <form className="form" onSubmit={handleSubmit(data => {
          extractNewPlantFromForm(data as editPlantDataObject);
        })} id="add-plant-form">
          <div className="form-header">Edit Plant</div>
          <div className="form-subheader">{capitalize( currentPlant?.name as string)}</div>
          <div className="form-section">
            <label>New Name:</label>
            <input {...register("plantName", {required: true})} />
            {errors.plantName && <span className="error-span">Plant name is required.</span>}
          </div>
          
          <div className="form-section">
            <label>New Image:</label>
            <Controller
              name="plantImage"
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
          <GreenButton onClick={handleSubmit} text="Submit"/>
        </form>
    </>
  )
}
