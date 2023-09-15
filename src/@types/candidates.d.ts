

export type Party = {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    name: string
}

export type CandidateItem = {
    id: string
    collectionId: string
    collectionName: string
    created: string
    updated: string
    name: string
    party: string
    logo: string
    description: string
    vote_count: number
    party: string
    expand?: {
        party: Party
    }
}


export interface CandidateList {
    page: number
    perPage: number
    totalPages: number
    totalItems: number
    items: CandidateItem[]
}

