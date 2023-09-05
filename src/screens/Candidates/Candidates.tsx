import { IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRefresher, IonRefresherContent, IonText, IonTitle, RefresherEventDetail } from '@ionic/react'
import React from 'react'

import { statsChart, statsChartOutline } from 'ionicons/icons'
import CandidatesListItem from '../../components/CandidatesListItem/CandidatesListItem'



const users = [
  {
    name: 'Gaddiel Ighota',
    party: 'COMPSCI',
    voteCount: 3000,
    id: new Date().getMilliseconds()
  },
  {
    name: 'Nicole James',
    party: 'MECHENGR',
    voteCount: 1000,
    id: new Date().getMilliseconds()
  },
  {
    name: 'Osaas Igurube',
    party: 'MASSCOM',
    voteCount: 3000,
    id: new Date().getMilliseconds()
  },
  {
    name: 'Peter Robinson',
    party: 'STATS',
    voteCount: 4500,
    id: new Date().getMilliseconds()
  },
]




const Candidates = () => {

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here

      // fetchCandidatesDetails()
      event.detail.complete();
    }, 2000);
  }

  
  return (
    <IonPage>
      <IonContent className='ion-padding'>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        <IonList lines='full' className='mt-3'>
          <IonListHeader>
            <span>Candidates</span>
          </IonListHeader>

          {
            users.sort((a: any, b: any) => a - b).map(candidate => (
              <CandidatesListItem
                candidateId={candidate.id.toString()}
                name={candidate.name}
                party={candidate.party}
                voteCount={candidate.voteCount}
                key={candidate.id}
              />
            ))
          }
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Candidates