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
import {fetchUpdatesByPlantId, fetchRemovePlantUpdatesPermanently }from '../../hooks/fetchers'
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
    const firstSelectAllClick = useRef<boolean>(false)
    async function onPlantTimelineMount() {
        setIsFetching(true)
        const updates = await fetchUpdatesByPlantId(currentPlant!.id)
        const newUpdates: PlantUpdate[] = updates.map((update: any) => {
            const newUpdate = new PlantUpdate(update._id, update.plantId, update.plantName, update.dateAdded, update.img,
                update.irrigation.boolean, update.irrigation.waterQuantity,
                update.irrigation.fertilizer, update.irrigation.fertilizerQuantity, update.notes)
            return newUpdate
        })
        currentPlant!.updates = newUpdates
        setPlantUpdates(newUpdates)
        setIsFetching(false)
    }
    useEffect(() => {
        onPlantTimelineMount()
    },[currentPlant])

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
        let IdsToRemove: string[] = []
        const newUpdates = plantUpdates.filter(update =>
            update.checked ? (IdsToRemove.push(update.updateId), false) : update
        )
        
        if (IdsToRemove.length > 0) {
            setIsFetching(true)
            const responseMessage = await fetchRemovePlantUpdatesPermanently(IdsToRemove)
            setIsFetching(false)
            setRemoveButtons(false)
            setResponseMessage(responseMessage)
            setPlantUpdates(newUpdates as PlantUpdate[])
        }
    }
    function checkBoxUpdate(updateId: string) {
        firstSelectAllClick.current = false
        const newUpdates: PlantUpdate[] = plantUpdates.map(update => {
            if (update.updateId === updateId) {
                update.checked = !update.checked
            }
            return update
        })
        setPlantUpdates(newUpdates)
    }
    function selectAll() {
        let newUpdates: PlantUpdate[];
        if (firstSelectAllClick.current) {
            newUpdates = plantUpdates.map(update => {
                update.checked = !update.checked
                return update
            })
        } else {
            newUpdates = plantUpdates.map(update => {
                update.checked = true
                return update
            })
            firstSelectAllClick.current = true
        }
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
                                 src={currentPlant?.profileImageString ? 
                                 bufferToImage(currentPlant?.profileImageString)
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
                                            <img className="update-image" src={update.updateImageBufferArray ?bufferToImage(update.updateImageBufferArray) : logo}/>
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
        {addPlantUpdateModal && <Modal 
                                    open={addPlantUpdateModal} 
                                    onClose={() => setAddPlantUpdateModal(false)} 
                                    content={<AddOrEditUpdateForm 
                                                currentPlant={currentPlant as Plant} 
                                                setModal={setAddPlantUpdateModal} 
                                                refetch={onPlantTimelineMount} 
                                                setResponseMessage={setResponseMessage}
                                                addOrEdit="add"/>} 
                                                />}
        {editPlantModal && <Modal 
                                open={editPlantModal} 
                                onClose={() => setEditPlantModal(false)} 
                                content={<AddOrEditPlantForm 
                                            setModal={setEditPlantModal} 
                                            addOrEdit="edit" 
                                            setResponseMessage={setResponseMessage} 
                                            plantName={currentPlant?.name} 
                                            plantImageString={bufferToImage(currentPlant?.profileImageString)} />} 
                                            />}
        {editPlantUpdateModal && <Modal open={editPlantUpdateModal} 
                                        onClose={() => setEditPlantUpdateModal(false)} 
                                        content={<AddOrEditUpdateForm 
                                                    currentPlant={currentPlant as Plant} 
                                                    setModal={setEditPlantUpdateModal} 
                                                    refetch={onPlantTimelineMount} 
                                                    addOrEdit="edit"
                                                    setResponseMessage={setResponseMessage} 
                                                    currentUpdate={currentUpdateRef.current}/>} />}
        {responseMessage && <Modal open={true} 
                                    onClose={() => setResponseMessage('')} 
                                    content={responseMessage} />}
        </>
    )
}