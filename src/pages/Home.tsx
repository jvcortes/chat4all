import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,  
  IonItem, 
  IonLabel,
  IonNote,
  IonBadge, 
  IonFooter,
  IonAvatar,
  IonText,
  IonList
} from '@ionic/react';

import React, { useState, useEffect, useRef } from 'react';
import { LanguageSelector } from '../components/LanguageSelector'
import { MessageInput } from '../components/MessageInput'
import { TranslationService } from '../services/translation'

import './Home.css';


/**
 * Home page.
 *
 * Displays the home page, which contains the chat feature, composed of:
 * - Header with title
 * - Message list
 * - Language selector
 * - Message input

 * @param props - Component properties.
 *
 * @property messages - contains the displayed messages
 * @property originLanguage - contains the origin language in which the
 *           messages are written by the sender.
 * @property destinationLanguage - contains the destination language in which
 *           the messages are going to be seen by the recipient.
 * @property apikey - API key for the translation API, used by the component's
 *           translation service.
 * @property translationService - component's translation service.
 * @property socket - connection to the WebSocket server used to receive and
 *           dispatch the messages.
 * @property languages - language list, used by the language selector.
 *
 * @see TranslationService, MessageInput, LanguageSelector
 *
 * @return - the home component.
 */
const Home: React.FC = (props : any) => {
  const [messages, setMessages] = useState([{}]);
  const [originLanguage, setOriginLanguage] = useState('en');
  const [destinationLanguage, setDestinationLanguage] = useState('es');

  const apikey ='trnsl.1.1.20200302T153100Z.ed576de6b9201294.01d9dbb5d5aaf34750c60694b203a0ecfdf0b5df';
  const translationService = new TranslationService(apikey);
  const socket = useRef(new WebSocket("wss://web-02.jvcortes.tech"));
  const languages = [
    {'name' : 'Spanish', 'code': 'es'},
    {'name' : 'English', 'code': 'en'},
    {'name' : 'French', 'code': 'fr'},
    {'name' : 'Portuguese', 'code': 'pt'},
    {'name' : 'German', 'code': 'de'},
    {'name' : 'Italian', 'code': 'it'},
    {'name' : 'Russian', 'code': 'ru'}
  ]

  /**
   * Sends a message to a recipient.
   * 
   * @param message - message to send
   */
  function sendMessage(message: string) {
    if (message === '') {
      return;
    }

    translationService.translate(
      message,
      originLanguage,
      destinationLanguage
    ).then(
    function (val) {
      socket.current.send(val);
      setMessages([...messages, {'user': 'here', 'text': message}]);
    });
  }

  /**
   * Prints a message inside an IonItem component.
   *
   * @param message - message to print.
   * @param index - index, used in case of printing the message inside a list
   */
  function printMessage(message: any, index?: any) {
    if (message.user) {
      if (message.user === "remote") {
        return (
          <IonItem {...(index ? {key: index} : {})}>
            <IonText slot="start">{message.text} </IonText>
          </IonItem>

        )

      } else {
        return (
          <IonItem {...(index ? {key: index} : {})}>
            <IonText color="secondary" slot="end">{message.text}</IonText>
          </IonItem>
        )
      }
    }
  }

  useEffect(() => {
    socket.current.onmessage = (msg) => {
      console.log(msg);
      const incomingMessage = msg.data;
      setMessages([...messages, {'user': 'remote', 'text': incomingMessage}]);
    }
  });
  useEffect(() => () => socket.current.close(), [socket])

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonAvatar>
              <img src="https://github.com/jvcortes/chat4all/blob/master/public/assets/icon/icon.png?raw=true" />
            </IonAvatar>
            <IonLabel>
              <h1>Chat4ALL</h1>
              <IonNote>online</IonNote>
            </IonLabel>
            <IonBadge color="success" slot="end">
              1 min
            </IonBadge>
          </IonItem>
        </IonToolbar>
      </IonHeader>
        <IonContent>
          <IonList>
            {messages.map((item, indexv) => printMessage(item, indexv))}
          </IonList>
        </IonContent>
      <IonFooter>
        <IonItem>
          <LanguageSelector
            origin={setOriginLanguage}
            destination={setDestinationLanguage}
            languages={languages}
          />
        </IonItem>
        <IonToolbar>
          <MessageInput onSend={sendMessage} />
        </IonToolbar>
      </IonFooter>

      </IonPage>
  );
};

export default Home;
