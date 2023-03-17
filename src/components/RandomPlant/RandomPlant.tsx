import { useState } from "react"
import { plantNames } from "./plants"
import GreenButton from "../Button/GreenButton"
// import { useQuery } from "@tanstack/react-query"
import Spinner from "../Spinner/Spinner"

export default function RandomPlant() {
    const [plant, setPlant] = useState('Click for content')

    async function fetchPlant(): Promise<any> {
        setPlant('')
        const plantString = plantNames[Math.floor(Math.random() * plantNames.length)];
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${plantString}?redirect=false`;
        const response = await fetch(url)
        const data = await response.json()
        setPlant(data.extract)
      }

    // const plantQuery = useQuery({
    //     queryKey: ['plant'],
    //     queryFn: fetchPlant,
    //     initialData: false
    // })
    // console.log(plantQuery.isLoading)

 
    return (
        <>
            <div className="page-container">
                <div id="random-plant-container">
                    <div id="random-plant-options">
                        <GreenButton 
                        text="Fetch"
                        onClick={fetchPlant}
                        />
                    </div>
                    <div id="random-plant-content">
                        {plant? 
                            plant
                            : 
                            <Spinner />}
                    </div>
                </div>
            </div>
        </>
    )
}