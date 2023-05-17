import { useState, useEffect, useRef } from "react"
import { Plant } from "../../types/Plant"
import GreenButton from "../Button/GreenButton"
import RedButton from "../Button/RedButton"
import Modal from "../Modal/Modal"
import AddOrEditPlantForm from "../forms/AddPlantForm/AddOrEditPlantForm"
import { useQuery } from "@tanstack/react-query"
import searchLogo from '/assets/search_icon-white2.png'
import logo from '/assets/logo.jpg'
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/counterHooks"
import { addPlants, setCurrentPlant } from "../../redux/plantsSlice"
import Spinner from "../Spinner/Spinner"
import { capitalize } from "../../hooks/helpfulFunctions"
import { fetchEntireGarden, fetchRemovePlantsPermanently } from '../../hooks/fetchers'

export default function MyGarden() {
    const [isFetching, setIsFetching] = useState(false)
    const [addPlantModal, setAddPlantModal] = useState(false)
    const [removeButtons, setRemoveButtons] = useState(false)
    const [responseMessage, setResponseMessage] = useState<string>('')
    const [plants, setPlants] = useState<Plant[]>([])
    const searchBarInputRef = useRef<HTMLInputElement>(null);
    const firstSelectAllClick = useRef<boolean>(false)
    // Redux
    const reduxPlants = useAppSelector(state => state.plants.plants)
    const dispatch = useAppDispatch()
    async function onMyGardenMount () {
            setIsFetching(true)
        try {
            const plantsDB = await fetchEntireGarden()
            const newPlants = plantsDB.map((p: any) => {
                return new Plant(p._id, p.plantName, p.dateAdded, p.img)
            })
            dispatch(addPlants(newPlants))
            setPlants(newPlants)
        } catch (err) {
            setResponseMessage('an error occurred')
        } finally {
            setIsFetching(false)
        }
    }
    useEffect(() => {
        onMyGardenMount()
}, [])

    async function handleRemovePlantsPermanently() {
        const newPlants: Plant[] = []
        let IdsToRemove: string[] = []
        for (let plant of reduxPlants) {
            plant.checked ? IdsToRemove.push(plant.id) : newPlants.push(plant);
        }
        if (IdsToRemove.length > 0) {
            setIsFetching(true)
            const responseMessage = await fetchRemovePlantsPermanently(IdsToRemove)
            setIsFetching(false)
            setRemoveButtons(false)
            setResponseMessage(responseMessage)
            setPlants(newPlants)
            dispatch(addPlants(newPlants))
        }
    }
    function checkBoxPlant(plantId: string) {
        firstSelectAllClick.current = false
        const newPlants: Plant[] = reduxPlants.map(plant => {
            if (plant.id === plantId) {plant.checked = !plant.checked}
            return plant
        })
        dispatch(addPlants(newPlants))
        setPlants(newPlants)
    }
    function selectAll() {
        let newPlants: Plant[]
        if (firstSelectAllClick.current) {
            newPlants = plants.map(plant => {
                plant.checked = !plant.checked
                return plant
            })
        } else {
            newPlants = plants.map(plant => {
                plant.checked = true
                return plant
            })
            firstSelectAllClick.current = true
        }
        dispatch(addPlants(newPlants))
        setPlants(newPlants)
    }
    function handleSearch(){
        if (searchBarInputRef.current!.value !== '') {
            const searchValue = searchBarInputRef.current!.value.toLocaleLowerCase()
            const filteredPlants: Plant[] = reduxPlants.filter(plant => plant.name.includes(searchValue))
            setPlants(filteredPlants)
        } else {
            setPlants(reduxPlants)
        }
    }
    function updateCurrentPlant(plant: Plant) {
        dispatch(setCurrentPlant(plant))
    }
    
    return (
        <>
            <div className="my-garden-container">
            {isFetching ? <Spinner />
                                :
                    <>
                        <div id="my-garden-options">
                            <div id="my-garden-buttons">
                            <GreenButton text="Add a Plant" onClick={() => setAddPlantModal(true)}/>
                            <RedButton text="Remove Plants" onClick={() => setRemoveButtons(!removeButtons)}/>
                            {removeButtons && <>
                                <br />
                                <RedButton text="Select All" onClick={selectAll}/>
                                <RedButton text="Remove Permanently" onClick={handleRemovePlantsPermanently}/>
                                            </>
                            }
                            </div>
                            <div id="search-bar-and-count">
                                <div className="search-bar-container">
                                    <div id="search-bar-left"><img src={searchLogo}/></div>
                                    <input id="search-input" type="text" ref={searchBarInputRef} onChange={handleSearch} placeholder="Search" />
                                </div>
                                <div id="plants-counter">{searchBarInputRef.current?.value ? `${plants.length} Plants Matching Search`: `You Have ${plants.length} Plants`}</div>
                            </div>    
                        </div>
                        
                        <div id="plants-container">
                            {plants.map(plant =>
                            <Link to={`/PlantTimeline/${plant.id}`} key={plant.id}>
                                <div className="plant-card" onClick={() => updateCurrentPlant(plant)}>
                                    {removeButtons && <input
                                                        checked={plant.checked}
                                                        className="plant-card-toggle"
                                                        type="checkbox"
                                                        onClick={(e) => e.stopPropagation()}
                                                        onChange={() => checkBoxPlant(plant.id)}/>
                                    }
                                    <img width="100" src={plant.profileImageString ? plant.profileImageString : logo} alt={plant.name}/>
                                    <div className="plant-name"> {capitalize(plant.name)} </div>
                                </div>
                            </Link>
                            )}
                        </div>
                    </>}
            {addPlantModal && <Modal open={addPlantModal} 
                                     onClose={() => setAddPlantModal(false)} 
                                     content={<AddOrEditPlantForm 
                                     setModal={setAddPlantModal} 
                                     addOrEdit="add" 
                                     setResponseMessage={setResponseMessage}
                                     setPlants={setPlants}
                                     />} 
                                     />}
            {responseMessage && <Modal open={true} 
                                       onClose={() => setResponseMessage('')} 
                                       content={responseMessage} />}
            </div>
                
        </>
    )
}