import { useForm } from "react-hook-form";
import { useState, useRef, useCallback, useEffect } from 'react'
import Button from "../../Button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks"
import ImageCropDialog from "../../ImageCrop/ImageCropDialog";
import { Plant } from "../../../types/interface";
import { addPlants } from "../../../redux/plantsSlice";
import { plantManager } from "../../../types/PlantManager";
import { fetchAddPlant, fetchEditPlant } from "../../../util/fetch";
import { useUploadImages } from "../../../hooks/useUploadImages";
interface addPlantDataObject {
  plantName: string;
  plantImage: 'image/jpeg' | 'image/jpg' | File;
}
interface AddPlantFormProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  addOrEdit: 'add' | 'edit'
  showSnackbar: any
  plant?: Plant
  setPlants?: React.Dispatch<React.SetStateAction<Plant[]>>
  // for editing a plant from 'PlantTimeline page'
  refetch?: any
}

export default function AddOrEditPlantForm({setModal, plant, addOrEdit, showSnackbar, setPlants, refetch}: AddPlantFormProps) {

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageCropPreviewUrl, setImageCropPreviewUrl] = useState<string>('');
  const { imageFiles, filesInput, errorMessage, deleteAllImages } = useUploadImages(1,0, true, 'upload-plant-profile-image')
  const imageFileRef = useRef<File | null>(null);
  const reduxPlants = useAppSelector(state => state.plants.plants)
  const userId = useAppSelector(state => state.window.user.id)
  const dispatch = useAppDispatch()
  const assignCroppedImageToRef = useCallback((file: any) => {
    imageFileRef.current = file
  }, [])

  
  const formHeader: string = addOrEdit === 'add' ? 'Add a New Plant' : 'Edit a Plant';  

  function concatNewPlantToReduxState(plant: Plant) {
    const newPlant: Plant = plantManager.serializePlant(plant)
    const newPlants = reduxPlants.concat(newPlant)
    dispatch(addPlants(newPlants))
    setModal(false)
    if (setPlants) {
      setPlants!(newPlants)
    }
  }
  useEffect(() => {
    if (imageFiles.length > 0) {
      setImageCropPreviewUrl(URL.createObjectURL(imageFiles[0]))
    } else {
      setImageCropPreviewUrl('')
    }
  }, [imageFiles])

  async function handleAddPlant(plantName: string) {
    let newPlant: Plant = {
      userId: userId,
      dateAdded: new Date(),
      plantName: plantName,
      img: ''
    }
    try {
      const response = await fetchAddPlant(newPlant, imageFileRef.current)
      if (response.success) {
        const img = imageFileRef.current ? URL.createObjectURL(imageFileRef.current) : ''
        newPlant = {
          ...newPlant, 
          _id: response.data, 
          img: img
        }
        concatNewPlantToReduxState(newPlant)
        showSnackbar("Plant added successfully", "success")
        setModal(false)
      }
    } catch (err) {
      showSnackbar("Failed to add plant", "error")
    }
  }
  async function handleEditPlant(newPlantName: string) {
    const plantImage = imageFileRef.current ? imageFileRef.current : null
    let plantEdit: Plant = {
      _id: plant!._id,
      userId: plant!.userId,
      plantName: newPlantName,
      dateAdded: new Date(plant!.dateAdded),
      img: ''
    }
    try {
      const response = await fetchEditPlant(plantEdit, plantImage)
      if (response.success) {
        await refetch()
        showSnackbar("Plant edited successfully", "success")
        setModal(false)
      }
    } catch (err) {
      showSnackbar("Failed to edit plant", "error")
    }
  }
  async function extractDataFromForm(data: addPlantDataObject) {
    setIsFetching(true)
    if (addOrEdit === 'add') {
      await handleAddPlant(data.plantName)
      
    } else if (addOrEdit === 'edit') {
      await handleEditPlant(data.plantName)
    }
    setIsFetching(false)
  }
  function handleClearForm() {
    reset()
    deleteAllImages()
  }
  return (
    <>
        <form className="form" onSubmit={handleSubmit(data => {
          extractDataFromForm(data as addPlantDataObject);
        })} id="add-plant-form">
          <div className="form-header">{formHeader}</div>
          <section className="form-section one-liner">
            <label className="form-label">Plant Name:</label>
            <input {...register("plantName", {required: true})}
              className="one-line-text-input"
              type="text"
              defaultValue={errors.plantName? 'Plant name is required.' : plant?.plantName as string}
              style={{color: errors.plantName? 'red' : 'black'}}
            />
          </section>
          
          <section className="form-section one-liner">
            <label className="form-label">Plant Image:</label>
            {filesInput}
          </section>
          {errorMessage && 
            <section className="form-section">
              {errorMessage}
            </section>
          }
          {
            plant && plant.img &&
            <section className="form-section dir-column">
              <div className="form-label">Existing Image:</div>
              <img
                src={plant.img as string}
                className="preview-image"
                />
            </section>
          }
          {imageCropPreviewUrl &&
            <section className="form-section dir-column">
              {addOrEdit === 'edit' && <span className="form-label">New Image:</span>}
              <ImageCropDialog 
                imageUrl={imageCropPreviewUrl} 
                cropInit={null} 
                zoomInit={null} 
                aspectInit={null}
                assignCroppedImageToRef={assignCroppedImageToRef}
                imageName={'default'}
              /> 
            </section>    
          }
          <section className="form-section buttons-container">
            {addOrEdit === 'add' &&
              <Button type="button" className="green-button blank" onClick={handleClearForm} text="Clear" isDisabled={isFetching} />
            }
            <Button type="submit" className="green-button" onClick={handleSubmit} text="Submit" isDisabled={isFetching} spinner={isFetching} />
          </section>
        </form>
    </>
  )
}