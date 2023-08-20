
import PostComponent from '../../components/Post/Post'
import { Post } from '../../types/interface'
import daniel from '/mock-users/imageDaniel.jpg'
import david from '/mock-users/imageDavid.jpg'
import jonathan from '/mock-users/imageJonathan.jpg'
import lilly from '/mock-users/imageLilly.jpg'
import rose from '/mock-users/imageRose.jpg'
const Community = () => {
  return (
    <main className='community-page-container'>
        <title className='page-header'>Community</title>
        <section className='posts-container'>
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
      userId: 'user1',
      userName: 'Daniel Clifford',
      profileImg: daniel,
      images: [],
      comments: 1,
      dateAdded: 1,
      text: 'Check out my new plant!',
      likes: 25,
      didLike: false,
    },
    {
      _id: 'post2',
      userId: 'user2',
      userName: 'Jonathan Walters',
      profileImg: jonathan,
      images: [],
      comments: 5,
      dateAdded: 1,
      text: 'Excited to share how much my Monstera has grown :)',
      likes: 288,
      didLike: false,
    },
    {
      _id: 'post3',
      userId: 'user3',
      userName: 'Rose White',
      profileImg: rose,
      images: [],
      comments: 0,
      dateAdded: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      likes: 41,
      didLike: false,
    },
    {
      _id: 'post4',
      userId: 'user4',
      userName: 'Lilly Harmon',
      profileImg: lilly,
      images: [],
      comments: 3,
      dateAdded: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      likes: 8,
      didLike: false,
    },
    {
      _id: 'post5',
      userId: 'user5',
      userName: 'David Abrams',
      profileImg: david,
      images: [],
      comments: 1,
      dateAdded: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      likes: 14,
      didLike: false,
    },
  ];