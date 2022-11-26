<img src="./readme/title1.svg"/>

<div align="center">

> Hello world! This is the project’s summary that describes the project plain and simple, limited to the space available.

**[PROJECT PHILOSOPHY](https://github.com/YasserShkeir/Fallah/#user-content-#-project-philosophy) • [WIREFRAMES](https://github.com/YasserShkeir/Fallah/#user-content-#-wireframes) • [TECH STACK](https://github.com/YasserShkeir/Fallah/#user-content-#-tech-stack) • [IMPLEMENTATION](https://github.com/YasserShkeir/Fallah/#user-content-#-implementation) • [HOW TO RUN?](https://github.com/YasserShkeir/Fallah/#user-content-#-how-to-run)**

</div>

<br><br>

![](#-project-philosophy)
<img src="./readme/title2.svg" id="#-project-philosophy" />

> Fallah is a mobile app made to assist Farmers in selling their produce more efficiently and with minimal loss/ food waste. Fallah was designed to be user friendly for Farmers; just snap a pic and add the details of your harvest, and you're good to go!
>
> On the other hand, shop owners. Shop owners have to physically purchase all their products, this means waking up at dawn everyday and lets face it, everyone likes sleep. Back to Fallah, shop owners will access all the products that the Farmers have uploaded, and will be able to order two types of orders, Regular Order or Scheduled Order.

### User Stories

- As a Farmer, I want to move away from my dependency on bigger corporations.
- As a Farmer, I want to move away from my dependency on bigger corporations.
- As a Shop Owner, I want access to an easier way of purchasing products.
- As a Shop Owner, I want to buy products at a cheaper price.

<br><br>

![](#-wireframes)
<img src="./readme/title3.svg" id="#-wireframes" />

> This design was planned before on paper, then moved to Figma app for the fine details.
> Note that i didn't use any styling library or theme, all from scratch and using pure css modules

| Desktop Visitor Landing                        | Mobile Sign In Page                                |
| ---------------------------------------------- | -------------------------------------------------- |
| ![Desktop](./readme/demo/ProtoTypeVisitor.png) | ![Mobile](./readme/demo/ProtoTypeMobileSignin.png) |

<br><br>

![](#-tech-stack)
<img src="./readme/title4.svg" id="#-tech-stack" />

Here's a brief high-level overview of the tech stack the Well app uses:

- This project uses [NodeJS](https://nodejs.org/en/) and [ExpressJS](https://expressjs.com/). Node.js is an open-source, cross-platform JavaScript runtime environment, and express is a fast, unopinionated, minimalist web framework for Node.js.
- For the database, [MongoDB](https://www.mongodb.com/) was used as it allows the app to run smoothly and efficiently, in addition to being able to create custom interactive Data charts for user insights.
- For the design, [ReactJS](https://reactjs.org/) and [React Native](https://reactnative.dev/) were used.
- The app uses the font ["Inter"](https://fonts.google.com/specimen/Inter?query=inter) as its main font, and the design of the app adheres to the material design guidelines.

<br><br>

![](#-implementation)
<img src="./readme/title5.svg" id="#-implementation" />

> Using the above mentioned tech stacks and the wireframes built with figma from the user stories we have, the implementation of the app is shown as below, these are screenshots from the real app

### Visitor

| Visitor Desktop Landing                                      | Visitor Mobile Landing                                     |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| ![Visitor Desktop Landing](./readme/demo/DesktopVisitor.png) | ![Visitor Mobile Landing](./readme/demo/MobileVisitor.png) |

### Admin

| Admin Desktop Landing Dashboard                            | Admin Desktop Users Control Section                  |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| ![Admin Desktop Landing](./readme/demo/AdminDashboard.png) | ![Admin Desktop Users](./readme/demo/AdminUsers.png) |

### User

| User Sign In and Sign Up Page            |
| ---------------------------------------- |
| ![Auth](./readme/demo/VisitorSignIn.png) |

### Buyer

| Landing Page                        | Farmer Profile                     | Adding Item to Order                |
| ----------------------------------- | ---------------------------------- | ----------------------------------- |
| ![](./readme/demo/BuyerLanding.gif) | ![](./readme/demo/BuyerFarmer.gif) | ![](./readme/demo/BuyerAddItem.gif) |

### Farmer

| Buyer Landing Page                               | Mobile Sign In Page                                |
| ------------------------------------------------ | -------------------------------------------------- |
| ![Buyer Landing](./readme/demo/BuyerLanding.gif) | ![Mobile Landing](./readme/demo/VisitorSignIn.png) |

<br><br>

![](#-how-to-run)
<img src="./readme/title6.svg" id="#-how-to-run" />

> To get a local copy up and running follow these simple example steps.

### Installation

Before starting with the steps below, make sure `npm` and `node` are installed globally on your machine.

1. Clone the repo
   ```
   git clone https://github.com/YasserShkeir/Fallah.git
   ```
2. Install NPM packages
   ```
   npm install
   ```
3. Running the app

<b>Backend Setup: </b>

- The Database is managed by mongoDB atlas online, and the Database URL is stored in the .env file, no need to change this URL unless you want to use your own database, but make sure to cleanup the assets folder if you do so.
- To run twilio and receive WhatsApp notifications, you will need to send the message 'join living-cabin' to the number +1 415 523 8886, and then you will be able to receive notifications from that number if you are setup as a buyer, and the farmer you're following has uploaded a new product.
- To start Node, go to ./fallah-backend and run ``` nodemon . ```, the server will start at the localhost:3000 port.

<b>Frontend Setup: </b>

React JS:
- To start React, go to ./fallah-frontend/React JS Folder and run ``` npm start ```, and react will start at the localhost:3001 port.

React Native:
- Before starting React Native, and to avoid any conflict with the emulator, make sure to get your local IP and add it to the .env file. (example: LOCALIP=http://192.168.1.1:3000)
- To start React Native, go to ./fallah-frontend/React Native Folder and run ``` expo start --clear ```, and react native will start at the localhost:19000 port.
- Launching the emulator can now be done from the expo app, or from the terminal using ``` expo start --android ``` or ``` expo start --ios ```
