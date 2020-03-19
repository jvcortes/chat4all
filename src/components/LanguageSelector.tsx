import {
  IonButton,
  IonPopover,
  IonList,
  IonLabel,
  IonItem
} from '@ionic/react'
import React, { useState } from 'react'


export const LanguageSelector: React.FC<{origin: any,
                                         destination: any,
                                         languages: Array<{name: string,
                                                           code: string}>}>
  = (props) => {
  const [originLanguage, setOriginLanguage] = useState('English')
  const [destinationLanguage, setDestinationLanguage] = useState('Spanish')
  const [showOriginPopover, setShowOriginPopover] = useState(false);
  const [showDestinationPopover, setShowDestinationPopover] = useState(false);

  function changeOriginLanguage (language: string) {
      props.origin(language);
  }
  
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

      <IonButton onClick={() => setShowOriginPopover(true)}>{originLanguage}</IonButton>
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
      <IonButton onClick={() => setShowDestinationPopover(true)}>{destinationLanguage}</IonButton>
    </> 
  )
}
