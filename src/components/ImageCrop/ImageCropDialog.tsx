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
async function s3BucketUrlToLocalUrl(url: string): Promise<string> {
  const response = await fetch(url, {method: 'GET'})
  const blobObject = await response.blob()
  return  URL.createObjectURL(blobObject)
}
export default function ImageCropDialog({imageUrl, cropInit, zoomInit, aspectInit, assignCroppedImageToRef, imageName}: ImageCropProps) {
  if (zoomInit == null) {
    zoomInit = 1
  }
  if (cropInit == null) {
    cropInit = {x: '100%', y: '100%'}
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
    const url = await s3BucketUrlToLocalUrl(imageUrl)
    const croppedImageFile = await getCroppedImg(url, croppedAreaPixels as CroppedArea, imageName)
    assignCroppedImageToRef(croppedImageFile)
    // imageName dependency was added in case of editing in oppose of adding
  }, [imageName]) 

  return (
    <>
      <div className="image-crop-container">
        <Cropper
        image={imageUrl}
        crop={crop}
        zoom={zoom}
        aspect={ 1 }
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
        />
        <img className="preview-image" src={imageUrl} alt="Preview"/>
      </div>
      <div className='cropper-controls'>
        <input
          className='cropper-slider'
          type='range'
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setZoom(+e.target.value)}}
          />
      </div>
    </>
    )
}