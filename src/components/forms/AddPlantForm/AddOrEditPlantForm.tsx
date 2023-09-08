import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useCallback } from 'react'
import Button from "../../Button/Button";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks"
import ImageCropDialog from "../../ImageCrop/ImageCropDialog";
import { Plant } from "../../../types/interface";
import { addPlants } from "../../../redux/plantsSlice";
import UploadButton from "../../Button/UploadButton";
import { plantManager } from "../../../types/PlantManager";
import { fetchAddPlant, fetchEditPlant } from "../../../util/fetch";
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
  refetch?: any
}

export default function AddOrEditPlantForm({setModal, plant, addOrEdit, showSnackbar, setPlants, refetch}: AddPlantFormProps) {

  const [isFetching, setIsFetching] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const [imageCropPreviewUrl, setImageCropPreviewUrl] = useState<string>('');
  const imageFileRef = useRef<File | null>(null);
  const reduxPlants = useAppSelector(state => state.plants.plants)
  const userId = useAppSelector(state => state.window.user.id)
  const dispatch = useAppDispatch()
  const assignCroppedImageToRef = useCallback((file: any) => {
    imageFileRef.current = file
  }, [])

  
  const formHeader: string = addOrEdit === 'add' ? 'Add a New Plant' : 'Edit a Plant';  

  function concatNewPlantToReduxState(plant: Plant) {
    const imageString = imageFileRef.current ? URL.createObjectURL(imageFileRef.current) : ''
    const newPlant: Plant = plantManager.serializePlant({
      ...plant,
      userId: userId,
      img: imageString,
      dateAdded: new Date,
    })
    const newPlants = reduxPlants.concat(newPlant)
    dispatch(addPlants(newPlants))
    setModal(false)
    if (setPlants) {
      setPlants!(newPlants)
    }
  }
  
  async function extractDataFromForm(data: addPlantDataObject) {
    if (!data.plantImage && plant?.img as string) {
      data.plantImage = imageFileRef.current as File
    }
    setIsFetching(true)
    let newPlant: Plant = {
      userId: userId,
      img: '',
      dateAdded: new Date(),
      plantName: data.plantName
    }
    let response;
    if (addOrEdit === 'add') {
      try {
        response = await fetchAddPlant(newPlant, imageFileRef.current)
        newPlant = {...newPlant, _id: response.data}
      if (response.success) {
        concatNewPlantToReduxState(newPlant)
        showSnackbar("Plant added successfully", "success")
        setModal(false)
      }
      } catch (err) {
        showSnackbar("Failed to add plant", "error")
      }
    } else if (addOrEdit === 'edit') {
      try {
        newPlant._id = plant!._id
        response = await fetchEditPlant(newPlant, imageFileRef.current)
        if (response.success) {
          await refetch()
          showSnackbar("Plant edited successfully", "success")
          setModal(false)
        }
      } catch (err) {
        showSnackbar("Failed to edit plant", "error")
      }
    }
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
            <Controller
              name="plantImage"
              control={control}
              defaultValue=""
              render={({ field }) => (
                  <>
                    <input id="add-plant-upload" type="file" className="form-file-input" accept="image/jpeg, image/jpg" onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const selectedFile = e.target.files[0];
                        // imageFileRef makes sure that the cropped image will receive the image's original name
                        field.onChange(selectedFile);
                        imageFileRef.current = selectedFile
                        setImageCropPreviewUrl(URL.createObjectURL(selectedFile));
                      }
                    }} />
                    <UploadButton htmlFor="add-plant-upload" text="Upload Image" size="small" />
                  </>
                )}
            />
          </section>
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
              <span className="form-label">New Image:</span>
              <ImageCropDialog 
                imageUrl={imageCropPreviewUrl} 
                cropInit={null} 
                zoomInit={null} 
                aspectInit={null}
                assignCroppedImageToRef={assignCroppedImageToRef}
                imageName={imageFileRef.current?.name as string}
              /> 
            </section>    
          }
          <Button type="submit" className="green-button" onClick={handleSubmit} text="Submit" isDisabled={isFetching} spinner={isFetching} />
        </form>
    </>
  )
}