# mc714-1s2016-lista3
Socket.io based chat server and clients, implemented in NodeJS for the Distributed Systems course (MC714 1s2016) with Prof. Leandro Villas.

Inspired in the [Example Chat Application](http://chat.socket.io) from the [Socket.io Official Documentation](http://socket.io/get-started/chat/).

Checkout the [Sample Chat Server (hosted in Heroku)](https://radiant-river-70847.herokuapp.com/api)

**Features**:
- Fully features single room chat application, based on a master Server and several slave Clients.
- Online/offline and Typing real time updates
- Multiple users in multiple windows easier testing

**Core Technologies**:
- [Server](https://github.com/luiseduardobrito/mc714-1s2016-lista3/tree/master/server): NodeJS, Express and Socket.io
- [Client](https://github.com/luiseduardobrito/mc714-1s2016-lista3/tree/master/client): Electron, Socket.io and AngularJS
- [Landing](https://github.com/luiseduardobrito/mc714-1s2016-lista3/tree/master/landing): NodeJS, Bootstrap and jQuery

**Chat Specs**:
- Real-time bidirectional event-based communication based on [Socket.io](https://github.com/socketio/socket.io)
- WebSockets implementation backed by [Engine.io](https://github.com/socketio/engine.io)
- Fallbacks to: ```flashsocket```, ```htmlfile```,  ```xhr-polling```, ```jsonp-polling```

#### Screenshots
Sample binaries running on Mac OSX and Windows 10:

<img src="landing/img/screen.png" alt="Screenshot at OSX" width="50%"/>
<img src="landing/img/screen-win.png" alt="Screenshot at Windows" width="50%"/>

### Download Sample Binaries
You can test the chat application using the precompiled binaries. They all point to the [Sample Server hosted in Heroku](https://radiant-river-70847.herokuapp.com/api). To connect to your own server instance you'll need to build from the source. It's in the roadmap a simple command line script to make all the hard work for you.

- [Package for OSX (.dmg)](https://github.com/luiseduardobrito/mc714-1s2016-lista3/blob/master/build/SampleChat.dmg?raw=true)
- [Portable Package for Windows (.exe)](https://github.com/luiseduardobrito/mc714-1s2016-lista3/blob/master/build/SampleChat.exe?raw=true)

Portable Executable for Windows (.exe) is coming soon.

### Special Thanks

Desktop app client UI by David ([@retyui](https://twitter.com/retyui))

- [Scripts hosted on Codepen](http://codepen.io/retyui/pen/zxGqPJ)

Adorable Avatars by Adorable.io ([@adorableio](https://twitter.com/adorableio))

- [Homepage](http://avatars.adorable.io/)
- [Repository on GitHub](https://github.com/adorableio/adorable-avatars)
- [License (MIT)](https://raw.githubusercontent.com/adorableio/adorable-avatars/master/LICENSE)

Start Bootstrap Landing Page by [Blackrock Digital](http://blackrockdigital.io/)

- [Homepage](http://startbootstrap.com/template-overviews/landing-page/)
- [Repository on GitHub](https://github.com/BlackrockDigital/startbootstrap-landing-page)
- [License (MIT)](https://github.com/BlackrockDigital/startbootstrap/blob/gh-pages/LICENSE)

App Icon: Hipchat / Flat OSX Icons by drslash

- [Repository on GitHub](https://github.com/dr-slash/icons-flat-osx)

### Author
- Luis Eduardo Brito (RA138760) <[luis.brito@students.ic.unicamp.br](mailto:luis.brito@students.ic.unicamp.br)>

### License

This project is fully open, backed by the MIT License. For further information, checkout de [full license text](./LICENSE).
