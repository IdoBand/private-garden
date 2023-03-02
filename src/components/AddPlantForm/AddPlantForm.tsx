import React from 'react'
import { useForm, Controller } from "react-hook-form";
type FormData = {
    plantName: string;
    plantImage: string;
   
  };

export default function AddPlant() {

    const { register, setValue, handleSubmit, formState: { errors }, control } = useForm<FormData>();
    const onSubmit = handleSubmit(data => console.log(data));
    return (
        <>
             <form onSubmit={onSubmit} id="add-plant-form">
                <h2>Add a New Plant</h2>
      <label>Plant Name</label>
      <input {...register("plantName")} /><br />
      <Controller
        name="plantImage"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input type="file" onChange={(e) => field.onChange(e.target.files[0])} />
        )}
      />
    </form>
        </>
    )
}
