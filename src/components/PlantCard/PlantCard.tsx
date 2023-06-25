import { ArrowRightIcon} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'
import { Plant } from '../../types/Plant'
import { capitalize } from '../../hooks/helpfulFunctions'
import logo from '/assets/logo.jpg'
interface PlantCardProps {
  plant: Plant
  removeButtons: boolean
  checkBoxPlant: (id: string) => void
}
const PlantCard = ({plant, removeButtons, checkBoxPlant}: PlantCardProps) => {
  return (
    <Link to={`/PlantTimeline/${plant.id}`} className='plant-card-link'>
      {removeButtons && <input
                        checked={plant.checked}
                        className="plant-card-toggle"
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => checkBoxPlant(plant.id)}/>
                                    }
        <ArrowRightIcon className='arrow-right'/>
        <div className='plant-card-img-container'>
        <img className='plant-card-img' src={plant.profileImageString ? plant.profileImageString : logo} alt={plant.name}/>
            
        </div>
        <div className="plant-name"> {capitalize(plant.name)} </div>
    </Link>
  )
}

export default PlantCard