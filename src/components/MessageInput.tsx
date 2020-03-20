import { IonInput, IonButton, IonToolbar } from '@ionic/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons' 
import React, { useState } from 'react'


export const MessageInput: React.FC<{onSend: any}> = (props) => {
  const [message, setMessage] = useState('')

  function send () {
    props.onSend(message);
    setMessage('');
  }

  function onFormSubmit(e: any) {
    e.preventDefault();
    send();
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <IonToolbar>
          <IonInput type="text" placeholder="Introduce your message" 
            value={message}
            onIonChange={(e: any) => setMessage(e.target.value)} />

          <IonButton class="send-button" 
                     type="submit" slot="end" expand="full" size="small">
            <FontAwesomeIcon icon={faLongArrowAltRight} />
          </IonButton>
        </IonToolbar>
      </form>
    </>
  )
}
