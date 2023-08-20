import { useState } from "react"
import { Post } from "../../types/interface"
import { LikeSvg, CommentSvg } from "../../util/svgs"
type PostComponentProps = {
    post: Post
}
export default function PostComponent ({ post }: PostComponentProps) {

    const [totalLikes, setTotalLikes] = useState<number>(post.likes)
    const [likedByUser, setLikedByUser] = useState<boolean>(post.didLike)
    const [showComments, setShowComments] = useState<boolean>(false)
    const [addComment, setAddComment] = useState<boolean>(false)
    const buttonClassName = likedByUser ? 'like-comment-buttons-active':'like-comment-buttons'

    function handleLikeClick() {
        setLikedByUser((likedByUser) => !likedByUser)
        setTotalLikes((totalLikes) => (likedByUser? totalLikes - 1 : totalLikes + 1))
    }
  return (
    <article className='post-container'>
        <div className="post-header">
            <img className="post-avatar" src={post.profileImg} />
            <div className="user-shop-time-container">
                <div className="user-name">{post.userName}</div>
                <div className="shop-name-time">
                    <div className="time">{post.dateAdded as number}</div>
                </div>
                </div>
            </div>
            <div className="post-text-container" >
                {post.text}
            </div>
            <div className="images-background">
                    {post.images.length === 1 &&
                    <div className="single-image-container">
                        <img className="post-image" src={post.images[0]} />
                    </div>
                    }
                    {post.images.length === 2 &&
                        <div className="double-image-container">
                            <img className="post-image" src={post.images[0]} />
                            <img className="post-image" src={post.images[1]} />
                        </div>
                    }
            </div>
            <div className="total-likes-comments-container">
                <div className="total-likes">{post.likes} Like{post.likes === 1 ? '' : 's'}</div>
                <div className="total-comments">{post.comments} Comment{post.comments === 1 ? '' : 's'}</div>
            </div>
            <div className="like-comment-buttons-container">
                
                <button 
                    className={buttonClassName} 
                    onClick={handleLikeClick}>
                        <LikeSvg className={buttonClassName}/>Like
                </button>
                <button 
                    className='like-comment-buttons'
                    onClick={() => setAddComment(prev => !prev)}
                    >
                        <CommentSvg />Comment
                </button>
            </div>
            {showComments && <section>
                Comments section
                </section>
            }
            {
                addComment && <textarea className="add-comment-text-area" placeholder="Write a comment...">

                </textarea>
            }
    </article>
  )
}
