import { User } from './interface'
import { AbstractManager } from "./AbstractManager";
import getCroppedImg from '../components/ImageCrop/canvasToFile';

class UserManager extends AbstractManager {
    constructor() {
        super()
    }
    serializerUser(user: User): User {
        const serializerUser: User = {
            ...user,
            id: user.id,
            dateAdded: this.serializeDate(user.dateAdded!),
            lastActive: this.serializeDate(user.lastActive!),
            profileImg: this.decideImg(user.profileImg as string),
        }
        return serializerUser
    }
    async organizeGoogleUserRawData(rawUserData: Partial<User>) {
        if (rawUserData.profileImg) {
            const imgFile = await getCroppedImg(rawUserData.profileImg as string,{ height:0, width:0, x:0, y:0})
            return {...rawUserData, profileImg: imgFile}
        }
        return rawUserData
    }
}

export const userManager = new UserManager()