import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonImg, IonPage, IonSkeletonText, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import './CandidateDetail.css'

import Image from '../../assets/images/Red Modern Line Chart Diagram Produt Data Graph.png'
import { arrowBackCircleOutline, arrowBackOutline, fingerPrintOutline, warning } from 'ionicons/icons'
import { getApiCollectionItem, updateApiCollectionItem } from '../../helpers/apiHelpers'
import { CANDIDATES_COLLECTION, USER, USERS_COLLECTION } from '../../helpers/keys'
import { CandidateItem } from '../../@types/candidates'
import { getStoredUser } from '../../helpers/authSDK'
import { isNullish } from '../../helpers/utils'
import { StoredUser, UserRecord } from '../../@types/users'

import { saveData } from '../../helpers/storageSDKs'

import { NativeBiometric } from 'capacitor-native-biometric'





interface Toast {
    enabled: boolean,
    message: string,
    type?: 'warning' | 'danger' | 'success'
}


const CandidateDetail = () => {
    const { candidateId } = useParams<{ candidateId: string }>()

    const [candidate, setCandidate] = useState<CandidateItem>(candidateDemo)

    const [user, setUser] = useState<StoredUser | null>(null)

    const [biometricsAvailable, setBiometricsAvailable] = useState(true)

    const [showToast, setShowToast] = useState<Toast>({
        enabled: false,
        message: '',
        type: 'warning'
    })

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        getCandidate()
    }, [])

    useEffect(() => {
        checkBiometricsAvailability()
    }, [])


    async function getCandidate() {
        setIsLoading(true)
        const user = await getStoredUser()

        if (isNullish(user)) {
            setShowToast({
                enabled: true,
                message: "You're not a registered user"
            })
            return
        }

        try {
            const { response } = await getApiCollectionItem(CANDIDATES_COLLECTION, candidateId, user.token)
            const candidateDetails = response as CandidateItem
            setUser(user)
            setCandidate(candidateDetails)
            setIsLoading(false)
        }
        catch (error: any) {
            setShowToast({
                enabled: true,
                message: "Error getting candidate's details: Check your network connection and try again!"
            })
            return
        }
    }


    async function checkBiometricsAvailability() {

        const { isAvailable } = await NativeBiometric.isAvailable();

        if (isAvailable !== true) {
            setShowToast({
                enabled: true,
                message: "Unsupported device for biometrics scan"
            })
            return
        };
    }


    async function initiateFingerPrintVoting() {
        const options = {
            reason: 'Initialize voting',
            title: 'Initialize voting',
            subTitle: `You are about to vote for ${candidate.name}`,
            description: 'Note by confirming, you approve of this candidate',
        }

        const isVerified = await NativeBiometric.verifyIdentity(options)
            .then(async () => {

                const {token: userAuthToken, record: userRecord} = await getStoredUser()

                // increment candidate vote
                const { isUPdated, response: updateCandidateResponse } = await updateApiCollectionItem(
                    CANDIDATES_COLLECTION,
                    candidateId,
                    { vote_count: ++candidate.vote_count },
                    userAuthToken
                )

                if (!isUPdated) {
                    setShowToast({
                        enabled: true,
                        message: "Error with voting process",
                        type: 'danger'
                    })
                    return
                }


                // update user's has_voted, candidate_voted property
                const { isUPdated: userDetailUpdate, response } = await updateApiCollectionItem(
                    USERS_COLLECTION,
                    userRecord?.id,
                    {
                        has_voted: true,
                        candidate_voted: candidateId
                    },
                    userAuthToken
                )

                if (!userDetailUpdate) {
                    setShowToast({
                        enabled: true,
                        message: "Error: Could not updated user details",
                        type: 'danger'
                    })
                    return
                }

                const newUserRecord: StoredUser = {
                    token: user?.token!,
                    record: response as UserRecord
                }

                saveData(USER, newUserRecord)
                setUser(newUserRecord)

            })
            .catch(() => {
                setShowToast({
                    enabled: true,
                    message: "Failed to authenticated user"
                })
            })
    }

    return (
        <IonPage>
            <IonContent>
                <IonToast
                    isOpen={showToast.enabled}
                    message={showToast.message}
                    onDidDismiss={(current) => setShowToast({ enabled: false, message: '' })}
                    position='top'
                    color={showToast.type}
                    duration={4000}
                />

                {
                    !biometricsAvailable && (
                        <IonToast
                            isOpen={showToast.enabled}
                            message={showToast.message}
                            onDidDismiss={(current) => setShowToast({ enabled: false, message: '' })}
                            position='top'
                            color={'danger'}
                            duration={4000}
                        />
                    )
                }

                <IonFab horizontal='start' vertical='top'>
                    <IonFabButton color={warning} routerDirection='back' routerLink='/'>
                        <IonIcon icon={arrowBackOutline} />
                    </IonFabButton>
                </IonFab>

                <section className="detail_banner rounded-bottom-5"></section>

                {
                    isLoading ? (
                        <section className="detail_decription mt-3 ion-padding">
                            <div className="d-flex align-items-center justify-content-between px-2">
                                <div>
                                    <IonSkeletonText animated style={{ width: '30px' }} />
                                    <IonSkeletonText animated style={{ width: '190px' }} />
                                </div>
                                <IonSkeletonText animated style={{ width: '50px', height: '50px' }} className='rounded-circle' />
                            </div>

                            <div className='mt-5'>
                                <IonSkeletonText animated style={{ height: '40px', width: '70px' }} />
                                <IonSkeletonText animated style={{ height: '40px', width: '100%' }} />
                                <IonSkeletonText animated style={{ height: '40px', width: '90%' }} />
                                <IonSkeletonText animated style={{ height: '40px', width: '70%' }} />
                                <IonSkeletonText animated style={{ height: '40px', width: '80%' }} />
                                <IonSkeletonText animated style={{ height: '40px', width: '95%' }} />
                            </div>
                        </section>
                    ) : (
                        <section className="detail_decription mt-3 ion-padding">
                            <div className="d-flex align-items-center justify-content-between px-2">
                                <div>
                                    <small>{candidate.party}</small>
                                    <h2>{candidate.name}</h2>
                                </div>
                                <IonAvatar>
                                    <IonImg src={Image} />
                                </IonAvatar>
                            </div>

                            <div className='mt-5'>
                                <h4>About</h4>
                                {candidate.description}
                            </div>
                        </section>
                    )
                }

            </IonContent>

            {
                !isNullish(user) && !user?.record.has_voted && user?.record.candidate_voted !== candidateId && (
                    <IonFooter>
                        <IonToolbar className='ion-text-center py-5'>
                            <IonIcon
                                icon={fingerPrintOutline}
                                color='warning' size='large'
                                style={{ fontSize: '300px' }}
                                onClick={initiateFingerPrintVoting}
                            />
                        </IonToolbar>
                    </IonFooter>
                )
            }

        </IonPage>
    )
}

export default CandidateDetail



const candidateDemo: CandidateItem = {
    id: '',
    collectionId: '',
    collectionName: '',
    created: '',
    updated: '',
    name: 'Anonymous Candidate',
    party: '',
    logo: '',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, exercitationem voluptatibus tenetur unde mollitia vero sunt ullam saepe eum qui!',
    vote_count: 0,
    expand: {
        party: {
            id: '',
            collectionId: '',
            collectionName: '',
            created: '',
            updated: '',
            name: '',
        }
    }
}