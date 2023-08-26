import React from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
interface Props {
    text: string
    htmlFor: string
}

const UploadButton: React.FC<Props> = ({text, htmlFor}) => {
  return (
    <label htmlFor={htmlFor} className='file-upload-button'><PhotoIcon className="" width={15}/> {text} </label>
  )
}

export default UploadButton;