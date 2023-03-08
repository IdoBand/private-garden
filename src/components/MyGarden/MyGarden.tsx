import { useState, useEffect, useRef } from "react"
import { Plant } from "../../types/Plant"
import GreenButton from "../Button/GreenButton"
import RedButton from "../Button/RedButton"
import Modal from "../Modal/Modal"
import AddPlant from "../AddPlantForm/AddPlantForm"
import { useQuery } from "@tanstack/react-query"

function bufferToImage(arrayBuffer: any) {
    let binary: string = ''
    const bytes = new Uint8Array(arrayBuffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return btoa(binary)
}

let originalPlantsHolder: Plant[] =[]

export default function MyGarden() {
    
    const [addPlantModal, setAddPlantModal] = useState(false)
    const [removeButtons, setRemoveButtons] = useState(false)
    const [plants, setPlants] = useState<Plant[]>([])
    const searchBarInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch('http://localhost:8000/getEntireGarden')
            .then(res => res.json())
            .then((data) => {
                const newPlants: Plant[] = []
                for (let p of data) {
                const newPlant = new Plant(p._id, p.plantName, p.dateAdded, p.irrigations, p.img.data.data)
                newPlants.push(newPlant)
                }
                setPlants(newPlants)
                originalPlantsHolder = newPlants
            })
            .catch(() => console.log('there was an error fetching the garden'))
    }, [])

    async function removePlantsPermanently() {
        const newPlants: Plant[] = plants.filter(plant => plant.checked === false)
        setPlants(newPlants)
    }
    function checkBoxPlant(plantId: string) {
        const newPlants: Plant[] =[]
        plants.forEach(plant => {
            if (plant.id === plantId) {
                plant.checked = !plant.checked}
            newPlants.push(plant)
        })
        setPlants(newPlants)
    }
    function selectAll() {
        const newPlants: Plant[] = [];
        plants.forEach(plant => {
            plant.checked = !plant.checked;
            newPlants.push(plant)
        })
        setPlants(newPlants)
    }
    function handleSearch(){
        const searchValue = searchBarInputRef.current!.value
        console.log(searchValue)
        if (searchBarInputRef.current!.value !== '') {
            const searchValue = searchBarInputRef.current!.value.toLocaleLowerCase()
            const filteredPlants: Plant[] = originalPlantsHolder.filter(plant => plant.name.includes(searchValue))
            setPlants(filteredPlants)
        } else {
            setPlants(originalPlantsHolder)
        }
    }
    function CapitalizeName(name: string): string {
        const words = name.split(' ')
        const capitalizedWords = words.map(word => {
            const firstLetter = word.charAt(0).toUpperCase();
            const restOfWord = word.slice(1);
            return `${firstLetter}${restOfWord}`;
        })
        return capitalizedWords.join(' ')   
    }
    return (
        <>
            <div id="my-Garden-container">
                <div id="my-garden-content">
                    <div id="my-garden-options">
                        <div id="buttons">
                        <GreenButton text="Add a Plant" onClick={() => setAddPlantModal(true)}/>
                        <GreenButton text="Remove Plants" onClick={() => setRemoveButtons(!removeButtons)}/>
                        {removeButtons && <>
                            <RedButton text="Select All" onClick={selectAll}/>
                            <RedButton text="Remove Permanently" onClick={() => removePlantsPermanently()}/>
                                        </>
                        }
                        </div>
                        <div id="search-bar-and-count">
                            <input id="search-bar-left" type="text" defaultValue="&#128269;"/>
                            <input id="search-bar" type="text" ref={searchBarInputRef} onChange={handleSearch} placeholder="Search" />
                            <div id="plants-counter">You Have {plants.length} Plants</div>
                        </div>    
                    </div>
                    <div id="plants-container">
              
                        {plants && plants.map(plant => 
                            <div className="plant-card" key={plant.id}>
                                {removeButtons && <input
                                                    checked={plant.checked}
                                                    className="toggle"
                                                    type="checkbox"
                                                    onChange={() => checkBoxPlant(plant.id)}/>
                                }
                                <img width="100" src={`data:image/png;base64,${bufferToImage(plant.imageBufferArray)}`} alt=""/>
                                <h5> {CapitalizeName(plant.name)} </h5>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {addPlantModal && <Modal open={addPlantModal} onClose={() => setAddPlantModal(false)} content={<AddPlant plants={plants} setPlants={setPlants} setModal={setAddPlantModal}/>}></Modal>}
        </>
    )
}