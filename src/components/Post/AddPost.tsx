import { useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/reduxHooks";
import { useUploadImages } from "../../hooks/useUploadImages";
import Button from "../Button/Button";
import { useState } from "react";
import ExistingImage from "../ExistingImage/ExistingImage";
import { fetchAddPost } from "../../util/fetch";
import { Post } from "../../types/interface";

type AddPostProps = {
    text: string
    images: string[] | File[]
}
const AddPost = () => {
    const user = useAppSelector(state => state.window.user)
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const { imageFiles, filesInput,errorMessage, deleteImageFromArray }  = useUploadImages(2, 0, true)
    const [isFormActive, setIsFormActive] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    async function onSubmit(data: AddPostProps) {
        console.log('hell');
        
        if (data.text || imageFiles) {
            setIsFetching(true)
            const createPost: Partial<Post> = {
                userId: user.id,
                text: data.text,
                dateAdded: new Date(),
            }
            
            try {
                const result = await fetchAddPost(createPost, imageFiles)
                const newPost: Partial<Post> = {
                    _id: result.data,
                    userId: user.id,
                    userName: `${user.firstName} ${user.lastName}`,
                    profileImg: '',
                    text: data.text,
                    images: imageFiles,
                    likes: [],
                    comments: []
                }
            } catch (err) {
                
            } finally {
                setIsFetching(false)
            }
        }
    }

  return (
    <form
        className={`add-post-form ${isFormActive ? 'active' : ''}`}
        onClick={() => setIsFormActive(true)}
        onSubmit={handleSubmit((data) => {onSubmit(data as AddPostProps)})}>
        <section className="add-post-header-img-container">
            <img src={user.profileImg} className="add-post-profile-img"/>
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
            <Button type='submit' className="green-button" isDisabled={isFetching} onClick={() => {return}} text="Add Post"/>
        </section>
    </form>
  )
}

export default AddPost