import { useState, useEffect } from "react"
import { Plant } from "../../types/Plant"
import GreenButton from "../Button/GreenButton"
import RedButton from "../Button/RedButton"
import Modal from "../Modal/Modal"
import AddPlant from "../AddPlantForm/AddPlantForm"

export default function MyGarden() {
    const [addPlantModal, setAddPlantModal] = useState(false)
    const [removeButtons, setRemoveButtons] = useState(false)

    const plant1 = new Plant('Alocasia Dragon', '1')
    const plant2 = new Plant('Alocasia Green Velvet', '2')
    const plant3 = new Plant('Monstera Deliciosa','3')
    const arr: Plant[] = [plant1, plant2, plant3]
    const [plants, setPlants] = useState<Plant[]>(arr)

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
                        
                        <div id="search-bar"><div>Search Bar</div></div>
                        <div id="plants-counter">You Have {plants.length} Plants</div>
                    </div>
                    <div id="plants-container">
                        {plants.map(plant =>
                            <div className="plant-card" key={plant.id}>
                                {removeButtons && <input
                                                    checked={plant.checked}
                                                    className="toggle"
                                                    type="checkbox"
                                                    onChange={() => checkBoxPlant(plant.id)}/>
                                }
                                
                                <img src={plant.path} width="100"/>
                                <h5> {plant.name} </h5>
                            </div>
                            
                            )}
                    </div>
                </div>
            </div>
            {addPlantModal && <Modal open={addPlantModal} onClose={() => setAddPlantModal(false)} content={<AddPlant plants={plants} setPlants={setPlants} setModal={setAddPlantModal}/>}></Modal>}
        </>
    )
}