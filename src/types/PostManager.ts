import { AbstractManager } from "./AbstractManager";
import { Post } from "./interface";

class PostManager extends AbstractManager {
    constructor() {
        super()
    }
    serializePost(post: Post) {
        console.log(typeof post.dateAdded);
        
        return {
            ...post,
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
}

export const postManager = new PostManager()