import styled from "styled-components";
import React from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
interface Props {
    text: string
    htmlFor: string
}

const NewLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 5px;
    font-weight: 200;
    color: white;
    border: none;
    background: #007449;
    border-radius: 5px;
    gap: 0.5rem;
    height: 15px;
    min-width: 100px;
    white-space: nowrap;
    &:hover {
        background-color: rgb(0, 90, 0);
        cursor: pointer;
  }
`;

const UploadButton: React.FC<Props> = ({text, htmlFor}) => {
  return (
    <NewLabel htmlFor={htmlFor} className='file-upload-button'><PhotoIcon className="" width={15}/> {text} </NewLabel>
  )
}

export default UploadButton;