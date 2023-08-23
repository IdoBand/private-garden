import { ArrowRightIcon} from '@heroicons/react/24/solid'
import { Skeleton } from '@mui/material'

const PlantCardSkeleton = () => {
  return (
    <div className='card-key-container'>
        <article className='plant-card-link'>
            <ArrowRightIcon className='arrow-right'/>
            <div className='plant-card-img-container'>
                <Skeleton variant='rounded' width={100} height={100} className='plant-card-img' />  
            </div>
            <Skeleton height={35} width={150} style={{marginBottom: '3px'}}></Skeleton>
        </article>
    </div>
  )
}

export default PlantCardSkeleton