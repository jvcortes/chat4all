<p>
<img width="90" height="90" src="https://github.com/jvcortes/chat4all/blob/master/public/assets/icon/icon.png?raw=true" align="right">
</p>


# Chat4all MVP Project

<iframe width="560" height="315" src="https://www.youtube.com/embed/aVEEisPb1O4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Chat4all is a chat to speak in your native language with people with different languages.

This is an MVP for a social network for this reason the main idea is showing how the translate is working in real time.

## Websocket server

We use a websocket server to create the communication between our demo users, for this reason if you want to try all the solution, first you should run this server.

Go to socketserver directory and type:

```bash

node index.js

```

## How to Run Chat4all
To use the apk you can download directly in your android cellphones. if you want to run this in web browser, you should already installed node js and you should install all dependencies that we have in package.json

Browser mode:

```bash
npm install
```
after that you can type Ionic (if you haven't installed, please do it)

```bash
ionic serve

```

For APK:

This apk is going to be working until April 1.

Domwload in your cellphone and click yes in all permissions questions.

#Django for contact list
We create API's to create a contact list in django, this is for the next step of this project. 

install requirements first:

```bash

pip3 install -r requirements.txt

```

Run server on port 8000(default port)

```bash

python3 manage.py runserver

```

and you will see our enpoints.

```bash

/users/

/users/<id>/contacts/

```



## Authors
[Javier Feo](https://github.com/jvcortes)
[Paulo Morillo](https://github.com/PauloMorillo)

## License
[MIT](https://choosealicense.com/licenses/mit/)