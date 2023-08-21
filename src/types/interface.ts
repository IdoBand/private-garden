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
  profileImg?: ImgBuffer | string | File // for now user image is taken only from auth0
  followers?: string[]
  following?: string[]
}
export type Post = {
  _id: string
  userId: string
  images: ImgBuffer[] | string[] | File[]
  dateAdded: Date | number | string
  text: string
  likes: string[]
  comments: Comment[]
  userName: string
  profileImg: string
  // frontend
  lastPostRef?: any // future pagination
}
export type Comment = {
  _id: string
  userId: string
  text: string
  profileImg: string
}