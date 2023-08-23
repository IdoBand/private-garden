import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '../types/interface'
interface PostsState {
    posts: Post[]
}


const initialState: PostsState = {
    posts: []
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: {
            reducer: (state, action: PayloadAction<Post[]>) => {
                state.posts = action.payload.reverse()
            },
            prepare: (newMobileState) => {
                return { payload: newMobileState }
            }
        },
        addPost: {
            reducer: (state, action: PayloadAction<Post>) => {
                state.posts = [action.payload].concat(state.posts)
            },
            prepare: (post) => {
                return { payload: post }
            }
        },
        removePost: {
            reducer: (state, action: PayloadAction<string>) => {
                state.posts = state.posts.filter(post => post._id !== action.payload)
            },
            prepare: (postId) => {
                return { payload: postId }
            }
        },

    }
})

export const { setPosts, addPost, removePost, } = postsSlice.actions
export default postsSlice.reducer