import { Plant } from "../../types/Plant"
import GreenButton from "../Button/GreenButton"
import RedButton from "../Button/RedButton"
import { useAppDispatch, useAppSelector } from "../../redux/counterHooks"
import { useEffect, useState, useRef } from "react"
import { PlantUpdate } from "../../types/PlantUpdate"
import { bufferToImage, capitalize } from "../../hooks/helpfulFunctions"
import checkedSVG from '../../assets/checked.png'
import redXsvg from '../../assets/redX.png'
import logo from '../../assets/logo.jpg'
import Modal from "../Modal/Modal"
import AddOrEditUpdateForm from "../forms/AddUpdateForm/AddOrEditUpdateForm"
import { setCurrentPlant, setCurrentUpdate } from "../../redux/plantsSlice"
import {fetchUpdatesByPlantId }from '../../hooks/fetchers'
import Spinner from "../Spinner/Spinner"
import AddOrEditPlantForm from "../forms/AddPlantForm/AddOrEditPlantForm"
export default function PlantTimeline() {
    const [isFetching, setIsFetching] = useState(false)
    const [addPlantUpdateModal, setAddPlantUpdateModal] = useState<boolean>(false)
    const [editPlantModal, setEditPlantModal] = useState<boolean>(false)
    const [editPlantUpdateModal, setEditPlantUpdateModal] = useState<boolean>(false)
    const [removeButtons, setRemoveButtons] = useState(false)
    const [responseMessage, setResponseMessage] = useState<string>('')
    const dispatch = useAppDispatch()
    const currentPlant = useAppSelector(state => state.plants.currentPlant)
    const currentUpdateRef = useRef<PlantUpdate>()
    const plants = useAppSelector(state => state.plants.plants)
    const selectInput = useRef<HTMLSelectElement>(null)
    const [plantUpdates, setPlantUpdates] = useState<PlantUpdate[]>([])

    async function onPlantTimelineMount() {
        setIsFetching(true)
        const updates = await fetchUpdatesByPlantId(currentPlant!.id)
        const newUpdates: PlantUpdate[] = []
        currentPlant!.updates = newUpdates
        for (let update of updates) {
            const newUpdate = new PlantUpdate(update._id, update.plantId, update.plantName, update.dateAdded, update.img,
                            update.irrigation.boolean, update.irrigation.waterQuantity,
                            update.irrigation.fertilizer, update.irrigation.fertilizerQuantity, update.notes)
            newUpdates.push(newUpdate)
        }
        setPlantUpdates(newUpdates)
        setIsFetching(false)
    }
    useEffect(() => {
        onPlantTimelineMount()
    },[currentPlant])
    function editUpdate() {
        return
    }
    function switchCurrentPlant(): void {
        const selectedOptionId = selectInput.current?.options[selectInput.current.selectedIndex].dataset.key;
        for (let plant of plants) {
            if (plant.id === selectedOptionId) {
                dispatch(setCurrentPlant(plant))
                return
            }
        }
    }
    function handleUpdateModal(plantUpdate: PlantUpdate): void {
        // dispatch(setCurrentUpdate(plantUpdate))
        currentUpdateRef.current = plantUpdate
        setEditPlantUpdateModal(true)
    }
    async function handleRemovePlantsPermanently() {
        let IdsToRemove: string[] =[]
        const newUpdates = plantUpdates.map(update => {
            if (update.checked) {
                return update
            } else {
                IdsToRemove.push(update.updateId)
            }
        })
        
        if (IdsToRemove.length > 0) {
            setIsFetching(true)
            // const responseMessage = await fetchRemoveUpdatesPermanently(IdsToRemove)
            setIsFetching(false)
            setRemoveButtons(false)
            setResponseMessage(responseMessage)
            setPlantUpdates(newUpdates as PlantUpdate[])
            IdsToRemove = []
        }
    }
    function checkBoxUpdate(updateId: string) {
        const newUpdates: PlantUpdate[] = plantUpdates.map(update => {
            if (update.updateId === updateId) {
                update.checked = !update.checked
            }
            return update
        })
        setPlantUpdates(newUpdates)
    }
    function selectAll() {
        const newUpdates: PlantUpdate[] = plantUpdates.map(update => {
            update.checked = !update.checked
            return update
        })
        setPlantUpdates(newUpdates)
    }

    return(
        <>
        <div className="page-container">
            <div className="page-content">
            {isFetching ? <Spinner />
                                : 
                <>
                    <div className="plant-options">
                        <div id="plant-intro">
                            <img className="plant-logo" 
                                 src={currentPlant?.imageBufferArray ? 
                                 `data:image/png;base64,${bufferToImage(currentPlant?.imageBufferArray)}`
                                 :
                                 logo
                                }/>
                            <div id="current-plant-details">
                                {capitalize(currentPlant?.name as string)}<br />
                                Added on: {currentPlant?.dateAdded}<br />
                                Total Updates: {plantUpdates.length}<br />
                                Plant ID: {currentPlant?.id}
                            </div> 
                        </div>
                        <div className="plant-timeline-buttons">
                            <GreenButton text="Add an Update" onClick={() => setAddPlantUpdateModal(true)}/>
                            <GreenButton text="Edit Plant" onClick={() => setEditPlantModal(true)}/>
                            <RedButton text="Remove Updates" onClick={() => setRemoveButtons(true)} />
                            {removeButtons && <>
                            <RedButton text="Select All" onClick={selectAll}/>
                            <RedButton text="Remove Permanently" onClick={handleRemovePlantsPermanently}/>
                                        </>
                        }
                        </div>
                        <div className="select-current-plant">
                            Select Current Plant<br />
                            <select value={currentPlant?.name} ref={selectInput} onChange={switchCurrentPlant}>
                                {plants.map(plant => {
                                    return(
                                        <option key={plant.id} data-key={plant.id}>{plant.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div id="plant-updates">
                        {plantUpdates.map((update) => {
                        return (
                            <div className="update-card" key={update.updateId}>
                                <div className="update-card-content">
                                    <div className="date-and-edit">
                                        <div className="card-date">{update.dateAdded}</div>
                                        {removeButtons && <input
                                                    checked={update.checked}
                                                    className="plant-update-toggle"
                                                    type="checkbox"
                                                    onClick={(e) => e.stopPropagation()}
                                                    onChange={() => checkBoxUpdate(update.updateId)}/>
                                        }
                                        <GreenButton text="Edit Update" onClick={() => handleUpdateModal(update)}/>
                                    </div>
                                    <div className="info">
                                        <div className="update-card-irrigation-container">
                                            <div className="update-card-subheader">
                                                <div className="irrigation-property">Irrigation {update.irrigation.IrrigationBoolean as boolean ? <img className="checked-logo" src={checkedSVG}/> : <img className="checked-logo" src={redXsvg}/>} </div>
                                            </div>
                                            {update.irrigation.IrrigationBoolean as boolean && 
                                            <>
                                            <div className="irrigation-property">Water Quantity: <br />{update.irrigation.waterQuantity?.toString()} ml</div>
                                            <div className="irrigation-property">Fertilizer: <br />
                                                    {update.irrigation.fertilizer}</div>
                                            <div className="irrigation-property">Fertilizer Quantity:<br /> {update.irrigation.fertilizerQuantity?.toString()}</div>
                                            </>
                                            }
                                        </div>
                                        <div className="update-card-notes-container">
                                            <div className="update-card-subheader">
                                                Notes {update.notes ? <img className="checked-logo" src={checkedSVG}/> : <img className="checked-logo" src={redXsvg}/>}
                                            </div>
                                            <div className="actual-notes">
                                                {update.notes && update.notes}
                                            </div>
                                                
                                        </div>
                                        <div className="update-card-images-container">
                                            <div className="update-card-subheader">
                                                Images {update.updateImageBufferArray as boolean ? <img className="checked-logo" src={checkedSVG}/> : <img className="checked-logo" src={redXsvg}/>}
                                            </div>
                                            <img className="update-image" src={update.updateImageBufferArray ?
                                                                         `data:image/png;base64,${bufferToImage(update.updateImageBufferArray)}`
                                                                                    :
                                                                                    logo}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </>}
            </div>
        </div>
        {addPlantUpdateModal && <Modal open={addPlantUpdateModal} onClose={() => setAddPlantUpdateModal(false)} content={<AddOrEditUpdateForm currentPlant={currentPlant as Plant} setModal={setAddPlantUpdateModal} refetch={onPlantTimelineMount} addOrEdit="add"/>}></Modal>}
        {editPlantModal && <Modal open={editPlantModal} onClose={() => setEditPlantModal(false)} content={<AddOrEditPlantForm setModal={setEditPlantModal} addOrEdit="edit" setResponseMessage={setResponseMessage} plantName={currentPlant?.name} plantImageString={`data:image/png;base64,${bufferToImage(currentPlant?.imageBufferArray)}`} />}></Modal>}
        {editPlantUpdateModal && <Modal open={editPlantUpdateModal} onClose={() => setEditPlantUpdateModal(false)} content={<AddOrEditUpdateForm currentPlant={currentPlant as Plant} setModal={setEditPlantUpdateModal} refetch={onPlantTimelineMount} addOrEdit="edit" currentUpdate={currentUpdateRef.current}/>}></Modal>}
        {responseMessage && <Modal open={true} onClose={() => setResponseMessage('')} content={responseMessage}></Modal>}
        </>
    )
}