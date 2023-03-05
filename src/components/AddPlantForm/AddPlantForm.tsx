import { useForm, Controller } from "react-hook-form";
import GreenButton from '../Button/GreenButton';
import { Plant } from "../../types/Plant";

interface dataObject {
  plantName: string;
  plantImage: 'image/jpeg' | 'image/jpg';
}
interface AddPlantFormProps {
  plants: Array<Plant>
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddPlant({plants, setPlants, setModal}: AddPlantFormProps) {
  
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();

  function extractNewPlantFromForm(data: dataObject) {

    const newPlants = [...plants, new Plant(data.plantName, data.plantName)]
    setPlants(newPlants)
    reset()
    setModal(false)
  }
  
  return (
    <>
        <form onSubmit={handleSubmit(data => {
          extractNewPlantFromForm(data as dataObject);
        })} id="add-plant-form">
          <h2>Add a New Plant</h2>
          <div className="form-section">
            <label>Plant Name:</label>
            <input {...register("plantName", {required: true})} />
          </div>
          {errors.plantName && <span className="error-span">Plant name is required.</span>}
          <div className="form-section">
            <label>Plant Image:</label>
            <Controller
              name="plantImage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="file" onChange={(e) => field.onChange(e.target.files[0])} />
                )}
                
            />
            
          </div>
          
          <GreenButton onClick={handleSubmit} text="Submit"/>
        </form>
    </>
  )
}
