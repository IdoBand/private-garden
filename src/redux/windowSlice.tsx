import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/interface'
interface WindowState {
    isMobile: boolean
    isFetching: boolean
    user: any
}

const initialState: WindowState = {
    isMobile: false,
    isFetching: false,
    user: {
        userId: '1',
        followers: [],
        following: [],
    }
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
        },
        setIsFetching(state) {
            state.isFetching = !state.isFetching
        },
        signInUser: {
            reducer: (state, action: PayloadAction<any>) => {
                state.user = action.payload
            },
            prepare: (userObject) => {
                return { payload: userObject }
            }
        },
        signOutUser(state) {
            state.user = {
                userId: '',
                followers: [],
                following: [],
            }
        },
    }
})

export const { setMobile, setIsFetching, signInUser, signOutUser } = windowSlice.actions
export default windowSlice.reducer