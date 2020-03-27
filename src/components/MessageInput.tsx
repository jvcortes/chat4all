import { IonInput, IonButton, IonToolbar } from '@ionic/react'
import React, { useState } from 'react'

/**
 * Contains the message input.
 *
 * @param props - Component properties.
 * 
 * @property message - string containing the current message.
 *
 * @return Form containing a IonInput text field used to type the message
 * and a send button.
 */
export const MessageInput: React.FC<{onSend: any}> = (props) => {
  const [message, setMessage] = useState('')

  /**
   * Performs a function with the current message after the form is submitted.
   * After performing the function call, the message gets emptied.
   * 
   * @param e - event
   */
  function onFormSubmit(e: any) {
    e.preventDefault();
    props.onSend(message);
    setMessage('');
  }

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <IonToolbar>
          <IonInput type="text" placeholder="Introduce your message" 
            value={message}
            onIonChange={(e: any) => setMessage(e.target.value)} />

          <IonButton class="send-button" 
                     type="submit" slot="end" expand="full" size="small">>
          </IonButton>
        </IonToolbar>
      </form>
    </>
  )
}
