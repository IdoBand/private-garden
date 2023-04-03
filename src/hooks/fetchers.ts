import { useQuery, useMutation } from "@tanstack/react-query"
import { Plant } from "../types/Plant"
const BASIC_URL: string = 'http://localhost:8000'

///////////////////       P  L  A  N  T  S        ///////////////////

export async function fetchEntireGarden() {
    console.log('fetching garden')
    const response = await fetch(`${BASIC_URL}/getEntireGarden`)
    const entireGardenArray = await response.json()
    return entireGardenArray
}
export async function fetchRemovePlantsPermanently(IdsToRemove: string[]) {
    console.log('removing plants')
    const response = await fetch(`${BASIC_URL}/removePlants`, {method: 'POST',
                                                                    headers: {'Content-Type': 'application/json'},
                                                                    body: JSON.stringify({IdsToRemove: IdsToRemove})
                                                                    })
    const resultString = await response.json()
    return resultString.message
}

export async function fetchAddPlant(plantName: string, plantImage?: 'image/jpeg' | 'image/jpg' | null | File) {
    console.log('adding plant')
    const formData = new FormData();
    console.log(plantImage);
    
    formData.append('plantName', plantName)
    if (plantImage) {
        formData.append('plantImage', plantImage);
    };
    const response = await fetch(`${BASIC_URL}/addPlant`, {
        method: 'POST',
        body: formData
  });
  const message = await response.json()
  return message.message
}
export async function fetchEditPlant(plantId: string, plantName: string, plantImage?: File | 'image/jpeg' | 'image/jpg' | null) {
    console.log('editing plant')
    
    const formData = new FormData();
    formData.append('plantId', plantId)
    formData.append('plantName', plantName)
    if (plantImage) {
        formData.append('plantImage', plantImage);
    };
    const response = await fetch(`${BASIC_URL}/editPlantById`, {
        method: 'POST',
        body: formData
  });
    const message = await response.json()
    return message.message
}
///////////////////       U  P  D  A  T  E  S        ///////////////////

export async function fetchUpdatesByPlantId(plantId: string) {
    const response = await fetch(`${BASIC_URL}/getAllUpdatesByPlantId?id=${plantId}`)
    const updates = await response.json()
    return updates
}

export async function fetchAddPlantUpdate(updateObject: any, currentPlant: Plant) {
    const formData = new FormData();
    formData.append('plantId',currentPlant?.id as string)
    formData.append('plantName', currentPlant?.name as string)
    for (const key in updateObject) {
      const value: any = updateObject[key]
      formData.append(key, value)
    }
    
    const response = await fetch(`${BASIC_URL}/addPlantUpdate`, {
      method: 'POST',
      body: formData
    });
    const res = await response.json()
    return res.message
}
export async function fetchEditPlantUpdate(updateObject: any, currentPlant: Plant) {
    const formData = new FormData();
    formData.append('plantId',currentPlant?.id as string)
    formData.append('plantName', currentPlant?.name as string)
    for (const key in updateObject) {
      const value: any = updateObject[key]
      formData.append(key, value)
    }
    
    const response = await fetch(`${BASIC_URL}/editPlantUpdate`, {
      method: 'POST',
      body: formData
    });
    const res = await response.json()
    return res.message
}

export async function fetchRemovePlantUpdatesPermanently(IdsToRemove: string[]) {
        console.log('removing updates')
        const response = await fetch(`${BASIC_URL}/removeUpdates`, {method: 'POST',
                                                                        headers: {'Content-Type': 'application/json'},
                                                                        body: JSON.stringify({IdsToRemove: IdsToRemove})
                                                                        })
        const resultString = await response.json()
        return resultString.message
}

///////////////////       I  D  E  N  T  I  F  Y        ///////////////////

export async function fetchIdentifyPlant(plantImages: File[]) {
    const formData = new FormData();
    for (let i = 0 ; i < plantImages.length ; i++) {
        formData.append('plantImages', plantImages[i])
    } 
    
    const response = await fetch(`${BASIC_URL}/IdentifyPlant`, 
    {
        method: 'POST',
        body: formData
  })
    const result = await response.json()
    return result.message   
}