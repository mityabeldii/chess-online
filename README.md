### Demo
You can check [Live Demo here](https://tik-toe-toy-online-d475f.firebaseapp.com).

All the commands to build, deploy push and commit are in `package.json`.

This project is sette up with two main technologies:
 - [ReactJS](https://reactjs.org/)
 - [Firebase](https://firebase.google.com/)
 
 To work width dates we are using `moment-timezone` npm library.
 `styled-compontns` is a perfect tool to deal with CSS in react and change style dynamicly.

# ReactJS + Firebase

First, this is a `npm` project, so you need to have several command line tools:
 - [`node` and `npm`](https://treehouse.github.io/installation-guides/mac/node-mac.html)
 - [`yarn`](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
 - [`create-react-app`](https://create-react-app.dev/docs/getting-started/)
 - [`firebase-tools`](https://firebase.google.com/docs/cli#macos)


## React
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Time perfomers

This scripts are just useful tools to make whole process of developing and deploying faster.

### `yarn define`

Disable all eslint warnings by adding esling-disable command at the beging and in the end of each JS file.

### `yarn deploy`

Deploying `build` folder to the server.

### `yarn commit`

Creating a commit with name in format DD.MM.YYYY🌿HH:mm and pushing it.

### `yarn produce`

Compilation of `define` + `build` + `deploy` + `commit`.

## Firebase
All firebase configs are in `src/constants/config.js`.

To initialize firebase - you need to have a [`firebase-tools`](https://firebase.google.com/docs/cli#macos).
We are using firebase hosting for this particular project.
