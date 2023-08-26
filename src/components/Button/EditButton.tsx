import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"

type EditButtonProps = {
    onClick: any
    isDisabled?: boolean
}

const EditButton = ({onClick}: EditButtonProps) => {
  return (
    <button className="edit-button" onClick={onClick}>
        <EllipsisVerticalIcon width={20} />
    </button>
  )
}

export default EditButton