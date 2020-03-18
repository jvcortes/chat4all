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
  IonPopover, 
  IonText
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
 
const Home: React.FC = (props) => {
  const [text2, setText2] = useState('');
  const ins: any[] = [{}];
  const [todos, setTodos] = useState(ins);
  const [showPopover, setShowPopover] = useState(false);
  const [showPopover2, setShowPopover2] = useState(false);
  const [langorig, setLano] = useState('en');
  const [langdes, setLandes] = useState('es');
  const [valOrig, setValo] = useState('English');
  const [valDest, setVald] = useState('Spanish');
  /*const sock = new WebSocket("ws://localhost:5002");
  sock.onmessage = function(event) {
    console.log(event);
    console.log(event.data);
    setTodos([...todos, event.data]);
 }*/

  //console.log(todos); 
  /*//*function tranReq(text2) {
    alert(text2);
  }*/
  
  const apikey ='trnsl.1.1.20200302T153100Z.ed576de6b9201294.01d9dbb5d5aaf34750c60694b203a0ecfdf0b5df';
  function todoChange(e: any) {
    setText2(e.target.value);
  }

  function requestTrans() {
    if (langorig !== "" && langdes !== "") {

    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + apikey + '&lang='+langorig+'-'+ langdes, {
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
  }
  function printMsg(item: any, indexv: any) {
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
  function transText(e: any) {
    console.log("aquí pase", text2)
    if (text2 === '') return
    //alert(text2)
    setTodos([...todos, {'user': 'here','text': text2}]);
    //e.reset();
    console.log(todos, text2);
    requestTrans();
    
    }
  
    const socket = useRef(new WebSocket("ws://localhost:5002"))

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
      {todos.map((item, indexv) => printMsg(item, indexv))}
      </IonList>
    </IonContent>
    <IonFooter>
      <IonItem>
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={e => setShowPopover(false)}
      >
          <p>Choose your Origin language</p>
          <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover(false); setLano('es'); setValo('Spanish');}}>Spanish</IonButton>
      </IonItem>

      <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover(false); setLano('en'); setValo('English');}}>English</IonButton>
      </IonItem>
      <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover(false); setLano('fr'); setValo('French');}}>French</IonButton>
      
      </IonItem>
      <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover(false); setLano('de'); setValo('German');}}>German</IonButton>
      </IonItem>
      <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover(false); setLano('pt'); setValo('Portuguese');}}>Portuguese</IonButton>
      </IonItem>
        
      </IonPopover>
      <IonPopover
        isOpen={showPopover2}
        onDidDismiss={e => setShowPopover2(false)}
      >
          <p>Choose your Origin language</p>
          <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover2(false); setLandes('es'); setVald('Spanish')}}>Spanish</IonButton>
      </IonItem>
      <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover2(false); setLandes('en'); setVald('English')}}>English</IonButton>
      </IonItem>
      <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover2(false); setLandes('fr'); setVald('French')}}>French</IonButton>
      
      </IonItem>
      <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover2(false); setLandes('de'); setVald('German')}}>German</IonButton>
      </IonItem>
      <IonItem>
      <IonButton slot="start" onClick={() => {setShowPopover2(false); setLandes('pt'); setVald('Portuguese')}}>Portuguese</IonButton>
      </IonItem>
        
      </IonPopover>
      <IonButton slot="start" onClick={() => setShowPopover(true)}>{valOrig}</IonButton>
      <IonButton slot="start" onClick={() => setShowPopover2(true)}>{valDest}</IonButton>
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
