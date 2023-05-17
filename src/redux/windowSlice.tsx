import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface mobileState {
    isMobile: boolean
}

const initialState: mobileState = {
    isMobile: false
}

const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        setMobile: {
            reducer: (state, action: PayloadAction<boolean>) => {
                state.isMobile = action.payload
            },
            prepare: (newMobileState) => {
                return { payload: newMobileState }
            }
        }
    }
})

export const { setMobile } = windowSlice.actions
export default windowSlice.reducer