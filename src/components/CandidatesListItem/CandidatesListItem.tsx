import { IonItem, IonAvatar, IonImg, IonLabel, IonText, IonIcon, IonSkeletonText } from '@ionic/react'
import { statsChartOutline } from 'ionicons/icons'
import React from 'react'

// image
// import Image from '../../assets/images/Red Modern Line Chart Diagram Produt Data Graph.png'
import NigeriaFlag from '../../assets/images/nigeria.png'



interface Props {
    name: string
    party: string
    voteCount: number
    candidateId: string
    isLoading: boolean
    isVerified: boolean
}


const CandidatesListItem: React.FC<Props> = ({ name, party, voteCount, candidateId, isLoading, isVerified }) => {
    return (
        <IonItem routerDirection='forward' routerLink={isVerified ? `/candidate_details/${candidateId}` : '#'} detail>
            <IonAvatar slot='start'>
                <IonImg src={NigeriaFlag} />
            </IonAvatar>
            <IonLabel>
                <h2>{name}</h2>
                <p>{party}</p>
            </IonLabel>
            {
                isLoading ? (
                    <>
                        <IonText slot='end' className='d-flex justify-content-between'>
                            <IonIcon icon={statsChartOutline} color='warning' />
                            <IonSkeletonText animated style={{ width: '50px' }} />
                        </IonText>
                    </>
                ) : (
                    <>
                        <IonText slot='end'>
                            <IonIcon icon={statsChartOutline} color='warning' />
                            <small className='text-light ms-2'>{voteCount}</small>
                        </IonText>
                    </>

                )
            }
        </IonItem>
    )
}

export default CandidatesListItem