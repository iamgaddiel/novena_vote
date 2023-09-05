import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonFooter, IonHeader, IonIcon, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { useParams } from 'react-router'

import './CandidateDetail.css'

import Image from '../../assets/images/Red Modern Line Chart Diagram Produt Data Graph.png'
import { arrowBackCircleOutline, arrowBackOutline, fingerPrintOutline, warning } from 'ionicons/icons'

const CandidateDetail = () => {
    const { candidateId } = useParams<{ candidateId: string }>()

    return (
        <IonPage>
            <IonContent>
                <IonFab horizontal='start' vertical='top'>
                    <IonFabButton color={warning} routerDirection='back' routerLink='/'>
                        <IonIcon icon={arrowBackOutline} />
                    </IonFabButton>
                </IonFab>
                <section className="detail_banner rounded-bottom-5"></section>

                <section className="detail_decription mt-3 ion-padding">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <small>Candidate</small>
                            <h2>Gaddiel Ighota</h2>
                        </div>
                        <IonAvatar>
                            <IonImg src={Image} />
                        </IonAvatar>
                    </div>

                    <div className='mt-5'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, exercitationem voluptatibus tenetur unde mollitia vero sunt ullam saepe eum qui!
                    </div>
                </section>
            </IonContent>

            <IonFooter>
                <IonToolbar className='ion-text-center py-5'>
                    <IonIcon icon={fingerPrintOutline} color='warning' size='large' style={{ fontSize: '300px'}} />
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default CandidateDetail