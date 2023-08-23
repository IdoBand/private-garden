import { EllipsisVerticalIcon } from "@heroicons/react/24/solid"
import { Skeleton } from "@mui/material"
import { CommentSvg, LikeSvg } from "../../util/svgs"

const PostSkeleton = () => {
  return (
    <article className='post-container'>
        <section className="post-header">
            <div className="post-user-info-container">
                <Skeleton className="post-avatar" variant="circular" width={40} height={40} />
                <div className="">
                    <Skeleton className="user-name" variant="text" width={132}></Skeleton>
                    <div className="follow-time-container">
                        <Skeleton className="follow-button" variant="text" width={60}></Skeleton>
                        <Skeleton className="time" variant="text" width={60}></Skeleton>
                    </div>
                </div>
            </div>
            <nav className={`post-options-menu-button active}`}>
                <EllipsisVerticalIcon width={20} />
            </nav>
        </section>
        <Skeleton className="post-text-container" variant="rounded" height={100} style={{marginTop: '1.5rem'}} >
            {/* {post.text} */}
        </Skeleton>
        <div className="images-background">

                <Skeleton className="single-image-container" variant="rectangular">

                </Skeleton>
        </div>
        <div className="total-likes-comments-container">
            <Skeleton className="total-likes" variant="text" width={45} style={{marginLeft: '1rem'}} ></Skeleton >
            <Skeleton className="total-comments" variant="text" width={45} style={{marginRight: '1rem'}} ></Skeleton >
        </div>
        <div className="like-comment-buttons-container">
            <button 
                className='like-comment-buttons'
                >
                    <LikeSvg className={'like-comment-buttons'}/>Like
            </button>
            <button 
                className='like-comment-buttons'
                >
                    <CommentSvg />Comment
            </button>
        </div>

    </article>
  )
}

export default PostSkeleton