import { IonTabs, IonRouterOutlet, IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import {triangle, ellipse, square} from 'ionicons/icons'
import { Route } from 'react-router'
import Landing from './screens/Landing'
import CandidateDetail from './screens/CandidateDetail/CandidateDetail'




const Routes = () => {
    return (
        <IonReactRouter>
            <Route exact path="/" render={() => <Landing />} />
            <Route exact path="/candidate_details/:candidateId" render={() => <CandidateDetail />} />
        </IonReactRouter>
    )
}

export default Routes