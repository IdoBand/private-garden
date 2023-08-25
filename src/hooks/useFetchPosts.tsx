import { useState, useEffect } from 'react'
import { Post } from '../types/interface'
import { fetchAllPosts } from '../util/fetch'
import { postManager } from '../types/PostManager'
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks'
import { setPosts } from '../redux/postsSlice'
const useFetchPosts = () => {
    const user = useAppSelector(state => state.window.user)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [hasMore, setHasMore] = useState<boolean>(true) // future pagination
    const dispatch = useAppDispatch()
    async function fetchPosts(){
        setIsFetching(true)
        try {
            const result = await fetchAllPosts(user.id)
            const serializedPosts = result.data.map((post: Post) => {
                return postManager.serializePost(post)}
            )
                
            dispatch(setPosts(serializedPosts))
        } catch (err) {
            const errorMessage: string = 'There was an error fetching the posts'
            console.log(`${errorMessage}: ` + err);
            setErrorMessage(errorMessage)
        } finally {
            setIsFetching(false)
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])

  return {
    isFetching,
    errorMessage,
    hasMore,
  }
}

export default useFetchPosts