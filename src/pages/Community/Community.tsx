
import PostComponent from '../../components/Post/Post'
import { Post } from '../../types/interface'
import daniel from '/mock-users/imageDaniel.jpg'
import david from '/mock-users/imageDavid.jpg'
import jonathan from '/mock-users/imageJonathan.jpg'
import lilly from '/mock-users/imageLilly.jpg'
import rose from '/mock-users/imageRose.jpg'
import AddPost from '../../components/Post/AddPost'
import useFetchPosts from '../../hooks/useFetchPosts'
const Community = () => {

  const { posts, errorMessage } = useFetchPosts()

  return (
    <main className='community-page-container'>
        <title className='page-header'>Community</title>
        <AddPost />
        <section className='posts-container'>
            {posts.map(post => {
                return <PostComponent key={post._id} post={post} />
            })}
            {mockPosts.map(post => {
                return <PostComponent key={post._id} post={post} />
            })}
        </section>
    </main>
  )
}

export default Community

const mockPosts: Post[] = [
    {
      _id: 'post1',
      userId: 'daniel.clifford@dummy.com',
      userName: 'Daniel Clifford',
      profileImg: daniel,
      images: [],
      comments: [],
      dateAdded: 1,
      text: 'Check out my new plant!',
      likes: ['', '', '', ],
    },
    {
      _id: 'post2',
      userId: 'jonathan.walters@dummy.com',
      userName: 'Jonathan Walters',
      profileImg: jonathan,
      images: [],
      comments: [],
      dateAdded: 1,
      text: 'Excited to share how much my Monstera has grown :)',
      likes: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ],
    },
    {
      _id: 'post3',
      userId: 'rose.white@dummy.com',
      userName: 'Rose White',
      profileImg: rose,
      images: [],
      comments: [],
      dateAdded: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      likes: ['', ],
    },
    {
      _id: 'post4',
      userId: 'lilly.harmon@dummy.com',
      userName: 'Lilly Harmon',
      profileImg: lilly,
      images: [],
      comments: [],
      dateAdded: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      likes: ['', '', '', '', '', '', '', '', '', '', '', ],
    },
    {
      _id: 'post5',
      userId: 'david.abrams@dummy.com',
      userName: 'David Abrams',
      profileImg: david,
      images: [],
      comments: [],
      dateAdded: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      likes: ['', '', '', '', '', '', ],
    },
  ];