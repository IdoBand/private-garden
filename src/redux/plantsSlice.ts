import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Plant } from '../types/Plant'
interface plantsState {
    plants: Plant[];
    currentPlant: Plant | null
}

const initialState: plantsState = {
    plants: [],
    currentPlant: null
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
        }
        
    }
})

export const { addPlants, setCurrentPlant } = plantsSlice.actions
export default plantsSlice.reducer