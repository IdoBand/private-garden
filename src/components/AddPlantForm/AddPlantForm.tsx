import { useForm, Controller } from "react-hook-form";
import GreenButton from '../Button/GreenButton';
import { Plant } from "../../types/Plant";

interface dataObject {
  plantName: string;
  plantImage: 'image/jpeg' | 'image/jpg';
}
interface AddPlantFormProps {
  plants: Plant[]
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const BASIC_URL = 'http://localhost:8000/'

async function addPlantRequest(plantName: string, plantImage?: 'image/jpeg' | 'image/jpg' | null) {
  const formData = new FormData();
 
  formData.append('plantName', plantName)
  if (plantImage) {
    formData.append('plantImage', plantImage);
  };
  for (let ex of formData.entries()) {
    console.log(ex)
  }
  const response = await fetch(`${BASIC_URL}addPlant`, {
    method: 'POST',
    body: formData
  });
};

export default function AddPlant({plants, setPlants, setModal}: AddPlantFormProps) {
  
  const { register, handleSubmit, reset, formState: { errors }, control } = useForm();

  async function extractNewPlantFromForm(data: dataObject) {
    const response = await addPlantRequest(data.plantName, data.plantImage)
    // const newPlants = [...plants, new Plant(response.plantName, response.plantImage)]
    // setPlants(newPlants)
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
