import { useForm, Controller } from "react-hook-form";
import GreenButton from '../../Button/GreenButton';
import { Plant } from "../../../types/Plant";
import { fetchAddPlant } from "../../../hooks/fetchers";

interface addPlantDataObject {
  plantName: string;
  plantImage: 'image/jpeg' | 'image/jpg';
}
interface AddPlantFormProps {
  // plants: Plant[]
  // setPlants: React.Dispatch<React.SetStateAction<Plant[]>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  refetch: any
}

export default function AddPlantForm({setModal, refetch}: AddPlantFormProps) {
  
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();

  async function extractNewPlantFromForm(data: addPlantDataObject) {
    const response = await fetchAddPlant(data.plantName, data.plantImage)
    console.log(response);
    refetch()
    reset()
    setModal(false)
  }
  
  return (
    <>
        <form className="form" onSubmit={handleSubmit(data => {
          extractNewPlantFromForm(data as addPlantDataObject);
        })} id="add-plant-form">
          <div className="form-header">Add a New Plant</div>
          <div className="form-section">
            <label>Plant Name:</label>
            <input {...register("plantName", {required: true})} />
            {errors.plantName && <span className="error-span">Plant name is required.</span>}
          </div>
          <div className="form-section">
            <label>Plant Image:</label>
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
