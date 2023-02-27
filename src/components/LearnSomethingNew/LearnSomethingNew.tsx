import { useState } from "react"
import { plantNames } from "./plants"
import Button from "../Button/Button"

export default function LearnSomethingNew() {
    const [plant, setPlant] = useState('')

    async function fetchPlant() {
        const plantString = plantNames[Math.floor(Math.random() * plantNames.length)]
        console.log(plantString)
        ''
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${plantString}?redirect=false`
        const response = await fetch(url)
        const info = await response.json()
        setPlant(info.extract)
    }

    return (
        <>
            <div id="meet-a-plant-container">
                <Button 
                    border="solid"
                    backgroundColor="rgb(0, 150, 0)"
                    color="white"
                    height="25px"
                    onClick={fetchPlant}
                    borderRadius="10px"
                    width="80px"
                    children="Fetch" 
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