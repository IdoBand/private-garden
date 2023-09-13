import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/reduxHooks";
import { useUploadImages } from "../../hooks/useUploadImages";
import Button from "../Button/Button";
import { useState, Dispatch, SetStateAction } from "react";
import ExistingImage from "../ExistingImage/ExistingImage";
import { fetchAddPost, fetchEditPost } from "../../util/fetch";
import { Post } from "../../types/interface";
import { useSnackbar } from "../../hooks/useSnackbar"
import { useAppDispatch } from "../../redux/reduxHooks";
import { addPost, editPost } from "../../redux/postsSlice";
import { postManager } from "../../types/PostManager";
import { convertMultipleExistingImages } from "../ImageCrop/s3CanvasToFile";

type AddPostProps = {
    post?: Post
    setIsEditing?: Dispatch<SetStateAction<boolean>>
}
type AddPostFormProps = {
    text: string
    images: string[] | File[]
}
const AddPost = ({post, setIsEditing}: AddPostProps) => {
    const user = useAppSelector(state => state.window.user)
    const { register, handleSubmit, formState: { errors }, clearErrors, reset, setError } = useForm();
    const [existingPostImages, setExistingPostImages] = useState<string[]>(post ? post.images as string[] : [])
    const { imageFiles, filesInput,errorMessage, deleteImageFromArray, deleteAllImages } = useUploadImages(2, post ? post.images.length : 0, true, post ? post._id : 'add')
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const { show: showSnackbar, component: snackBar } = useSnackbar();
    const dispatch = useAppDispatch()
    function resetAddPostForm() {
        deleteAllImages()
        reset()
    }
    function isTextValid(text: string) {
        // checks spaces only for now
        let counter = 0
        for (let i = 0 ; i < text.length ; i++) {
            if (text.charCodeAt(i) === 32) {
                counter += 1
            }
        }
        return (counter / text.length) * 100 > 50 ? false : true
    }
    async function handleAddPost(text: string) {
        const createPost: Partial<Post> = {
            userId: user.id,
            text: text,
            dateAdded: new Date(),
        }
        try {
            const result = await fetchAddPost(createPost, imageFiles)
            const newPost: Post = {
                _id: result.data,
                userId: user.id,
                userName: `${user.firstName} ${user.lastName}`,
                profileImg: user.profileImg as string,
                dateAdded: createPost.dateAdded as Date,
                text: text,
                images: imageFiles,
                likes: 0,
                comments: [],
                didUserLike: false,
            }
            const serializedPost = postManager.serializeNewPost(newPost)
            if (result.success) {
                showSnackbar("Post added successfully", "success")
                resetAddPostForm()
                dispatch(addPost(serializedPost))
            } else {
                throw Error
            }
        } catch (err) {
            console.log(err);
            showSnackbar("Failed to add post", "error")
        }
        
    }
    async function handleEditPost(text: string) {
        const editPostData: Partial<Post> = {
            _id: post!._id,
            userId: user.id,
            text: text,
        }
        const convertedImages = await convertMultipleExistingImages(existingPostImages)
        const AllImages = convertedImages.concat(imageFiles)
        try {
            const result = await fetchEditPost(editPostData, AllImages)
            if (result.success && post) {
                const editedPost = { ...post}
                editedPost.images = AllImages
                editedPost.text = text
                const serializedPost = postManager.serializePost(editedPost)
                showSnackbar("Post edited successfully", "success")
                resetAddPostForm()
                dispatch(editPost(serializedPost))
                setIsEditing!(false)
            }
        } catch (err) {
            console.log(err);
            showSnackbar("Failed to edit post", "error")
        }
    }
    async function onSubmit(data: AddPostFormProps) {
        if (data.text || imageFiles.length > 0 || existingPostImages.length > 0) {
            setIsFetching(true)
            try {
                if (!isTextValid(data.text)) {
                    setError("space", {
                        type: "manual",
                        message: `Please avoid space bar spamming`
                    });
                    throw Error('Something is not right with the text of the post.')
                }
                if (post) { // editing exiting post
                    await handleEditPost(data.text)
                } else { // adding a new post
                    await handleAddPost(data.text)
                }
            } catch (err) {
                console.log(err);
                
            } finally {
                setIsFetching(false)
            }
        }
    }
    function deleteExistingPostImage(idx: number) {
        setExistingPostImages(prev => {
            return prev.filter((_, index) => index !== idx)
        })
    }
  return (
    <>
    <form
        className={`add-post-form ${isFetching ? 'fetching' : ''}`}
        onSubmit={handleSubmit((data) => {onSubmit(data as AddPostFormProps)})}>
        <section className="add-post-header-img-container">
            <img src={user.profileImg as string} className="add-post-profile-img"/>
            <span className="user-name">{post ? 'Edit a Post' : 'Add a New Post'}</span>
        </section>
        <section>
        <div className='identify-images-container'>    
            {/* new images uploaded by the user - Files */}
            {imageFiles.length > 0 &&
                imageFiles.map((imageFile, idx) => {
                    const url = URL.createObjectURL(imageFile)
                    return <ExistingImage 
                    key={url}
                    src={url}
                    idx={idx}
                    handleImageDelete={() => deleteImageFromArray(idx)}
                    imgClassName={'image-to-identify'}
                    onClick={undefined}
                    />
                })
            }
            {/* existing images coming from s3 bucket - Strings */}
            {existingPostImages.length > 0 &&
                existingPostImages.map((url, idx) => {
                    return <ExistingImage 
                    key={url as string}
                    src={url as string}
                    idx={idx}
                    handleImageDelete={() => deleteExistingPostImage(idx)}
                    imgClassName={'image-to-identify'}
                    onClick={undefined}
                    />
                })
            }
        </div>
        </section>
        <textarea
            className="add-comment-post-textarea"
            placeholder="What would you like to share?"
            defaultValue={post ? post. text : ''}
            {...register("text")}
            />
        <section className="add-post-buttons-container">
            {filesInput}
            {errorMessage}
            {errors.space && 
                <div className="error-div">{errors.space.message as string}</div>
            }
            {post &&
                <Button
                type='button'
                className="green-button blank"
                isDisabled={isFetching}
                onClick={() => setIsEditing!(false)}
                text='Cancel'
                icon="goBack"
                 />
            }
            <Button
                type='submit'
                className="green-button"
                isDisabled={isFetching}
                onClick={() => {return}}
                text={post ? 'Submit Edit' : 'Add Post'}
                icon="add" />
        </section>
    </form>
    {snackBar}
    </>
  )
}

export default AddPost