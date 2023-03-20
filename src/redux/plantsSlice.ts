import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Plant } from '../types/Plant'
import { PlantUpdate } from '../types/PlantUpdate';
interface plantsState {
    plants: Plant[];
    currentPlant: Plant | null
    currentUpdate: PlantUpdate | null
}

const initialState: plantsState = {
    plants: [],
    currentPlant: null,
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
                return { payload: newPlants}
            }
        },
        setCurrentPlant: {
            reducer: (state, action: PayloadAction<Plant>) => {
                state.currentPlant = action.payload
            },
            prepare: (newPlant: Plant) => {
                return { payload: newPlant}
            }
        },
        setCurrentUpdate: {
            reducer: (state, action: PayloadAction<PlantUpdate>) => {
                state.currentUpdate = action.payload
            },
            prepare: (newPlantUpdate: PlantUpdate) => {
                return { payload: newPlantUpdate}
            }
        }
    }
})

export const { addPlants, setCurrentPlant, setCurrentUpdate } = plantsSlice.actions
export default plantsSlice.reducer