import { Plant, PlantUpdate } from "../types/interface"
const BASIC_URL: string = import.meta.env.VITE_BASIC_SERVER_URL
export async function fetchMyGarden(userId: string) {
    const response = await fetch(`${BASIC_URL}/plants/${userId}`)
    const result = await response.json()
    return result
}
export async function fetchAddPlant(plant: Plant, plantImage?: 'image/jpeg' | 'image/jpg' | null | File) {
    const formData = new FormData()
    formData.append('plant', JSON.stringify(plant))
    if (plantImage) {
        formData.append('plantImage', plantImage);
    }
    const response = await fetch(`${BASIC_URL}/plants`, {
        method: 'POST',
        body: formData
  });
  const result = await response.json()
  return result
}
export async function fetchEditPlant(plant: Plant, plantImage?: 'image/jpeg' | 'image/jpg' | null | File) {
    const formData = new FormData()
    formData.append('plant', JSON.stringify(plant))
    if (plantImage) {
        formData.append('plantImage', plantImage);
    }
    const response = await fetch(`${BASIC_URL}/plants/${plant._id}`, {
        method: 'PATCH',
        body: formData
  });
  const result = await response.json()
  return result
}
export async function fetchDeletePlants(IdsToRemove: string[]) {
    const response = await fetch(
    `${BASIC_URL}/plants/delete`,
    {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ ids: IdsToRemove })
        })
    const result = await response.json()
    return result
}
export async function fetchPlantById(plantId: string, userId: string) {
    const response = await fetch(`${BASIC_URL}/plants/${userId}/${plantId}`)
    const result = await response.json()
    return result
}
///////////////////       U  P  D  A  T  E  S        ///////////////////
export async function fetchPlantUpdates(plantId: string) {
    const response = await fetch(`${BASIC_URL}/plantUpdates/${plantId}`)
    const result = await response.json()
    return result
}
export async function fetchAddPlantUpdate(plantUpdate: Partial<PlantUpdate>, images: File[]) {
    const formData = new FormData();
    formData.append('plantUpdate',JSON.stringify(plantUpdate))
    if (images.length) {
        for (let i = 0 ; i < images.length ; i++) {
            formData.append('updateImages', images[i])
        } 
    }
    const response = await fetch(`${BASIC_URL}/plantUpdates`, {
      method: 'POST',
      body: formData
    });
    const result = await response.json()
    return result
}
export async function fetchEditPlantUpdate(plantUpdate: Partial<PlantUpdate>, images: File[]) {
    const formData = new FormData();
        formData.append('plantUpdate',JSON.stringify(plantUpdate))
    if (images.length) {
        for (let i = 0 ; i < images.length ; i++) {
            formData.append('updateImages', images[i])
        } 
    }
    const response = await fetch(`${BASIC_URL}/plantUpdates/${plantUpdate._id}`, {
        method: 'PATCH',
        body: formData
  });
  const result = await response.json()
  return result
}
export async function fetchDeletePlantUpdates(IdsToRemove: string[]) {
    const response = await fetch(
    `${BASIC_URL}/plantUpdates/delete`,
    {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ ids: IdsToRemove })
        })
    const result = await response.json()
    return result
}


///////////////////       R  A  N  D  O  M         ///////////////////
export async function fetchRandom(plantName: string) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${plantName}?redirect=false`;
    const response = await fetch(url)
    const data = await response.json()
    return data
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
    return result 
}
