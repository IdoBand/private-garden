import { useState, useEffect, useRef } from "react"
import { Plant } from "../../types/interface"
import GreenButton from "../../components/Button/GreenButton"
import RedButton from "../../components/Button/RedButton"
import Modal from "../../components/Modal/Modal"
import AddOrEditPlantForm from "../../components/forms/AddPlantForm/AddOrEditPlantForm"
import searchLogo from '/search_icon-white2.png'
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import { addPlants, setCurrentPlant } from "../../redux/plantsSlice"
import Spinner from "../../components/Spinner/Spinner"
import PlantCard from "../../components/PlantCard/PlantCard"
import { fetchMyGarden, fetchDeletePlants } from "../../util/fetch"
import { setIsFetching } from "../../redux/windowSlice"
import { plantManager } from "../../types/PlantManager"
import { useSnackbar } from "../../hooks/useSnackbar"
export default function MyGarden() {
    const isFetching = useAppSelector(state => state.window.isFetching)
    const reduxPlants = useAppSelector(state => state.plants.plants)
    const [addPlantModal, setAddPlantModal] = useState(false)
    const [removeButtons, setRemoveButtons] = useState(false)
    const [plants, setPlants] = useState<Plant[]>([])
    const searchBarInputRef = useRef<HTMLInputElement>(null);
    const firstSelectAllClick = useRef<boolean>(false)
    const { show: showSnackbar, component: snackBar } = useSnackbar();
    const dispatch = useAppDispatch()
    async function onMyGardenMount () {
            dispatch(setIsFetching())
        try {
            const response = await fetchMyGarden('1')
            const newPlants = response.data.map((plant: Plant) => {
                return plantManager.serializePlant(plant)
            })
            dispatch(addPlants(newPlants))
            setPlants(newPlants)
        } catch (err) {
            showSnackbar("Failed to get plants", "error");
        } finally {
            dispatch(setIsFetching())
        }
    }
    useEffect(() => {
        onMyGardenMount()
    }, [])

    async function handleRemovePlantsPermanently() {
        const newPlants: Plant[] = []
        const IdsToRemove: string[] = []
        for (const plant of reduxPlants) {
            plant.checked ? IdsToRemove.push(plant._id!) : newPlants.push(plant);
        }
        if (IdsToRemove.length > 0) {
            dispatch(setIsFetching())
            try {
                const response = await fetchDeletePlants(IdsToRemove)
                if (response.success) {
                    setRemoveButtons(false)
                    setPlants(newPlants)
                    dispatch(addPlants(newPlants))
                    showSnackbar("Plants were successfully removed", "success");
                } else {
                    throw new Error
                }
            } catch (err) {
                showSnackbar("Failed to remove plants", "error");
            } finally {
                dispatch(setIsFetching())
            }
        }
    }
    function checkBoxPlant(plantId: string) {
        firstSelectAllClick.current = false
        const newPlants: Plant[] = [...reduxPlants]
        const updated: Plant[] = newPlants.map(plant => {
            if (plant._id === plantId) {
                const p = {...plant, checked: !plant.checked}
                return p
            }
            return plant
        })
        dispatch(addPlants(updated))
        setPlants(updated)
    }
    function selectAll() {
        const newPlants: Plant[] = [...reduxPlants]
        let updated: Plant[];
        if (firstSelectAllClick.current) {
            updated = newPlants.map(plant => {
                const p = {...plant, checked: !plant.checked}
                return p
            })
        } else {
            updated = newPlants.map(plant => {
                const p = {...plant, checked: true}
                return p
            })
            firstSelectAllClick.current = true
        }
        dispatch(addPlants(updated))
        setPlants(updated)
    }
    function handleSearch(){
        if (searchBarInputRef.current!.value !== '') {
            const searchValue = searchBarInputRef.current!.value.toLocaleLowerCase()
            const filteredPlants: Plant[] = reduxPlants.filter(plant => plant.plantName.includes(searchValue))
            setPlants(filteredPlants)
        } else {
            setPlants(reduxPlants)
        }
    }

    return (

        <div className="my-garden-container">
        {isFetching ? <Spinner />
                            :
                <>
                    <div id="my-garden-options">
                        <div id="my-garden-buttons">
                        <GreenButton text="Add a Plant" onClick={() => setAddPlantModal(true)} isDisabled={removeButtons}/>
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
                            <div id="plants-counter">{searchBarInputRef.current?.value ? `${plants.length} Plant${plants.length > 1 ? 's' : ''} Matching Search`: `You Have ${plants.length} Plant${plants.length > 1 ? 's' : ''}`}</div>
                        </div>    
                    </div>
                    <div id="plants-container">
                        {plants.map(plant =>
                            <div key={plant._id!} className="card-key-container" onClick={() => dispatch(setCurrentPlant(plant))}>
                                <PlantCard 
                                    plant={plant}
                                    removeButtons={removeButtons}
                                    checkBoxPlant={checkBoxPlant}
                                    />
                            </div>
                        )}
                    </div>
                </>}
        {addPlantModal && 
            <Modal 
                open={addPlantModal} 
                onClose={() => setAddPlantModal(false)} 
                >
                <AddOrEditPlantForm 
                    setModal={setAddPlantModal} 
                    addOrEdit="add" 
                    setPlants={setPlants}
                    showSnackbar={showSnackbar}
                    />
            </Modal>}

        {snackBar}
        </div>
    )
}