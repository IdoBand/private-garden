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
  id: string
  firstName: string
  lastName: string
  dateAdded?: Date | number
  lastActive?: Date | number
  profileImg?: ImgBuffer | string | File
  followers?: string[]
  following?: string[]
}