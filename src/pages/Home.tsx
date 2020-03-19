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

const Home: React.FC = (props) => {
  const ins: any[] = [{}];
  const [todos, setTodos] = useState(ins);
  const [originLanguage, setOriginLanguage] = useState('en');
  const [destinationLanguage, setDestinationLanguage] = useState('es');
  const apikey ='trnsl.1.1.20200302T153100Z.ed576de6b9201294.01d9dbb5d5aaf34750c60694b203a0ecfdf0b5df';
  const translationService = new TranslationService(apikey)
  const socket = useRef(new WebSocket("ws://35.237.10.249"))
  const languages = [
    {'name' : 'Spanish', 'code': 'es'},
    {'name' : 'English', 'code': 'en'},
    {'name' : 'French', 'code': 'fr'},
    {'name' : 'Portuguese', 'code': 'pt'},
    {'name' : 'German', 'code': 'de'},
    {'name' : 'Italian', 'code': 'it'},
    {'name' : 'Russian', 'code': 'ru'}
  ]

  function handleOriginLanguage (language: string) {
    setOriginLanguage(language);
  }

  function handleDestinationLanguage (language: string) {
    setDestinationLanguage(language)
  }

  function sendMessage(message: string) {
    if (message === '') return
      translationService.translate(message, originLanguage, destinationLanguage)
    .then(function (val) {
      socket.current.send(val);
      setTodos([...todos, {'user': 'here', 'text': message}]);
    });
  }

  function printMessage(item: any, indexv: any) {
    if (item.user) {
      if (item.user === "remote") {
        return (
          <IonItem key={indexv}>
            <IonText slot="start">{item.text} </IonText>
          </IonItem>

        )

      } else {
        return (
          <IonItem key={indexv}>
            <IonText color="secondary" slot="end">{item.text}</IonText>
          </IonItem>
        )
      }
    }
  }

  useEffect(() => {
    socket.current.onmessage = (msg) => {
      console.log(msg);
      const incomingMessage = msg.data;
      setTodos([...todos, {'user': 'remote', 'text': incomingMessage}]);
    }
  });
  useEffect(() => () => socket.current.close(), [socket])

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonAvatar>
              <img src="../../../public/assets/icon/icon.png" />
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
            {todos.map((item, indexv) => printMessage(item, indexv))}
          </IonList>
        </IonContent>
      <IonFooter>
        <IonItem>
          <LanguageSelector
            origin={handleOriginLanguage}
            destination={handleDestinationLanguage}
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
