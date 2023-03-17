import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface counterState {
    value: number
}

const initialState: counterState = {
    value: 5
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state) {
            // under the hood immer lib is going to make this immutable
            console.log(state)
            state.value++;
        },
        decremented(state) {
            state.value++;
        }
    }
})

export const { incremented } = counterSlice.actions
export default counterSlice.reducer