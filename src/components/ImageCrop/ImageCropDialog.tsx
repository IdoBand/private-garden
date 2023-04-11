import Cropper from 'react-easy-crop'
import { useState, useCallback } from 'react'
import getCroppedImg from './canvasToFile'
interface ImageCropProps {
    imageUrl: string
    cropInit: any
    zoomInit: any
    aspectInit: any
    assignCroppedImageToRef: any
    imageName: string
  }
  const aspectRatios = [
    {value: 1 / 1, text: '1 / 1'},
    {value: 16 / 9, text: '16 / 9'},
    {value: 4 / 3, text: '4 / 3'},
  ]
export interface CroppedArea {
    width: number
    height: number
    x: number
    y: number
}

export default function ImageCropDialog({imageUrl, cropInit, zoomInit, aspectInit, assignCroppedImageToRef, imageName}: ImageCropProps) {
    if (zoomInit == null) {
        zoomInit = 1
    }
    if (cropInit == null) {
        cropInit = {x: 0, y: 0}
    }
    if (aspectInit == null) {
        aspectInit = aspectRatios[0]
    }
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null)
  const onCropComplete = useCallback(async (croppedArea: CroppedArea, croppedAreaPixels: CroppedArea) => {
    // console.log(croppedArea)
    // console.log(croppedAreaPixels);
    
    setCroppedAreaPixels(croppedAreaPixels)
    const croppedImageFile = await getCroppedImg(imageUrl, croppedAreaPixels as CroppedArea, imageName)
    assignCroppedImageToRef(croppedImageFile)
    // imageName dependency was added in case of editing in oppose of adding
  }, [imageName]) 

  return (
    <>
        <Cropper
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={ 1 }
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        />
    </>
    )
}