import {
  IonButton,
  IonPopover,
  IonList,
  IonLabel,
  IonItem
} from '@ionic/react'
import React, { useState } from 'react'


/**
 * Lets the user to select the languages to perform 
 * the message translations.
 *
 * @param props - component properties
 *
 * @property originLanguage - contains the origin language in which the
 *           messages are written by the sender.
 * @property destinationLanguage - contains the destination language in which
 *           the messages are going to be seen by the recipient.
 * @property showOriginPopover - shows the languages list for the origin
 *           language.
 * @property showDestinationPopover - shows the languages list for the
 *           destination language.
 */
export const LanguageSelector: React.FC<{origin: any,
                                         destination: any,
                                         languages: Array<{name: string,
                                                           code: string}>}>
  = (props) => {
  const [originLanguage, setOriginLanguage] = useState('English')
  const [destinationLanguage, setDestinationLanguage] = useState('Spanish')
  const [showOriginPopover, setShowOriginPopover] = useState(false);
  const [showDestinationPopover, setShowDestinationPopover] = useState(false);

  /**
   * Performs a function call when the origin language is selected.
   *
   * @property language - selected language.
   */
  function changeOriginLanguage (language: string) {
      props.origin(language);
  }
  
  /**
   * Performs a function call when the destination language is selected.
   *
   * @property language - selected language.
   */
  function changeDestinationLanguage (language: string) {
      props.destination(language);
  }

  return (
    <>
      <IonPopover
        isOpen={showOriginPopover}
        onDidDismiss={e => setShowOriginPopover(false)}>
        Choose your origin language
        <IonList>
          {props.languages.map(
            function (language) {
              return (
                <IonItem key={language.code} button={true} onClick={() => {
                                                  setShowOriginPopover(false);
                                                  changeOriginLanguage(language.code);
                                                  setOriginLanguage(language.name)}
                }>
                  <IonLabel>
                    {language.name}
                  </IonLabel>
                </IonItem>
              )
            }
          )}
        </IonList>
      </IonPopover>

      <IonButton expand="full" onClick={() => setShowOriginPopover(true)}>{originLanguage}</IonButton>
      <IonPopover
        isOpen={showDestinationPopover}
        onDidDismiss={e => setShowDestinationPopover(false)}>
        Choose your destination language
        <IonList>
          {props.languages.map(
            function (language) {
              return (
                <IonItem key={language.code} button={true} onClick={() => {
                                                  setShowDestinationPopover(false);
                                                  changeDestinationLanguage(language.code);
                                                  setDestinationLanguage(language.name)}
                }>
                  <IonLabel>
                    {language.name}
                  </IonLabel>
                </IonItem>
              )
            }
          )}
        </IonList>
      </IonPopover>
      <IonButton expand="full" onClick={() => setShowDestinationPopover(true)}>{destinationLanguage}</IonButton>
    </> 
  )
}
