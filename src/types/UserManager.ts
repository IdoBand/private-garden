import { User } from './interface'
import { AbstractManager } from "./AbstractManager";

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
        }
        console.log(serializerUser);
        
        return serializerUser
    }
}

export const userManager = new UserManager()