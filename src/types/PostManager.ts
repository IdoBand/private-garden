import { AbstractManager } from "./AbstractManager";
import { ImgBuffer, Post } from "./interface";

class PostManager extends AbstractManager {
    constructor() {
        super()
    }
    serializePost(post: Post) {
        /**
         * Serialize a post thats coming from the data base.
         * post images and user profile images are of type binary data.
         */
        return {
            ...post,
            userName: this.capitalize(post.userName),
            images: this.decideMultipleImg(post.images as ImgBuffer[]),
            profileImg: this.decideImg(post.profileImg),
            dateAdded: this.generateTimeString(post.dateAdded as string)
        }
    }
    generateTimeString(dateInstance: string) {
 
        const date = +(new Date(dateInstance));
        const now = +(new Date());
        const secondsElapsed = Math.floor((now - date) / 1000);
    
        let result;
        if (secondsElapsed < 60) {
            result = `${secondsElapsed} seconds ago`;
        } else if (secondsElapsed < 3600) {
            const minutes = Math.floor(secondsElapsed / 60);
        result = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (secondsElapsed < 86400) {
            const hours = Math.floor(secondsElapsed / 3600);
        result = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(secondsElapsed / 86400);
        result = `${days} day${days > 1 ? 's' : ''} ago`;
        }
        return result
        
    }
    serializeNewPost(newPost: Post) {
        /**
         * Serialize a post thats coming from the data base.
         * post images are .jpg files.
         * user profile image is a temporary url string.
         */
        return { ...newPost,
            userName: this.capitalize(newPost.userName),
            images: this.generateImgSrcUrl(newPost.images as File[]),
            dateAdded: this.generateTimeString(newPost.dateAdded as string)
        }
    }
}

export const postManager = new PostManager()