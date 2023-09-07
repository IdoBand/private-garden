import { Plant, PlantUpdate, Post, User } from "../types/interface"

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
    
    const response = await fetch(`${BASIC_URL}/planetNet/identify`, 
    {
        method: 'POST',
        body: formData
    })
    const result = await response.json()
    return result 
}

///////////////////       U  S  E  R  S        ///////////////////

export async function fetchSignInUser(rawUser: Partial<User>, profileImg: File | string) {
    const formData = new FormData();
    if (rawUser.profileImg) {
        delete rawUser.profileImg
    }
    formData.append('user',JSON.stringify(rawUser))
    if (profileImg) {
        formData.append('profileImg', profileImg);
    }
    const response = await fetch(`${BASIC_URL}/users`, {
      method: 'POST',
      body: formData
    });
    const result = await response.json()
    return result
}
///////////////////       P  O  S  T  S        ///////////////////
export async function fetchAddPost(post: Partial<Post>, images: File[]) {
    const formData = new FormData();
    formData.append('post',JSON.stringify(post))
    if (images.length) {
        for (let i = 0 ; i < images.length ; i++) {
            formData.append('postImages', images[i])
        } 
    }
    const response = await fetch(`${BASIC_URL}/posts`, {
        method: 'POST',
        body: formData
    });
    const result = await response.json()
    return result
}
export async function fetchAllPosts(userId: string) {
    const response = await fetch(`${BASIC_URL}/posts/${userId}`, {
        method: 'GET'
    })
    const result = await response.json()
    return result
}
export async function fetchDeletePost(postId: string) {
    const response = await fetch(`${BASIC_URL}/posts/delete/${postId}`, {
        method: 'GET'
    })
    const result = await response.json()
    return result
}
export async function fetchLike(postId: string, userId: string, like: boolean) {
    const data = {
        postId,
        userId,
        like
    }

    const response = await fetch(
        `${BASIC_URL}/posts/like`,
        {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
    const result = await response.json()
    return result
}
export async function fetchEditPost(post: Partial<Post>, images: File[]) {
    const formData = new FormData();
    formData.append('post',JSON.stringify(post))
    if (images.length > 0) {
        for (let i = 0 ; i < images.length ; i++) {
            formData.append('postImages', images[i])
        } 
    }
    const response = await fetch(`${BASIC_URL}/posts`, {
        method: 'PATCH',
        body: formData
    });
    const result = await response.json()
    return result
}