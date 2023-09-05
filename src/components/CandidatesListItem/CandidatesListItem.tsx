import { IonItem, IonAvatar, IonImg, IonLabel, IonText, IonIcon } from '@ionic/react'
import { statsChartOutline } from 'ionicons/icons'
import React from 'react'

// image
import Image from '../../assets/images/Red Modern Line Chart Diagram Produt Data Graph.png'


interface Props {
    name: string
    party: string
    voteCount: number
    candidateId: string
}


const CandidatesListItem: React.FC<Props> = ({ name, party, voteCount, candidateId }) => {
    return (
        <IonItem routerDirection='forward' routerLink={`/candidate_details/${candidateId}`} detail>
            <IonAvatar slot='start'>
                <IonImg src={Image}/>
            </IonAvatar>
            <IonLabel>
                <h2>{name}</h2>
                <p>{party}</p>
            </IonLabel>
            <IonText slot='end'>
                <IonIcon icon={statsChartOutline} color='warning' />
                <small className='text-light ms-2'>{voteCount}</small>
            </IonText>
        </IonItem>
    )
}

export default CandidatesListItem