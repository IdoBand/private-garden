import { useState, useRef } from "react"
import { plantNames } from "./plants"
import GreenButton from "../Button/GreenButton"
import Spinner from "../Spinner/Spinner"
import { fetchRandom } from '../../hooks/fetchers'
import { capitalize } from '../../hooks/helpfulFunctions'
import logo from '/assets/logo.jpg'

export default function RandomPlant() {
    const plantName = useRef<string>('')
    const [plantSummary, setPlantSummary] = useState('Click on the green button for content')
    const [plantImage, setPlantImage] = useState<any>(null)
    
    async function handleRandomness() {
        setPlantSummary('')
        const plantString = plantNames[Math.floor(Math.random() * plantNames.length)];
        const data = await fetchRandom(plantString)
        plantName.current = capitalize(plantString, true)
        if (data.thumbnail && data.thumbnail.source) {
            setPlantImage(data.thumbnail.source)
        } else {
            setPlantImage(logo)
        }
        setPlantSummary(data.extract)
      }

    return (
        <>
            <div className="page-container">
                <div className="page-content">
                    <div id="random-plant-options">
                        <GreenButton 
                        text="Click for Randomness"
                        onClick={handleRandomness}
                        />
                    </div>
                    <div id="random-plant-content">
                        {plantSummary? 
                            <>  <div className="random-plant-header-summary">
                                    <div className="form-header">{plantName.current}</div>
                                    <p>
                                        {plantSummary}
                                    </p>
                                </div>
                                <img className="random-plant-image" src={plantImage} />
                            </>
                            : 
                            <Spinner />}
                    </div>
                </div>
            </div>
        </>
    )
}