import React from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
interface Props {
    text: string
    htmlFor: string
    size: 'large' | 'small'
}

const UploadButton: React.FC<Props> = ({text, htmlFor, size}) => {
  return ( size === 'large' ?
    <label htmlFor={htmlFor} className='large-file-upload-button'><PhotoIcon className="" width={15}/> {text} </label>
    :
    <label htmlFor={htmlFor}className="small-file-upload-button"><PhotoIcon width={20} color="#007449" /></label>
  )
}

export default UploadButton;