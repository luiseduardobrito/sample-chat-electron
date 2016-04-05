sample-chat-electron
====================

Socket.io based chat server and clients, implemented in NodeJS for the Distributed Systems Course (MC714 1s2016), [Prof. Leandro Villas](http://wwww.ic.unicamp.br/~leandro) in the [Institute of Computing, UNICAMP](http://ic.unicamp.br/en).


## Technical Specification

### Dependencies

The project is based on JavaScript technologies, built under the V8 interpreter, both for the Server and the Client.


**Main Server**

The Server is in plain NodeJS, a single file located at ```server/index.js```. It bootstraps a [SocketJS Server](http://socket.io), integrated to a simple [ExpressJS HTTP Server](http://expressjs.org). This abstraction provides a simple yet powerful Observer Pattern (Publisher/Subscriber) to pass data between different clients. All data is **emitted** into a room labeled with an **event namespace**, this later is the key to the Subscribing method at Socket.io. The platform has also out-of-the-box fallback modes: ```flashsocket```, ```htmlfile```,  ```xhr-polling```, ```jsonp-polling```.

At this time, because this project has educational purposes, there's only one single global room, where all the users chat at the same time. To handle multiple rooms right now, you may need to run several servers. Although they are very small and lightweight, this may not be the best approach, manly because there's a lot of possible point of failures that were not impelemented to handle things distributively. There a planned update in the [Roadmap](../README.md) to fix all this issues using a Redis cache for the user credentials and Socket events.


**Electron Client**

The Client is based on the [Electron](http://electron.atom.io) platform, by [GitHub](https://github.com), that powers its advanced file editor [Atom](https://atom.io). It's basically a hybrid platform to create Desktop Apps with full Desktop integration with all the major platforms, that renders HTML using the [Chromium's WebKit](http://chromium.org). That enables it to, from the same HTML, CSS and JS project, distribute it to Windows, Mac and Linux.

All of the resources used in the client are open source, and openly available at the Web. Unfortunately, the main goal here it to explain what's going on in the sockets, so for further information about the UI, Icons and other resources used in the client refer to the [Readme](../README.md) of the project.



## Socket Events Reference

### Events sent by the Client

#### user.login
Authenticates an user in the chat room. If the user is new, only the ```name``` is required. To authenticates as an existing user, you may pass along the id provided in the first login response.

**Acknowledgement**: ```{ name, id }```

Example for a new user authentication:
```json
{
  "name": "John Doe"
}
```

Example for an existing user authentication:
```json
{
  "id": "",
  "name": "John Doe"
}
```


#### user.typing
Sets the user typing state, ```true``` if is currently typing, ```false``` if not.

**Acknowledgement**: ```{ typing }```

Example for a user that is typing:
```json
{
  "typing": true
}
```


### Events sent by the Server


#### user.joined
Sent whenever a new user join the chat room.

**Acknowledgement**: None

Example for a new user named John:
```json
{
  "user": {
    "id": "Hc8yVZujX9YRWAYzK45NgSDh",
    "name": "John Doe"
  },
  "users": ["..."],
  "messages": ["..."]
}
```


#### user.left
Sent whenever an existing user leaves the chat room.

**Acknowledgement**: None

Example for an existing user named John:
```json
{
  "user": {
    "id": "Hc8yVZujX9YRWAYzK45NgSDh",
    "name": "John Doe"
  },
  "users": ["..."],
  "messages": ["..."]
}
```


#### user.typing
Sent whenever an existing user changes its *typing* state.

**Acknowledgement**: None

Example for a new user named John:
```json
{
  "user": {
    "id": "Hc8yVZujX9YRWAYzK45NgSDh",
    "name": "John Doe"
  },
  "typing": true
}
```


#### message.received
Sent whenever an existing user sends a message to the chat room.

**Acknowledgement**: None

Example for an existing user named John saying "hey folks!":
```json
{
  "user": {
    "id": "Hc8yVZujX9YRWAYzK45NgSDh",
    "name": "John Doe"
  },
  "message": {
    "id": "M2UPjzqMZhqVXnJjZZ39NCwy",
    "body": "hey folks!",
    "timestamp": 1459823556686
  }
}
```


### Events sent by System

#### connect
Sent whenever the user is connected to the Socket.io server, not necessarily to the chat room itself.

#### disconnect
Sent whenever the user is disconnected to the Socket.io server.



For further information about the Socket.io System events, refer to the [official docs](http://socket.io/docs/client-api/#manager(url:string,-opts:object)).
