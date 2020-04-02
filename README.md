<p>
<img width="90" height="90" src="https://github.com/jvcortes/chat4all/blob/master/public/assets/icon/icon.png?raw=true" align="right">
</p>


# Chat4All


[![See our example](https://img.youtube.com/vi/aVEEisPb1O4/0.jpg)](https://www.youtube.com/watch?v=aVEEisPb1O4)

Chat4All is a text-messaging application where you can talk in your native language with people with different languages, through automatic translations.

This is an MVP for for this reason the main idea is showing how the translate is working in real time.

## WebSocket server

Requires `nodejs`, version 12 or higher

The app uses a WebSocket server to create the communication between the demo users, for this reason if you want to try all the solution,
first you should run this server.

Go to `socketserver` directory and type:

```bash

node index.js

```

## Text-messaging application


The APK file can be installed directly on yout Android phone:
[Chat4All_MVP](https://github.com/jvcortes/chat4all/raw/master/app-debug.apk)

To run the app in you web browser, it requires:

* `nodejs`, version 12 or newer
* Ionic Framework, version 5 or newer.

Inside the project directory, run `npm install` and afterwards `ionic serve` a new
tab in your default browser showing the application should be displayed automatically.


## REST API (pending for implementation)
The REST API offers the possibility to create, read, update and delete users and their respective contacts.

Endpoints:

* `/users/`
* `/users/<user-id>/contacts/`

Requirements

* Python 3.7 or higher with PIP
* Django 3.0 or higher
* Django REST Framework 3.11
* DRF nested routers 0.91

Inside the `chat4all` directory, install the project requirements with:

```bash
pip3 install -r requirements.txt

```

Inside `chat4all/api` run:
```bash

python3 manage.py runserver

```


## Authors
[Javier Feo](https://github.com/jvcortes)</br>
[Paulo Morillo](https://github.com/PauloMorillo)

## License
[MIT](https://choosealicense.com/licenses/mit/)
