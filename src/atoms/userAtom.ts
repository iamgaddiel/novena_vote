import { atom } from "recoil";
import { USER } from "../helpers/keys";
import { User } from "../@types/users";


export const userAtom = atom<User>({
    key: USER,
    default: {
        token: '',
        record: {
            id: '',
            email: '',
            emailVisibility: false,
            avatar: '',
            collectionId: '',
            collectionName: '',
            created: '',
            name: '',
            updated: '',
            verified: false,
            username: '',
            tracking_Id: '',
            can_vote: false,
            voters_id: ''
        }
    }
})