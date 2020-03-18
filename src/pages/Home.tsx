import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,  
  IonItem, 
  IonLabel,
  IonNote,
  IonBadge, 
  IonFooter,
  IonAvatar,
  IonList
} from '@ionic/react';

import React, { useState, useEffect, useRef } from 'react';
import { LanguageSelector } from '../components/LanguageSelector'
import { MessageInput } from '../components/MessageInput'
import { TranslationService } from '../services/translation'

import './Home.css';

const Home: React.FC = (props) => {
  const ins: any[] = [];
  const [todos, setTodos] = useState(ins);
  const [originLanguage, setOriginLanguage] = useState('');
  const [destinationLanguage, setDestinationLanguage] = useState('');
  const apikey ='trnsl.1.1.20200302T153100Z.ed576de6b9201294.01d9dbb5d5aaf34750c60694b203a0ecfdf0b5df';
  const translationService = new TranslationService(apikey)
  const socket = useRef(new WebSocket("ws://localhost:5002"))
  const languages = [
    {'name' : 'Spanish', 'code': 'es'},
    {'name' : 'English', 'code': 'en'},
    {'name' : 'French', 'code': 'fr'},
    {'name' : 'Portuguese', 'code': 'pt'},
    {'name' : 'German', 'code': 'de'},
    {'name' : 'Italian', 'code': 'it'},
    {'name' : 'Russian', 'code': 'ru'}
  ]

  // function todoChange(e: any) {
    // setMessage(e.target.value);
  // }

  function sendMessage(message: string) {
    if (message === '') return
      console.log(todos, message);
      translationService.translate(message, originLanguage, destinationLanguage)
        .then(function (val) {
          console.log(val);
          socket.current.send(val);
          setTodos([...todos, message]);
        });
  }

  function handleOriginLanguage (language: string) {
    setOriginLanguage(language);
  }

  function handleDestinationLanguage (language: string) {
    setDestinationLanguage(language)
  }

  useEffect(() => {
    socket.current.onmessage = (msg) => {
      console.log(msg);
      const incomingMessage = `${msg.data}`;
      setTodos([...todos, incomingMessage]);
    }
  });
  useEffect(() => () => socket.current.close(), [socket])

  return (

    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Chat4all</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonAvatar>
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
          </IonAvatar>
          <IonLabel>
            <h1>Javier Cortés</h1>
            <IonNote>online</IonNote>
          </IonLabel>
          <IonBadge color="success" slot="end">
            1 min
          </IonBadge>
        </IonItem>
        <IonList>
          {todos.map((item, indexv) =>(
            <IonItem key={indexv}>
              <IonLabel>{item}</IonLabel>
            </IonItem>

          ))}
        </IonList>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

      </IonContent>
      <IonFooter>
        <IonItem>
          <LanguageSelector
            origin={handleOriginLanguage}
            destination={handleDestinationLanguage}
            languages={languages}
          />
        </IonItem>
        <IonItem> 
          <IonToolbar>
            <MessageInput onSend={sendMessage} />
          </IonToolbar>
        </IonItem>
      </IonFooter>

    </IonPage>
  );
};

export default Home;
