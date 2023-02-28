import { useState } from "react"
import { plantNames } from "./plants"
import GreenButton from "../Button/GreenButton"

export default function LearnSomethingNew() {
    const [plant, setPlant] = useState('')

    async function fetchPlant(): Promise<void> {
        const plantString = plantNames[Math.floor(Math.random() * plantNames.length)]
        console.log(plantString)
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${plantString}?redirect=false`
        const response = await fetch(url)
        const info = await response.json()
        setPlant(info.extract)
    }

    return (
        <>
            <div id="meet-a-plant-container">
                <GreenButton 
                    text="Fetch"
                    onClick={fetchPlant}
                    width="85"
                    />
                <br />
                <div id="content"> {plant? 
                
                <div id="sub-content">{plant}</div> 
                : 
                'Click on fetch for content!'}
                </div>
                    
            </div>
        </>
    )
}