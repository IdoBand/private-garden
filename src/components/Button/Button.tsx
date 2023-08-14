import React from 'react'
interface ButtonProps {
    text: string
    onClick: any
    isDisabled: boolean
    children?: React.ReactNode
    type: 'button' | 'submit'
    className: 'green-button' | 'red-button' | 'file-upload-button'
}
const Button = ({text, onClick, isDisabled, children, type, className}: ButtonProps) => {
  return (
    <button type={type} onClick={() => onClick()} disabled={isDisabled} className={className} >
        {text}
        {children}
    </button>
  )
}

export default Button

