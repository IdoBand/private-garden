import { useState } from "react"
import { Plant } from "../../types/Plant"
import GreenButton from "../Button/GreenButton"
import Modal from "../Modal/Modal"
import AddPlant from "../AddPlantForm/AddPlantForm"

export default function MyGarden() {
    const [addPlant, setAddPlant] = useState(false)

    const [plants, setPlants] = useState([])
    const plant1 = new Plant('Alocasia Dragon')
    const plant2 = new Plant('Alocasia Green Velvet')
    const plant3 = new Plant('Monstera Deliciosa')
    const arr = [plant1, plant2, plant3,plant1, plant2, plant3,plant1, plant2, plant3]
    const func = () => {
        return
    }

    return (
        <>
            <div id="my-Garden-container">
                <div id="my-garden-content">
                    <div id="my-garden-options">
                        <div id="buttons">
                        <GreenButton text="Add a Plant" onClick={() => setAddPlant(true)} width="100"/>
                        <GreenButton text="Remove a Plant" onClick={func} width="120"/>
                        </div>
                        
                        <div id="search-bar"><div>Search Bar</div></div>
                        <div id="plants-counter">You Have {arr.length} Plants</div>
                    </div>
                    <div id="plants-container">
                        {arr.map(plant =>
                            <div className="plant-card">
                                <img src={plant.path} width="100"/>
                                <h5> {plant.name} </h5>
                            </div>
                            
                            )}
                    </div>
                </div>
            </div>
            {addPlant && <Modal open={addPlant} onClose={() => setAddPlant(false)} content={<AddPlant />}></Modal>}
        </>
    )
}