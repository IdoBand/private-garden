export interface ImgBuffer {
  data: {
    type: string
    data: number[]
  };
  contentType: string
}
export interface Plant {
  _id?: string
  userId: string
  plantName: string
  dateAdded: Date | number
  img: ImgBuffer | string | File
  // frontend
  checked?: boolean
  updates?: any[]
}
export interface PlantUpdate {
  _id?: string
  userId: string
  plantId: string
  dateAdded: Date | number
  notes: string
  images: string[] | ImgBuffer[]
  irrigation: {
    boolean: boolean,
    waterQuantity: number,
    fertilizer: string,
    fertilizerQuantity: number
  }
  // frontend
  checked?: boolean
}
export interface User {
  userId: string
  name?: string
  img?: string
  followers: string[]
  following: string[]
}