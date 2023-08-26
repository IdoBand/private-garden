import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/reduxHooks";
import { useUploadImages } from "../../hooks/useUploadImages";
import Button from "../Button/Button";
import { useState } from "react";
import ExistingImage from "../ExistingImage/ExistingImage";
import { fetchAddPost } from "../../util/fetch";
import { Post } from "../../types/interface";
import { useSnackbar } from "../../hooks/useSnackbar"
import { useAppDispatch } from "../../redux/reduxHooks";
import { addPost } from "../../redux/postsSlice";
import { postManager } from "../../types/PostManager";
type AddPostProps = {
    text: string
    images: string[] | File[]
}
const AddPost = () => {
    const user = useAppSelector(state => state.window.user)
    const { register, handleSubmit, formState: { errors }, clearErrors, reset, setError } = useForm();
    const { imageFiles, filesInput,errorMessage, deleteImageFromArray, deleteAllImages }  = useUploadImages(2, 0, true)
    const [isFormActive, setIsFormActive] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const { show: showSnackbar, component: snackBar } = useSnackbar();
    const dispatch = useAppDispatch()
    function resetAddPostForm() {
        deleteAllImages()
        reset()
        setIsFormActive(false)
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
    async function onSubmit(data: AddPostProps) {

        if (data.text || imageFiles.length > 0) {
            setIsFetching(true)
            const createPost: Partial<Post> = {
                userId: user.id,
                text: data.text,
                dateAdded: new Date(),
            }
            try {
                if (!isTextValid(data.text)) {
                    setError("space", {
                        type: "manual",
                        message: `Please avoid space bar spamming`
                    });
                    throw Error
                }
                const result = await fetchAddPost(createPost, imageFiles)
                const newPost: Post = {
                    _id: result.data,
                    userId: user.id,
                    userName: `${user.firstName} ${user.lastName}`,
                    profileImg: user.profileImg as string,
                    dateAdded: createPost.dateAdded as Date,
                    text: data.text,
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
            } finally {
                setIsFetching(false)
            }
        }
    }

  return (
    <>
    <form
        className={`add-post-form ${isFormActive ? 'active' : ''}`}
        onClick={() => setIsFormActive(true)}
        onSubmit={handleSubmit((data) => {onSubmit(data as AddPostProps)})}>
        <section className="add-post-header-img-container">
            <img src={user.profileImg as string} className="add-post-profile-img"/>
            <span className="user-name">Add a New Post</span>
        </section>
        <section>
        {imageFiles && 
            <div className='identify-images-container'> {
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
            </div>
        }
        </section>
        <textarea
            className="add-comment-post-textarea"
            placeholder="What would you like to share?"
            {...register("text")}
            />
        <section className="add-post-buttons-container">
            {filesInput}
            {errorMessage}
            {errors.space && 
                <div className="error-div">{errors.space.message as string}</div>
            }
            <Button type='submit' className="green-button" isDisabled={isFetching} onClick={() => {return}} text="Add Post" icon="add" />
        </section>
    </form>
    {snackBar}
    </>
  )
}

export default AddPost