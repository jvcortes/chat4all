import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,  
  IonItem, 
  IonCheckbox,
  IonLabel,
  IonNote,
  IonBadge, 
  IonTextarea,
  IonFooter,
  IonAvatar,
  IonButton, 
  IonInput} from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
 
const Home: React.FC = () => {
  const [text2, setText2] = useState('');
  /*const [langorig, setLano] = useState('');
  const [langdes, setLandes] = useState('');
  *//*function tranReq(text2) {
    alert(text2);
  }*/
  const apikey ='trnsl.1.1.20200302T153100Z.ed576de6b9201294.01d9dbb5d5aaf34750c60694b203a0ecfdf0b5df';
  function transText() {
    alert(text2);
    //tranReq(text2);
    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + apikey + '&lang=en-es', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
      body: 'text='+text2  
    }).then((response) => response.json()).then((JSONresp) => {
      console.log(JSONresp);
    }).catch((e) => {
      console.log(e);
    });
  }
  
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
    
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      
    </IonContent>
    <IonFooter>
      <IonItem> 
        <IonToolbar>
​       <IonTextarea placeholder="message" onIonChange={(e: any) => setText2(e.target.value)}></IonTextarea>
      <IonButton slot="end" onClick={ transText }>Send</IonButton>
      </IonToolbar>
      </IonItem>
    </IonFooter>
 
  </IonPage>
  );
};

export default Home;
