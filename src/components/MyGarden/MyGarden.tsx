import { useState, useEffect, useRef } from "react"
import { Plant } from "../../types/Plant"
import GreenButton from "../Button/GreenButton"
import RedButton from "../Button/RedButton"
import Modal from "../Modal/Modal"
import AddPlantForm from "../forms/AddPlantForm/AddPlantForm"
import { useQuery } from "@tanstack/react-query"
import searchLogo from '../../assets/search_icon-white2.png'
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/counterHooks"
import { addPlants, setCurrentPlant } from "../../redux/plantsSlice"
import Spinner from "../Spinner/Spinner"
import { bufferToImage, capitalize } from "../../hooks/helpfulFunctions"
import { fetchEntireGarden, fetchRemovePlantsPermanently } from '../../hooks/fetchers'


let originalPlantsHolder: Plant[] = []

export default function MyGarden() {
    const [isFetching, setIsFetching] = useState(false)
    const [addPlantModal, setAddPlantModal] = useState(false)
    const [removeButtons, setRemoveButtons] = useState(false)
    const [plants, setPlants] = useState<Plant[]>([])
    const searchBarInputRef = useRef<HTMLInputElement>(null);
    // Redux
    // const plants = useAppSelector(state => state.plants.plants)
    const dispatch = useAppDispatch()
    async function onMyGardenMount () {
        setIsFetching(true)
        const plantsDB = await fetchEntireGarden()
        const newPlants: Plant[] = []
        for (let p of plantsDB) {
        const newPlant = new Plant(p._id, p.plantName, p.dateAdded, p.img.data.data)
        newPlants.push(newPlant)
        }
        dispatch(addPlants(newPlants))
        setIsFetching(false)
        setPlants(newPlants)
        originalPlantsHolder = newPlants
    }
    useEffect(() => {
        onMyGardenMount()
}, [])

    async function handleRemovePlantsPermanently() {
        const newPlants: Plant[] = []
        let IdsToRemove: string[] =[]
        for (let plant of originalPlantsHolder) {
            plant.checked ? IdsToRemove.push(plant.id) : newPlants.push(plant);
        }
        if (IdsToRemove.length > 0) {
            setIsFetching(true)
            await fetchRemovePlantsPermanently(IdsToRemove)
            setIsFetching(false)
            setPlants(newPlants)
            IdsToRemove = []
            originalPlantsHolder = newPlants
        }
    }
    function checkBoxPlant(plantId: string) {
        const newPlants: Plant[] =[]
        plants.forEach(plant => {
            if (plant.id === plantId) {
                plant.checked = !plant.checked}
            newPlants.push(plant)
        })
        originalPlantsHolder = newPlants
        setPlants(newPlants)
    }
    function selectAll() {
        const newPlants: Plant[] = [];
        plants.forEach(plant => {
            plant.checked = !plant.checked;
            newPlants.push(plant)
        })
        originalPlantsHolder = newPlants
        setPlants(newPlants)
    }
    function handleSearch(){
        if (searchBarInputRef.current!.value !== '') {
            const searchValue = searchBarInputRef.current!.value.toLocaleLowerCase()
            const filteredPlants: Plant[] = originalPlantsHolder.filter(plant => plant.name.includes(searchValue))
            setPlants(filteredPlants)
        } else {
            setPlants(originalPlantsHolder)
        }
    }
    function updateCurrentPlant(plant: Plant) {
        dispatch(setCurrentPlant(plant))
    }
    
    return (
        <>
            <div className="page-container">
                <div id="my-garden-content">
                    <div id="my-garden-options">
                        <div id="buttons">

                        <GreenButton text="Add a Plant" onClick={() => setAddPlantModal(true)}/>
                        <RedButton text="Remove Plants" onClick={() => setRemoveButtons(!removeButtons)}/>
                        {removeButtons && <>
                            <RedButton text="Select All" onClick={selectAll}/>
                            <RedButton text="Remove Permanently" onClick={handleRemovePlantsPermanently}/>
                                        </>
                        }
                        </div>
                        <div id="search-bar-and-count">
                            <div id="search-bar-left"><img src={searchLogo}/></div>
                            <input id="search-bar" type="text" ref={searchBarInputRef} onChange={handleSearch} placeholder="Search" />
                            <div id="plants-counter">You Have {plants.length} Plants</div>
                        </div>    
                    </div>
                    {isFetching ? <Spinner />
                                :
                    <div id="plants-container">
                        {plants.map(plant =>
                        <Link to={`/PlantTimeline/${plant.id}`} key={plant.id}>
                            <div className="plant-card" onClick={() => updateCurrentPlant(plant)}>
                                {removeButtons && <input
                                                    checked={plant.checked}
                                                    className="toggle"
                                                    type="checkbox"
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={() => checkBoxPlant(plant.id)}/>
                                }
                                <img width="100" src={`data:image/png;base64,${bufferToImage(plant.imageBufferArray)}`} alt={plant.name}/>
                                <h5> {capitalize(plant.name)} </h5>
                            </div>
                        </Link>
                        )
                        }
                    </div>}
                </div>
    
                
            </div>
            {addPlantModal && <Modal open={addPlantModal} onClose={() => setAddPlantModal(false)} content={<AddPlantForm setModal={setAddPlantModal} refetch={onMyGardenMount}/>}></Modal>}
        </>
    )
}