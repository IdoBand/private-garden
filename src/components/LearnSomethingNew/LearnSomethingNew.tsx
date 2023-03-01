import { useEffect, useState } from "react"
import { plantNames } from "./plants"
import GreenButton from "../Button/GreenButton"
// import { useQuery } from "@tanstack/react-query"
import { PropagateLoader } from "react-spinners"

export default function LearnSomethingNew() {
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
            <div id="meet-a-plant-container">
                <GreenButton 
                    text="Fetch"
                    onClick={fetchPlant}
                    width="85"
                    />
                <br />
                <div id="content"> 
                    <div id="sub-content">
                        {plant? 
                            plant
                            : 
                            <PropagateLoader color="green"/>}
                    </div>
                </div>
                
                
                    
            </div>
        </>
    )
}