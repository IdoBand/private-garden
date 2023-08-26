import React from 'react'
import { MoonLoader } from 'react-spinners'
import { TrashIcon, PlusCircleIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
interface ButtonProps {
    text: string
    onClick: any
    isDisabled: boolean
    children?: React.ReactNode
    type: 'button' | 'submit'
    className: 'green-button' | 'red-button' | 'file-upload-button' | 'green-button blank'
    spinner?: boolean
    icon?: string
}
const Button = ({text, onClick, isDisabled, children, type, className, spinner, icon}: ButtonProps) => {
  return (
    <button type={type} onClick={() => onClick()} disabled={isDisabled} className={className} >
        {icon && ICONS[icon]}
        {spinner ? <MoonLoader size={15} color='#fff' /> : text}
        {children}
    </button>
  )
}

export default Button

const ICONS: {[key: string]: React.ReactNode} = {
  trash: <TrashIcon width={16} />,
  add: <PlusCircleIcon width={16} />,
  edit: <PencilSquareIcon width={16} />
}

