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
import './Home.css';
 
const Home: React.FC = (props) => {
  const [text2, setText2] = useState('');
  const ins: any[] = [];
  const [todos, setTodos] = useState(ins);
  const [showPopover, setShowPopover] = useState(false);
  /*const sock = new WebSocket("ws://localhost:5002");
  sock.onmessage = function(event) {
    console.log(event);
    console.log(event.data);
    setTodos([...todos, event.data]);
 }*/

  //console.log(todos); 
  //const [langorig, setLano] = useState('');
  /*const [langdes, setLandes] = useState('');
  *//*function tranReq(text2) {
    alert(text2);
  }*/
  
  const apikey ='trnsl.1.1.20200302T153100Z.ed576de6b9201294.01d9dbb5d5aaf34750c60694b203a0ecfdf0b5df';
  function todoChange(e: any) {
    setText2(e.target.value);
  }

  function requestTrans() {
    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + apikey + '&lang=en-es', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
      body: 'text='+text2  
    }).then((response) => response.json()).then((JSONresp) => {
      console.log(JSONresp.text);
      socket.current.send(JSONresp.text);
      /*if (sock.readyState == 1) {
        sock.send(JSONresp.text);
      }*/
    }).catch((e) => {
      console.log(e);
    });
  }
  function transText(e: any) {
    console.log("aquí pase", text2)
    if (text2 === '') return
    //alert(text2)
    setTodos([...todos, text2]);
    //e.reset();
    console.log(todos, text2);
    requestTrans();
    
    }
  
    const socket = useRef(new WebSocket("ws://localhost:5002"))

    useEffect(() => {
      socket.current.onmessage = (msg) => {
        console.log(msg);
        const incomingMessage = `Message from WebSocket: ${msg.data}`;
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
