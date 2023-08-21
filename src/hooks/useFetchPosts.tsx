import { useState, useEffect } from 'react'
import { Post } from '../types/interface'
import { fetchAllPosts } from '../util/fetch'
import { postManager } from '../types/PostManager'

const useFetchPosts = () => {

    const [posts, setPosts] = useState<Post[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<null | string>(null)
    const [hasMore, setHasMore] = useState<boolean>(true) // future pagination

    async function fetchPosts(){
        setIsFetching(true)
        try {
            const result = await fetchAllPosts()
            const serializedPosts = result.data.map((post: Post) => {
                return postManager.serializePost(post)})
            setPosts(serializedPosts)
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
    posts,
    hasMore
  }
}

export default useFetchPosts