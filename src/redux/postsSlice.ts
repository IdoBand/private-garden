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
            prepare: (posts) => {
                return { payload: posts }
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
        editPost: {
            reducer: (state, action: PayloadAction<Post>) => {
                state.posts = state.posts.map(post => {
                    if (post._id === action.payload._id) {
                        post = action.payload
                    }
                    return post
                })
            },
            prepare: (post) => {
                return { payload: post }
            }
        },
        likePost: {
            reducer: (state, action: PayloadAction<Post>) => {
                state.posts = state.posts.map(post => {
                    if (post._id === action.payload._id) {
                        action.payload.didUserLike ? post.likes += 1 : post.likes -= 1
                    }
                    return post
                })
            },
            prepare: (post) => {
                return { payload: post }
            }
        },
        
    }
})

export const { setPosts, addPost, removePost, editPost, likePost } = postsSlice.actions
export default postsSlice.reducer