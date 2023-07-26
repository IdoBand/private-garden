import { useState } from "react"
import { plantNames } from "./plants"
import GreenButton from "../../components/Button/GreenButton"
import Spinner from "../../components/Spinner/Spinner"
import { fetchRandom } from '../../util/fetch'
import logo from '/assets/leaf-svgrepo-com.svg'
import { plantManager } from "../../types/PlantManager"
import { useSnackbar } from "../../hooks/useSnackbar"
interface RandomPlantProps {
    plantName: string
    data: any
}

export default function RandomPlant() {
    const { show: showSnackbar, component: snackBar } = useSnackbar();
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [randomPlant, setRandomPlant] = useState<RandomPlantProps>({plantName: 'Ready To Learn Something New?', data: null})
    
    function figureOutIfWikipediaSentImage() {
        let src = ''
        try {
            src = randomPlant.data.thumbnail.source
        } catch {
            src = logo
        }
        return src
    }

    async function handleRandomness() {
            setIsFetching(true)
        try {
            const plantString = plantNames[Math.floor(Math.random() * plantNames.length)];
            const data = await fetchRandom(plantString)
            setRandomPlant({
                plantName: plantManager.capitalize(plantString, true),
                data: data
            })
        } catch (err) {
            showSnackbar('Failed to load random plant.', 'error')
        } finally {
            setIsFetching(false)
        }
      }

    return (
        <div className="random-plant-container">
            <div id="random-plant-options">
                <GreenButton 
                    text="Click for Randomness"
                    onClick={handleRandomness}
                    isDisabled={false}
                />
            </div>
            <div id="random-plant-content">
                {!isFetching ?
                    <>  
                        <div className="random-plant-header-summary">
                            <div className="form-header">{randomPlant.plantName}</div>
                            <div className="random-plant-summary-and-image">
                                {
                                    randomPlant.data &&
                                    <p className="random-plant-summary">
                                        {randomPlant.data && randomPlant.data.extract}
                                    </p>
                                }
                                {randomPlant.data && 
                                    <div className="random-plant-image-container">
                                        <img 
                                        className={"random-plant-image"} 
                                        src={figureOutIfWikipediaSentImage()} 
                                    />
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                    : 
                    <Spinner />}
            </div>
            {snackBar}
        </div >
    )
}