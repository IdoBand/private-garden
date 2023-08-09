import { ArrowRightIcon} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { Plant } from '../../types/interface'
import { plantManager } from '../../types/PlantManager'
import logo from '/leaf-svgrepo-com.svg'
interface PlantCardProps {
  plant: Plant
  removeButtons: boolean
  checkBoxPlant: (id: string) => void
}
const PlantCard = ({plant, removeButtons, checkBoxPlant}: PlantCardProps) => {
  return (
    <Link to={`/PlantTimeline/${plant._id!}`} className='plant-card-link'>
      {removeButtons && <input
                        checked={plant.checked}
                        className="plant-card-toggle"
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => checkBoxPlant(plant._id!)}/>
                                    }
        <ArrowRightIcon className='arrow-right'/>
        <div className='plant-card-img-container'>
          <img className='plant-card-img' src={plant.img ? plant.img as string : logo} alt={plant.plantName}/>  
        </div>
        <div className="plant-name"> {plantManager.capitalize(plant.plantName)} </div>
    </Link>
  )
}

export default PlantCard