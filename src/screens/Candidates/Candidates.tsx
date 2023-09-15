import { IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, IonText, IonTitle, IonToast, RefresherEventDetail } from '@ionic/react'
import React, { useEffect, useState } from 'react'

import { cloudOfflineOutline, statsChart, statsChartOutline } from 'ionicons/icons'
import CandidatesListItem from '../../components/CandidatesListItem/CandidatesListItem'
import { listApiCollection } from '../../helpers/apiHelpers'
import { CANDIDATES_COLLECTION, USER, USER_UUID } from '../../helpers/keys'
import { authenticate, getStoredUser } from '../../helpers/authSDK'
import { isNullish } from '../../helpers/utils'
import { CandidateItem, CandidateList } from '../../@types/candidates'
import { StoredUser } from '../../@types/users'
import { getSaveData, saveData } from '../../helpers/storageSDKs'









const Candidates = () => {
  const [showToast, setShowToast] = useState({
    enabled: false,
    message: ''
  })
  const [electionCandidates, setElectionCandidates] = useState<CandidateItem[]>(demoCandidates)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifiedForVoting, setIsVerifiedForVoting] = useState(false)



  useEffect(() => {
    fetchUserDetails()
  }, [])


  async function fetchUserDetails() {
    const user = await getStoredUser()

    if (isNullish(user)) {
      setShowToast({
        enabled: true,
        message: "You're not a registered user"
      })
      return
    }

    try {
      const trackingId = await getSaveData(USER_UUID) as string
      const { token, record } = await authenticate(user.record.email, trackingId)

      // store authenticated user detail to storage
      saveData(USER, { token, record })
      getCandidates(user)
      setIsVerifiedForVoting(true)
    }

    catch (error: any) {
      setShowToast({
        enabled: true,
        message: 'Error authenticating user'

      })
      // check if user is verified to vote
      if (user.record.can_vote !== true) {
        setShowToast({
          enabled: true,
          message: "Prohibited from voting: user not verified. Refresh Again."
        })
        return
      }

    }

  }


  async function getCandidates(user: StoredUser) {
    setIsLoading(true)

    if (typeof user === 'undefined') {
      setShowToast({
        enabled: true,
        message: "Error fetching user details: Check network connection and try again!"
      })
      return
    }

    try {

      const params = { expand: 'party' }
      const { data } = await listApiCollection(CANDIDATES_COLLECTION, user?.token!, params)
      const candidatesItem = data as CandidateList
      setElectionCandidates(candidatesItem.items)
      setIsLoading(false)


    } catch (e: any) {
      setElectionCandidates(demoCandidates)
      setShowToast({
        enabled: true,
        message: "Error fetching details: Check network connection and try again!"
      })
      return
    }
  }



  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      // Any calls to load data go here
      fetchUserDetails()

      // fetchCandidatesDetails()
      event.detail.complete();
    }, 2000);
  }


  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <IonToast
          isOpen={showToast.enabled}
          message={showToast.message}
          onDidDismiss={(current) => setShowToast({ enabled: false, message: '' })}
          position='top'
          color={'warning'}
          duration={4000}
        />
        {
          isLoading ? <IonProgressBar type={'indeterminate'} color={'warning'} /> : null
        }

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList lines='full' className='mt-3'>
          <IonListHeader>
            <span>Candidates</span>
          </IonListHeader>

          {
            electionCandidates ? electionCandidates?.sort((a: any, b: any) => a - b)?.map((candidate, indx) => (
              <CandidatesListItem
                candidateId={candidate.id.toString()}
                name={candidate.name}
                party={candidate.party}
                voteCount={candidate.vote_count}
                key={indx}
                isLoading={isLoading}
                isVerified={isVerifiedForVoting}
              />
            )) : (
              <div className='ion-text-center my-5'>
                <IonIcon icon={cloudOfflineOutline} size='large' />
                <h4>Could Not Get Candidates</h4>
                <p className=''> Check your connection and try again </p>
              </div>
            )
          }
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Candidates



const demoCandidates: CandidateItem[] = [
  {
    collectionId: 'sksielsi',
    collectionName: CANDIDATES_COLLECTION,
    created: new Date().getTime().toString(),
    updated: new Date().getTime().toString(),
    name: 'Atiku',
    party: 'PDP',
    logo: '',
    vote_count: 12,
    id: new Date().getMilliseconds().toString(),
    description: 'new new new',
  },
  {
    collectionId: 'sksielsi',
    collectionName: CANDIDATES_COLLECTION,
    created: new Date().getTime().toString(),
    updated: new Date().getTime().toString(),
    name: 'Peter Obi',
    party: 'LABOR',
    logo: '',
    vote_count: 124,
    id: new Date().getTime().toString(),
    description: 'new new new',
  },
  {
    collectionId: 'sksielsi',
    collectionName: CANDIDATES_COLLECTION,
    created: new Date().getTime().toString(),
    updated: new Date().getTime().toString(),
    name: 'Gaddil',
    party: 'APC',
    logo: '',
    vote_count: 145,
    id: new Date().getTime().toString(),
    description: 'new new new',
  },

]
