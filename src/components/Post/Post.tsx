import { useState } from "react"
import { Post } from "../../types/interface"
import { LikeSvg, CommentSvg } from "../../util/svgs"
import { useAppSelector } from "../../redux/reduxHooks"
type PostComponentProps = {
    post: Post
}
export default function PostComponent ({ post }: PostComponentProps) {
    
    const user = useAppSelector(state => state.window.user)
    const [likedByUser, setLikedByUser] = useState<boolean>(post.likes.includes(user.id))
    const [showComments, setShowComments] = useState<boolean>(false)
    const [addComment, setAddComment] = useState<boolean>(false)
    const buttonClassName = likedByUser ? 'like-comment-buttons-active':'like-comment-buttons'
    function handleLikeClick() {
        if (likedByUser) {
            post.likes.splice(post.likes.length - 1)
        } else {
            post.likes.push(user.id)
        }
        setLikedByUser(prev => !prev)
    }
  return (
    <article className='post-container'>
        <div className="post-header">
            <img className="post-avatar" src={post.profileImg} />
            <div className="user-shop-time-container">
                <div className="user-name">{post.userName}</div>
                <div className="shop-name-time">
                    <button className="follow-button">{user.following.includes(post.userId) ? 'Unfollow User' : 'Follow User'}</button>
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
                        <img className="post-image" src={post.images[0] as string} />
                    </div>
                    }
                    {post.images.length === 2 &&
                        <div className="double-image-container">
                            <img className="post-image" src={post.images[0] as string} />
                            <img className="post-image" src={post.images[1] as string} />
                        </div>
                    }
            </div>
            <div className="total-likes-comments-container">
                <div className="total-likes">{post.likes.length} Like{post.likes.length === 1 ? '' : 's'}</div>
                <div className="total-comments">{post.comments.length} Comment{post.comments.length === 1 ? '' : 's'}</div>
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
                addComment && <textarea className="add-comment-post-textarea" placeholder="Write a comment...">

                </textarea>
            }
    </article>
  )
}
