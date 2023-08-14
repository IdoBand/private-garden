import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types/interface'
interface WindowState {
    isMobile: boolean
    isFetching: boolean
    user: any
}
const dummyUser: User = {
    id: '1',
    firstName: 'Dummy User',
    lastName: '',
    profileImg: '/dummy-user-img.png',
    followers: [],
    following: [],

}

const initialState: WindowState = {
    isMobile: false,
    isFetching: false,
    user: dummyUser
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
            reducer: (state, action: PayloadAction<User>) => {
                state.user = action.payload
            },
            prepare: (userObject) => {
                return { payload: userObject }
            }
        },
        signOutUser(state) {
            state.user = dummyUser
        },
    }
})

export const { setMobile, setIsFetching, signInUser, signOutUser } = windowSlice.actions
export default windowSlice.reducer