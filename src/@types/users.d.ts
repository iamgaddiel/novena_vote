


export type UserRecord = {
    id: string
    collectionId: string
    collectionName: string
    username?: string
    verified: boolean
    emailVisibility: boolean
    email: string
    created: string
    updated: string
    name: string
    avatar: string
    voters_id: string
    tracking_Id: string
    can_vote: boolean,
    candidate_voted: string,
    has_voted: true
}


export interface StoredUser {
    token: string
    record: UserRecord
}

