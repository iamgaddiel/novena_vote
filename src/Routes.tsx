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

            {/* <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/" render={() => <Landing />} />
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/tab1">
                        <IonIcon aria-hidden="true" icon={triangle} />
                        <IonLabel>Tab 1</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/tab2">
                        <IonIcon aria-hidden="true" icon={ellipse} />
                        <IonLabel>Tab 2</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3">
                        <IonIcon aria-hidden="true" icon={square} />
                        <IonLabel>Tab 3</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs> */}
        </IonReactRouter>
    )
}

export default Routes