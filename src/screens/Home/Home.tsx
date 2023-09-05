import { IonButton, IonCard, IonCardContent, IonChip, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, IonTitle, IonToast, IonToolbar, RefresherEventDetail } from '@ionic/react'
import { cogOutline, image, logIn, personOutline, refreshOutline, toggle } from 'ionicons/icons'

import './Home.css'
import { useEffect, useReducer, useState } from 'react'
import { getSaveData, saveData } from '../../helpers/storageSDKs'
import { isNullish } from '../../helpers/utils'

import { v4 as uuid4 } from 'uuid'
import { USER, USER_UUID, VOTER, VOTER_COLLECTION } from '../../helpers/keys'
import { StoredUser } from '../../@types/users'
import { filterCollection } from '../../helpers/sdks'
import { createApiCollection, listApiCollection } from '../../helpers/apiHelpers'
import { authenticate, createUser, getStoredUser } from '../../helpers/authSDK'
import { _post } from '../../helpers/api'
import Settings from '../../helpers/settings'





const Home = () => {
  const [trackingId, setTrackingId] = useState('')
  const [user, setUser] = useState<StoredUser | null>(null)
  const [votingStatus, setVotingStatus] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState({
    enabled: false,
    message: ''
  })

  const [formDetails, setFormDetails] = useReducer(userReducer, {
    name: '',
    email: '',
    voters_id: ''
  })

  const { pb } = Settings()


  useEffect(() => {
    getOrCreateUUID()
  }, [])


  useEffect(() => {
    getUserDetails()
  }, [votingStatus])




  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      if (!isNullish(user)){
        authenticateUser(user?.record.email!, trackingId)
      }
      event.detail.complete();
    }, 2000);
  }


  async function handleCreateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    const { name, email, voters_id } = formDetails!

    if ((name || email || voters_id) === '') {
      setShowToast({
        enabled: true,
        message: 'Missing inputs'
      })
      return
    }


    const formDetailsExtension = {
      ...formDetails,
      tracking_id: trackingId,
      password: trackingId,
      passwordConfirm: trackingId
    }

    const url = `${pb.baseUrl}/collections/users/records`
    const header = {
      'Content-Type': 'application/json'
    }

    const authRes = await _post(url, formDetailsExtension, header)

    if (authRes.status !== 200) {
      setShowToast({
        enabled: true,
        message: 'Error creating user'
      })
      return
    }


    authenticateUser(email, trackingId)
    setIsLoading(false)
  }


  async function authenticateUser(email: string, password: string) {
    const { token, record } = await authenticate(email, password)
    // store authenticated user detail to storage
    saveData(USER, { token, record })
    setUser({ token: token!, record })
  }


  async function getUserDetails() {
    setIsLoading(true)

    // fetch details locally
    const storedUserDetails = await getStoredUser() as StoredUser
    if (!isNullish(storedUserDetails)) {

      // update user details
      authenticate(storedUserDetails.record.email, trackingId)
      setUser(storedUserDetails)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    setShowToast({
      enabled: true,
      message: "You're a new user, kindly register"
    })

  }


  async function getOrCreateUUID() {
    const userUUID = await getSaveData(USER_UUID) as string

    if (isNullish(userUUID)) {
      const newUUID = uuid4()
      saveData(USER_UUID, newUUID)
      setTrackingId(newUUID)
      return
    }
    setTrackingId(userUUID)
  }



  return (
    <IonPage>

      <IonContent className='ion-padding'>
        {
          isLoading && <IonProgressBar type={'indeterminate'} color={'warning'} />
        }

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonToast
          isOpen={showToast.enabled}
          message={showToast.message}
          onDidDismiss={(current) => setShowToast({ enabled: false, message: '' })}
          position='top'
          color={'warning'}
          duration={4000}
        />

        {/* [Banner] ------------------------------------------------- */}
        <section className='mt-4'>
          <IonCard className='p-4 d-flex align-items-center justify-content-center' style={{ height: '300px' }}>
            <IonCardContent>
              <div className="d-flex align-items-center justify-content-evenly">


                {/* setting */}
                <IonIcon icon={image} size='large' color={'primary'} />


                {/* Profile Image */}
                <div className='bg-warning rounded-circle d-flex align-items-center justify-content-center mx-5' style={{ width: '100px', height: '100px' }}>
                  <big color={'dark'} className='text-dark h2'>
                    <IonIcon icon={personOutline} size='large' color='dark' />
                  </big>
                </div>

                {/* can Vote */}
                <div className='ion-text-center text-light'>
                  <p>Verified</p>
                  {
                    user !== null && user.record.can_vote ? <IonIcon icon={toggle} size='large' color={'success'} /> : <IonIcon icon={toggle} size='large' color={'danger'} />
                  }
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </section>

        {/* [Unique ID] ------------------------------------------------- */}
        <section className='ion-text-center mt-5'>
          <h3 className='text-warning'>{trackingId}</h3>
          <IonChip>Tracking ID</IonChip>
        </section>

        {/* [Form] ------------------------------------------------- */}
        <section className='mt-5'>

          <form onSubmit={handleCreateUser} method='post'>
            {/* Name */}
            <div className="form-filed-wrapper">
              <IonInput
                type='text'
                placeholder={user !== null ? user.record.name : 'Peter Brown'}
                label='Name' labelPlacement='floating'
                required
                value={user !== null ? user.record.name : formDetails.name}
                onIonChange={(e) => setFormDetails({ type: SET_NAME, payload: e.detail.value })}
                readonly={user !== null ? true : false}
              />
            </div>
            {/* Email */}
            <div className="form-filed-wrapper mt-3">
              <IonInput
                type='email'
                placeholder='example@email.com'
                label='Email'
                labelPlacement='floating'
                required
                value={user !== null ? user.record.email : formDetails.email}
                onIonChange={(e) => setFormDetails({ type: SET_EMAIL, payload: e.detail.value })}
                readonly={user !== null ? true : false}
              />
            </div>
            {/* VoterId */}
            <div className="form-filed-wrapper mt-3">
              <IonInput
                type='text'
                placeholder='123dber3c545000'
                label="Voter's ID"
                labelPlacement='floating'
                required
                value={user !== null ? user.record.voters_id : formDetails.voters_id}
                onIonChange={(e) => setFormDetails({ type: SET_VOTERS_ID, payload: e.detail.value })}
                readonly={user !== null ? true : false}
              />
            </div>

            {
              user === null && <IonButton className='mt-3 text-capitalize' expand='block' size='large' color={'warning'} type='submit'>
                <IonIcon icon={logIn} slot='end' />
                Submit
              </IonButton>
            }
          </form>


        </section>

      </IonContent>
    </IonPage>
  )
}

export default Home



interface FormDetails {
  name: string
  email: string
  voters_id: string
}

interface Action {
  payload: any,
  type: string
}

const SET_NAME = 'SET_NAME'
const SET_EMAIL = 'SET_EMAIL'
const SET_VOTERS_ID = 'SET_VOTERS_ID'
// const SET_NAME = 'SET_NAME'





function userReducer(state: FormDetails, { type, payload }: Action) {
  const newState = { ...state }
  switch (type) {
    case SET_NAME:
      newState.name = payload
      break;
    case SET_EMAIL:
      newState.email = payload
      break;
    case SET_VOTERS_ID:
      newState.voters_id = payload
      break;

    default:
      return newState
  }

  return newState
}



