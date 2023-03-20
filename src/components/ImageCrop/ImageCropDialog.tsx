import Cropper from 'react-easy-crop'
import { useState, useEffect, useCallback } from 'react'
import getCroppedImg from './canvasToFile'
interface ImageCropProps {
    imageUrl: string
    cropInit: any
    zoomInit: any
    aspectInit: any
    assignCroppedImageToRef: any
    imageFileName: any
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

export default function ImageCropDialog({imageUrl, cropInit, zoomInit, aspectInit, assignCroppedImageToRef, imageFileName}: ImageCropProps) {
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
    console.log(croppedArea, croppedAreaPixels)
    setCroppedAreaPixels(croppedAreaPixels)
    const croppedImageFile = await getCroppedImg(imageUrl, croppedAreaPixels as CroppedArea, imageFileName)
    assignCroppedImageToRef(croppedImageFile)
        
  }, [])

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