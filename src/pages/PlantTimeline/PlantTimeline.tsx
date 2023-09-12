import { Plant, PlantUpdate } from "../../types/interface"
import Button from "../../components/Button/Button"
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks"
import { useEffect, useState, useRef } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '/leaf-svgrepo-com.svg'
import Modal from "../../components/Modal/Modal"
import AddOrEditUpdateForm from "../../components/forms/AddUpdateForm/AddOrEditUpdateForm"
import { addPlants, setCurrentPlant, setCurrentUpdate, setUpdatesToCurrentPlant, switchCurrentPlantToExistingOne } from "../../redux/plantsSlice"
import AddOrEditPlantForm from "../../components/forms/AddPlantForm/AddOrEditPlantForm"
import { plantManager } from "../../types/PlantManager"
import { fetchPlantById, fetchPlantUpdates, fetchDeletePlantUpdates, fetchMyGarden } from "../../util/fetch"
import { useSnackbar } from "../../hooks/useSnackbar"
import { plantUpdateManager } from "../../types/PlantUpdateManager"
import PlantUpdateCard from "../../components/PlantUpdateCard/PlantUpdateCard"
import PlantUpdateCardSkeleton from "../../components/PlantUpdateCard/PlantUpdateCardSkeleton"
import { HandHoldingPlant } from "../../util/svgs"
const skeletonArray = Array.from(Array(6).keys())

