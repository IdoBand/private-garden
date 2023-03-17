import { Plant } from "../../types/Plant"
import GreenButton from "../Button/GreenButton"
import { useAppDispatch, useAppSelector } from "../../redux/counterHooks"
import { useEffect, useState, useRef } from "react"
import { PlantUpdate } from "../../types/PlantUpdate"
import { bufferToImage, capitalize } from "../../hooks/helpfulFunctions"
import checkedSVG from '../../assets/checked.png'
import redXsvg from '../../assets/redX.png'
import Modal from "../Modal/Modal"
import AddPlantUpdateForm from "../forms/AddUpdateForm/AddUpdateForm"
import { setCurrentPlant } from "../../redux/plantsSlice"
import EditPlantForm from '../forms/EditPlantForm/EditPlantForm'
import {fetchUpdatesByPlantId }from '../../hooks/fetchers'
import Spinner from "../Spinner/Spinner"
export default function PlantTimeline() {
    const [isFetching, setIsFetching] = useState(false)
    const [addPlantUpdateModal, setAddPlantUpdateModal] = useState<boolean>(false)
    const [editPlantUpdateModal, setEditPlantUpdateModal] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const currentPlant = useAppSelector(state => state.plants.currentPlant)
    const plants = useAppSelector(state => state.plants.plants)
    const selectInput = useRef<HTMLSelectElement>(null)
    const [plantUpdates, setPlantUpdates] = useState<PlantUpdate[]>([])

    async function onPlantTimelineMount() {
        setIsFetching(true)
        const updates = await fetchUpdatesByPlantId(currentPlant!.id)
        const newUpdates = []
        for (let update of updates) {
            const newUpdate = new PlantUpdate(update._id, update.plantId, update.plantName, update.dateAdded, update.img.data.data,
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

    return(
        <>
        <div className="page-container">
            <div id="plant-timeline-container">
            {isFetching ? <Spinner />
                                : 
                <>
                    <div className="plant-options">
                        <div id="plant-intro">
                            <img className="plant-logo" src={`data:image/png;base64,${bufferToImage(currentPlant?.imageBufferArray)}`}/>
                            <div id="current-plant-details">
                                {capitalize(currentPlant?.name as string)}<br />
                                Added on: {currentPlant?.dateAdded}<br />
                                Total Updates: {plantUpdates.length}<br />
                            </div> 
                        </div>
                        <div className="plant-timeline-buttons">
                            <GreenButton text="Add an Update" onClick={() => setAddPlantUpdateModal(true)}/>
                            <GreenButton text="Edit Plant" onClick={() => setEditPlantUpdateModal(true)}/>
                        </div>
                        <div className="select-current-plant">
                            Select Current Plant<br />
                            <select defaultValue={currentPlant?.name} ref={selectInput} onChange={switchCurrentPlant}>
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
                            <div className="update-card" key={update.id}>
                                <div className="date-and-edit">
                                    <div className="card-date">{update.dateAdded}</div>
                                    <GreenButton text="Edit Update" onClick={editUpdate}/>
                                </div>
                                <div className="info">
                                    <div className="update-irrigation">
                                        <div className="card-property">Irrigation: {update.irrigation.IrrigationBoolean as boolean ? <img className="checked-logo" src={checkedSVG}/> : <img className="checked-logo" src={redXsvg}/>} </div>
                                        {update.irrigation.IrrigationBoolean as boolean && 
                                        <>
                                        <div className="card-property">Water Quantity: {update.irrigation.waterQuantity?.toString()} ml</div>
                                        <div className="card-property">Fertilizer: {update.irrigation.fertilizer}</div>
                                        <div className="card-property">Fertilizer Quantity: {update.irrigation.fertilizerQuantity?.toString()}</div>
                                        </>
                                        }
                                    </div>
                                    <div className="card-property" id="update-notes">Notes: <br />{update.notes} </div>
                                    <div className="update-images">
                                        <div className="card-property"><img className="update-image" src={`data:image/png;base64,${bufferToImage(update.updateImageBufferArray)}`}/> </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </>}
            </div>
        </div>
        {addPlantUpdateModal && <Modal open={addPlantUpdateModal} onClose={() => setAddPlantUpdateModal(false)} content={<AddPlantUpdateForm currentPlant={currentPlant as Plant} setModal={setAddPlantUpdateModal} refetch={onPlantTimelineMount}/>}></Modal>}
        {editPlantUpdateModal && <Modal open={editPlantUpdateModal} onClose={() => setEditPlantUpdateModal(false)} content={<EditPlantForm setModal={setEditPlantUpdateModal}/>}></Modal>}
        </>
    )
}