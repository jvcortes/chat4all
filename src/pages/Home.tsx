import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,  
  IonItem, 
  IonLabel,
  IonNote,
  IonBadge, 
  IonTextarea,
  IonFooter,
  IonAvatar,
  IonButton,
  IonInput,
  IonList,
  IonPopover 
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import { TranslationService } from '../services/translation'

import './Home.css';

const Home: React.FC = (props) => {
  const [message, setMessage] = useState('');
  const ins: any[] = [];
  const [todos, setTodos] = useState(ins);
  const [showPopover, setShowPopover] = useState(false);
  const apikey ='trnsl.1.1.20200302T153100Z.ed576de6b9201294.01d9dbb5d5aaf34750c60694b203a0ecfdf0b5df';
  const translationService = new TranslationService(apikey)
  const socket = useRef(new WebSocket("ws://localhost:5002"))

  function todoChange(e: any) {
    setMessage(e.target.value);
  }

  function transText(e: any) {
    console.log("aquí pase", message)
    if (message === '') return
      console.log(todos, message);
      translationService.translate(message, 'en', 'es')
        .then(function (val) {
          console.log(val);
          socket.current.send(val);
          setTodos([...todos, val]);
        });
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
          <IonPopover
            isOpen={showPopover}
            onDidDismiss={e => setShowPopover(false)}
          >
            <p>Choose your Origin language</p>
            <IonItem>
              <IonButton slot="start" onClick={() => setShowPopover(true)}>English</IonButton>
            </IonItem>
            <IonItem>
              <IonButton slot="start">French</IonButton>

            </IonItem>

          </IonPopover>
          <IonButton slot="start" onClick={() => setShowPopover(true)}>Origin</IonButton>
          <IonButton slot="start">Destination</IonButton>
        </IonItem>
        <IonItem> 
          <IonToolbar>
            <IonTextarea placeholder="message" onIonChange={ todoChange }></IonTextarea>
            <IonButton slot="end" onClick={ transText }>Send</IonButton>
          </IonToolbar>
        </IonItem>
      </IonFooter>

    </IonPage>
  );
};

export default Home;
