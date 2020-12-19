/*eslint-disable*/
import React from 'react'
import styled from 'styled-components'

import { Frame, H, H1, P } from '../ui-kit/styled-templates'

let DocsPage = (props) => {
    return (
        <Wrapper>
            <H1>Demo</H1>
            <P>You can check <div onClick={() => {window.open(`https://tik-toe-toy-online-d475f.firebaseapp.com`)}} >Live Demo here</div>.</P>

            <P>All the commands to build, deploy push and commit are in `package.json`.</P>

            <P>
                This project is sette up with two main technologies:
                - [ReactJS](https://reactjs.org/)
                - [Firebase](https://firebase.google.com/)
            </P>

            <P>
                To work width dates we are using `moment-timezone` npm library.
                `styled-compontns` is a perfect tool to deal with CSS in react and change style dynamicly.
            </P>

            <H1>ReactJS + Firebase</H1>
            <P>
                First, this is a `npm` project, so you need to have several command line tools:
                - [`node` and `npm`](https://treehouse.github.io/installation-guides/mac/node-mac.html)
                - [`yarn`](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
                - [`create-react-app`](https://create-react-app.dev/docs/getting-started/)
                - [`firebase-tools`](https://firebase.google.com/docs/cli#macos)
            </P>

            <H1>How to run this project on local machine</H1>
            <P>
                First you need to download this repo. Then go to the filder with this project and install all dependencies with `yarn install`.
            </P>

            <H1>React</H1>
            <P>
                This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
            </P>

            <H1>Available Scripts</H1>
            <P>
                In the project directory, you can run:
            </P>

            <H1>yarn start</H1>
            <P>
                Runs the app in the development mode.
                Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
            </P>

            <P>
                The page will reload if you make edits.
                You will also see any lint errors in the console.
            </P>

            <H1>yarn build</H1>
            <P>
                Builds the app for production to the `build` folder.
                It correctly bundles React in production mode and optimizes the build for the best performance.

            </P>

            <P>
                The build is minified and the filenames include the hashes.
                Your app is ready to be deployed!
            </P>

            <H1>Learn More</H1>
            <P>
                You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
                To learn React, check out the [React documentation](https://reactjs.org/).
            </P>

            <H1>Time perfomers</H1>
            <P>
                This scripts are just useful tools to make whole process of developing and deploying faster.
            </P>

            <H1>yarn define</H1>
            <P>
                Disable all eslint warnings by adding esling-disable command at the beging and in the end of each JS file.
            </P>

            <H1>yarn deploy</H1>
            <P>
                Deploying `build` folder to the server.
            </P>

            <H1>yarn commit</H1>
            <P>
                Creating a commit with name in format DD.MM.YYYY🌿HH:mm and pushing it.
            </P>

            <H1>yarn produce</H1>
            <P>
                Compilation of `define` + `build` + `deploy` + `commit`.
            </P>

            <H1>Firebase</H1>
            <P>
                All firebase configs are in `src/constants/config.js`.

                To initialize firebase - you need to have a <Frame onClick={() => { window.open(`https://firebase.google.com/docs/cli#macos`) }} >firebase-tools</Frame>.
                We are using firebase hosting for this particular project.
            </P>

        </Wrapper>
    )
}

const Wrapper = styled(Frame)`
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
`;

export default DocsPage;
/*eslint-enable*/