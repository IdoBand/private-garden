import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Plant } from '../types/interface';
import { PlantUpdate } from '../types/interface';
interface plantsState {
    plants: Plant[];
    currentPlant: Plant
    currentUpdate: PlantUpdate | null
}

const initialState: plantsState = {
    plants: [],
    currentPlant: {
        _id: '',
        userId: '',
        plantName: '',
        dateAdded: 0,
        img: '',
        checked: false,
        updates: []
    },
    currentUpdate: null
}

const plantsSlice = createSlice({
    name: 'plants',
    initialState,
    reducers: {
        addPlants: {
            reducer: (state, action: PayloadAction<Plant[]>) => {
                state.plants = action.payload
            },
            prepare: (newPlants: Plant[]) => {
                return { payload: newPlants }
            }
        },
        setCurrentPlant: {
            reducer: (state, action: PayloadAction<Plant>) => {
                state.currentPlant = action.payload
            },
            prepare: (newPlant: Plant) => {
                return { payload: newPlant }
            }
        },
        editCurrentPlant: {
            reducer: (state, action: PayloadAction<Plant>) => {
                const newPlantsArray = state.plants.map(plant => {
                    if (plant._id === action.payload._id) {
                        return action.payload
                    }
                    return plant
                })
                state.currentPlant = action.payload
                state.plants = newPlantsArray
            },
            prepare: (newPlant: Plant) => {
                return { payload: newPlant }
            }
        },
        setCurrentUpdate: {
            reducer: (state, action: PayloadAction<PlantUpdate | null>) => {
                state.currentUpdate = action.payload
            },
            prepare: (newPlantUpdate: PlantUpdate | null) => {
                return { payload: newPlantUpdate }
            }
        },
        setUpdatesToCurrentPlant: {
            reducer: (state, action: PayloadAction<PlantUpdate[]>) => {
                state.currentPlant!.updates = action.payload
            },
            prepare: (newPlantUpdate: PlantUpdate[]) => {
                return { payload: newPlantUpdate }
            } 
        },
        deleteImageFromCurrentUpdate: {
            reducer: (state, action: PayloadAction<number>) => {
                const copy = {...state.currentUpdate}
                copy.images!.splice(action.payload, 1)
                state.currentUpdate = copy as PlantUpdate
            },
            prepare: (idx: number) => {
                return { payload: idx }
            }
        },
        switchCurrentPlantToExistingOne: {
            reducer: (state, action: PayloadAction<string>) => {
                const find = state.plants.find(({_id}) => _id === action.payload)
                state.currentPlant = {...find} as Plant
            },
            prepare: (plantId: string) => {
                return { payload: plantId }
            }
        },
    }
})

export const { 
    addPlants, 
    setCurrentPlant,
    setCurrentUpdate,
    setUpdatesToCurrentPlant,
    deleteImageFromCurrentUpdate,
    editCurrentPlant,
    switchCurrentPlantToExistingOne
} = plantsSlice.actions
export default plantsSlice.reducer