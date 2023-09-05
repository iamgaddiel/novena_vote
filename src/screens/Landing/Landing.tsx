import { IonContent, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react'
import { home, homeOutline, peopleOutline } from 'ionicons/icons'
import React, { useState } from 'react'
import Home from '../Home/Home'
import Candidates from '../Candidates/Candidates'



type ScreenView = 'home' | 'candidates'

const Landing = () => {
  const [screenView, setScreenView] = useState<ScreenView>('home')


  return (
    <IonPage>
      <IonHeader className='ion-no-border'>
        <IonToolbar>
          <IonTitle className='ion-text-center'>Evoting</IonTitle>

          <IonSegment value={screenView} className='w-75 mx-auto mt-3' mode='md'>
            {/* Home */}
            <IonSegmentButton value={'home'}  onClick={() => setScreenView('home')}>
              <IonIcon icon={homeOutline} />
            </IonSegmentButton>

            {/* Vote */}
            <IonSegmentButton value={'candidates'} onClick={() => setScreenView('candidates')}>
              <IonIcon icon={peopleOutline} />
            </IonSegmentButton>

          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>

        {/* [Views ]------------------------------------------------- */}
        {screenView === 'home' && <Home />}
        {screenView === 'candidates' && <Candidates />}
      </IonContent>
    </IonPage>
  )
}

export default Landing