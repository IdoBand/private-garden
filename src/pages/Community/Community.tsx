
import PostComponent from '../../components/Post/Post'
import AddPost from '../../components/Post/AddPost'
import useFetchPosts from '../../hooks/useFetchPosts'
import PostSkeleton from '../../components/Post/PostSkeleton'
import { useAppSelector } from '../../redux/reduxHooks'
const skeletonArray = Array.from(Array(5).keys())

const Community = () => {
  const posts = useAppSelector(state => state.posts.posts)
  const {  errorMessage, isFetching } = useFetchPosts()
  function scrollBackUp() {
    const section = document.querySelector('#community-page-container')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
  }
  return (
    <main id='community-page-container'>
        <span className='home-section-header'>Community</span>
        <AddPost />
        <section className='posts-container'>
            {
              isFetching ? 
              
              skeletonArray.map(_ => {return <PostSkeleton key={_} />})
            :
              posts.map(post => {
                  return <PostComponent key={post._id} post={post} />
              })
            }
            {errorMessage && 
              <article>
                Sorry, something went wrong :(
              </article>
            }
        </section>
        <button
          type='button'
          onClick={scrollBackUp}
          className='back-to-top'
          >
            TOP
        </button>
    </main>
  )
}

export default Community