export default function PlantTimeline() {
    const [addPlantUpdateModal, setAddPlantUpdateModal] = useState<boolean>(false)
    const [editPlantModal, setEditPlantModal] = useState<boolean>(false)
    const [editPlantUpdateModal, setEditPlantUpdateModal] = useState<boolean>(false)
    const [removeButtons, setRemoveButtons] = useState(false)
    const firstSelectAllClick = useRef<boolean>(false)
    const [isFetching, setIsFetching] = useState(false)
    const dispatch = useAppDispatch()
    const selectInput = useRef<HTMLSelectElement>(null)
    const currentPlant = useAppSelector(state => state.plants.currentPlant)
    const [currentPlantId, setCurrentPlantId] = useState<string>(currentPlant._id as string)
    const plantUpdates = useAppSelector(state => state.plants.currentPlant.updates)
    const reduxPlants = useAppSelector(state => state.plants.plants)
    const location = useLocation();
    const user = useAppSelector(state => state.window.user)
    const navigate = useNavigate();
    const { show: showSnackbar, component: snackBar } = useSnackbar();

    async function ifUserRefreshPage() {
        setIsFetching(true)
        const plantId = location.pathname.split('/')[2];
        try {
            const plantResponse = await fetchPlantById(plantId, user.id)
            if (!plantResponse.data) {
                return
            }
            const serializedPlant = plantManager.serializePlant(plantResponse.data)
            dispatch(setCurrentPlant(serializedPlant))
            const gardenResponse = await fetchMyGarden('1')
            dispatch(addPlants(plantManager.serializeGarden(gardenResponse.data)))
            return serializedPlant
        } catch (err) {
            console.log(`error while running ifUserRefreshPage function` + err);
            showSnackbar("Failed to load Timeline", "error");
        } finally {
            setIsFetching(false)
        }
    }

    async function handleFetchUpdates(plantId: string) {
        setIsFetching(true)
        try {
            const response = await fetchPlantUpdates(plantId)
            if (response.success && response.data.length > 0) {
                dispatch(setUpdatesToCurrentPlant(plantUpdateManager.serializeUpdatesArray(response.data)))
            }
        } catch (err) {
            showSnackbar("Failed to load Timeline", "error");
        } finally {
            setIsFetching(false)
        }
    }
    async function handlePlantEdit() {
        setIsFetching(true)
        const keepCurrentUpdates = plantUpdates
        try {
            const response = await fetchPlantById(currentPlant._id as string, '1')
            const serializedPlant = plantManager.serializePlant(response.data, keepCurrentUpdates)
            dispatch(setCurrentPlant(serializedPlant))
        } catch (err) {
            console.log(err);
        }
        setIsFetching(false)
    }
    async function loadTimelinePage() {
        let plant = currentPlant
        if (!plant._id) {
            plant = await ifUserRefreshPage() as Plant
        }
        if (plant) {
            await handleFetchUpdates(plant._id as string)
        }
        return plant
    }
    useEffect(() => {
        async function start() {
            if (currentPlant._id) {
                await handleFetchUpdates(currentPlant._id)
            }
        }
        start()
    },[currentPlantId])

    useEffect(() => {
        async function start() {
           const plant = await loadTimelinePage()
           if (!plant) {
            showSnackbar('Non-existing Plant id. Redirecting...', 'error')
            setTimeout(() => {
                navigate('/MyGarden')
            }, 3000)
           }
        }
        start()
    },[])

    async function switchCurrentPlant() {
        const selectedOptionId = selectInput.current?.selectedOptions[0].getAttribute("data-key")
        dispatch(switchCurrentPlantToExistingOne(selectedOptionId as string))
        setCurrentPlantId(selectedOptionId as string)
    }

    async function handleRemovePlantsPermanently() {
        const newUpdates: PlantUpdate[] = []
        const IdsToRemove: string[] = []
        for (const update of plantUpdates!) {
            update.checked ? IdsToRemove.push(update._id!) : newUpdates.push(update);
        }
        if (IdsToRemove.length > 0) {
            setIsFetching(true)
            try {
                const response = await fetchDeletePlantUpdates(IdsToRemove)
                if (response.success) {
                    setRemoveButtons(false)
                    dispatch(setUpdatesToCurrentPlant(newUpdates))
                    showSnackbar("Updates were successfully removed", "success");
                } else {
                    throw new Error
                }
            } catch (err) {
                showSnackbar("Failed to remove plants", "error");
            } finally {
                setIsFetching(false)
            }
        }
    }
    function checkBoxUpdate(updateId: string) {
        firstSelectAllClick.current = false
        const newPlantUpdates: PlantUpdate[] = plantUpdates!.map(update => {
            if (update._id === updateId) {
                const u = {...update, checked: !update.checked}
                return u
            }
            return update
        })
        dispatch(setUpdatesToCurrentPlant(newPlantUpdates))
    }
    function selectAll() {
        let newUpdates: PlantUpdate[];
        if (firstSelectAllClick.current) {
            newUpdates = plantUpdates!.map(update => {
                const u = {...update, checked: !update.checked}
                return u
            })
        } else {
            newUpdates = plantUpdates!.map(update => {
                const u = {...update, checked: true}
                return u
            })
            firstSelectAllClick.current = true
        }
        dispatch(setUpdatesToCurrentPlant(newUpdates))
    }

    return(
        <>
            {
                currentPlant && 
                <div className="plant-timeline-container">
                    <div className="plant-timeline-options">
                        <div id="plant-intro">
                            <img className="plant-logo" 
                                 src={currentPlant?.img ? currentPlant.img as string: logo}/>
                            <div id="current-plant-details">
                                <div className="form-header">{plantManager.capitalize(currentPlant?.plantName as string)}</div><br />
                                Added on: {plantManager.extractDateString(currentPlant?.dateAdded)}<br />
                                Total Updates: {plantUpdates!.length}<br />
                            </div> 
                        </div>
                        <div className="plant-timeline-buttons">
                            <Button className="green-button" type="button" text="Add an Update" onClick={() => setAddPlantUpdateModal(true)} isDisabled={removeButtons} icon="add" />
                            <Button className="green-button" type="button" text="Edit Plant" onClick={() => setEditPlantModal(true)} isDisabled={removeButtons} icon="edit" />
                            <Button className="red-button" type="button" text="Remove Updates" onClick={() => setRemoveButtons(prev => !prev)} isDisabled={false} icon="trash" />
                            {removeButtons && <>
                            <Button className="red-button" type="button" text="Select All" onClick={selectAll} isDisabled={false} />
                            <Button className="red-button" type="button" text="Remove Permanently" onClick={handleRemovePlantsPermanently} isDisabled={false} />
                                        </>
                        }
                        </div>
                        <div className="select-current-plant">
                            Select Current Plant<br />
                            <select  ref={selectInput} onChange={switchCurrentPlant}>
                                <option  data-key={currentPlant._id}>{currentPlant.plantName}</option>
                                {reduxPlants.map(plant => {
                                    if (plant._id !== currentPlant._id) {
                                        return(<option key={plant._id} data-key={plant._id}>{plant.plantName}</option>)
                                        }
                                    })}
                            </select>
                        </div>
                    </div>
                    <div id="plant-updates">
                        {isFetching &&  
                        skeletonArray.map((_, idx)=> <PlantUpdateCardSkeleton key={idx} />)
                        }
                        { plantUpdates && plantUpdates.length > 0 ?
                        <>
                            {plantUpdates.map((update) => {
                            return (<PlantUpdateCard 
                                        key={update._id}
                                        plantUpdate={update}
                                        currentPlant={currentPlant}
                                        removeButtons={removeButtons}
                                        checkBoxUpdate={checkBoxUpdate}
                                        setEditPlantUpdateModal={setEditPlantUpdateModal}
                                    />)
                            })}
                            <div className="this-is-where-it-all-started">
                                This Is Where It All Started 
                                <HandHoldingPlant />
                            </div>
                        </>
                        :
                            <div style={{marginTop: '25px'}}>No Updates Yet :(</div>
                    }
                    </div>
                </div>
                }
                {snackBar}
        {addPlantUpdateModal && 
            <Modal 
                onClose={() => setAddPlantUpdateModal(false)}                            
            >
                <AddOrEditUpdateForm 
                    addOrEdit="add"
                    currentPlant={currentPlant as Plant} 
                    setModal={setAddPlantUpdateModal} 
                    refetch={handleFetchUpdates} 
                    showSnackbar={showSnackbar}/>
            </Modal>}
        {editPlantUpdateModal && 
            <Modal 
                onClose={() => {dispatch(setCurrentUpdate(null)) ;setEditPlantUpdateModal(false)}}                            
            >
                <AddOrEditUpdateForm 
                    addOrEdit="edit"
                    currentPlant={currentPlant as Plant} 
                    setModal={() => {setEditPlantUpdateModal(false)}} 
                    refetch={handleFetchUpdates} 
                    showSnackbar={showSnackbar}/>
            </Modal>}
        {editPlantModal &&
            <Modal
                onClose={() => setEditPlantModal(false)}
            >
                <AddOrEditPlantForm
                    addOrEdit="edit"
                    plant={currentPlant}
                    setModal={setEditPlantModal}
                    showSnackbar={showSnackbar}
                    refetch={handlePlantEdit}
                />
            </Modal>

        }
        </>
    )
}