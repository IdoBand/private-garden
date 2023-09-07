import { useState } from "react"
import { Post } from "../../types/interface"
import { LikeSvg, CommentSvg } from "../../util/svgs"
import { useAppSelector } from "../../redux/reduxHooks"
import { EllipsisVerticalIcon, ShieldExclamationIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"
import { fetchDeletePost, fetchLike } from "../../util/fetch"
import { useSnackbar } from "../../hooks/useSnackbar"
import { useAppDispatch } from "../../redux/reduxHooks"
import { removePost, likePost } from "../../redux/postsSlice"
type PostComponentProps = {
    post: Post
}
export default function PostComponent ({ post }: PostComponentProps) {
    
    const user = useAppSelector(state => state.window.user)    
    const [likedByUser, setLikedByUser] = useState<boolean>(post.didUserLike)
    const [showComments, setShowComments] = useState<boolean>(false)
    const [addComment, setAddComment] = useState<boolean>(false)
    const [postMenu, setPostMenu] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { show: showSnackbar, component: snackBar } = useSnackbar();
    async function handleLikeClick() {
        setIsFetching(true)
        const like = likedByUser ? false : true
        try {
            await fetchLike(post._id, user.id, like)
        } catch (err) {
            console.log(err);
        } finally {
            dispatch(likePost({...post, didUserLike: like}))
            setLikedByUser(prev => !prev)
            setIsFetching(false)
        }
    }

    async function handleDeleteClick(postId: string) {
        try {
            const result = await fetchDeletePost(postId)
            if (result.success) {
                showSnackbar("Post deleted successfully", "success")
                dispatch(removePost(postId))
            } else {
                throw Error
            }
        } catch (err) {
            console.log(err);
            showSnackbar("Failed to delete post", "error")
        }
    }
  return (
    <article className='post-container'>
        <section className="post-header">
            <div className="post-user-info-container">
                <img className="post-avatar" src={post.profileImg} />
                <div className="">
                    <div className="user-name">{post.userName}</div>
                    <div className="follow-time-container">
                        {/* <button className="follow-button">{user.following.includes(post.userId) ? 'Unfollow User' : 'Follow User'}</button> */}
                        <div className="time">{post.dateAdded as number}</div>
                    </div>
                </div>
            </div>
            <nav
                className={`post-options-menu-button ${postMenu ? 'active' : ''}`}
                onClick={() => setPostMenu(prev => !prev)}>
                <EllipsisVerticalIcon width={20} />
                {postMenu &&
                    <ul className={`post-menu-ul ${postMenu ? 'active' : ''}`}>
                                <li className="post-menu-li" onClick={() => {return}}>
                                <ShieldExclamationIcon />
                                <span className="post-options-button">Report</span>
                                </li>
                            {
                            post.userId === user.id && 
                            <>
                                <li className="post-menu-li" onClick={() => {return}}>
                                    <PencilSquareIcon />
                                    <span className="post-options-button">Edit</span>
                                </li>
                                <li className="post-menu-li" onClick={() => handleDeleteClick(post._id)}>
                                    <TrashIcon />
                                    <span className="post-options-button">Delete</span>
                                </li>
                            </>
                            }
                    </ul>
                }
            </nav>
        </section>
        <section className="post-text-container" >
            {post.text}
        </section>
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
            <div className="total-likes">{post.likes} Like{post.likes === 1 ? '' : 's'}</div>
            <div className="total-comments" onClick={() => setShowComments(prev => !prev)}>{post.comments.length} Comment{post.comments.length === 1 ? '' : 's'}</div>
        </div>
        <div className="like-comment-buttons-container">
            <button 
                className={likedByUser ? 'like-comment-buttons-active':'like-comment-buttons'} 
                onClick={handleLikeClick}
                disabled={isFetching}
                >
                    <LikeSvg className={likedByUser ? 'like-comment-buttons-active':'like-comment-buttons'}/>Like
            </button>
            <button 
                className='like-comment-buttons'
                onClick={() => setAddComment(prev => !prev)}
                >
                    <CommentSvg />Comment
            </button>
        </div>
        {
            addComment && <textarea className="add-comment-post-textarea" placeholder="Write a comment...">

            </textarea>
        }
        {showComments && <section className="comments-section">
            Comments section Coming Soon...
            </section>
        }
        {snackBar}
    </article>
  )
}