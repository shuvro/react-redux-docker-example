<p align="center"><a href="https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f"><img src="https://i.imgur.com/PATsTx2.png" title="View tutorial" alt="React, React Router, Redux and Redux Thunk" width="900"></a></p>

* Tutorial: [Getting started with create-react-app, Redux, React Router & Redux Thunk](https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f)
* [Demo](https://create-react-app-redux.now.sh) 🙌
#
## Installation

```bash
git clone https://github.com/artsmorgan/KYC_Cathay.git
cd KYC_Cathay
yarn
```
#
## Get started / Development

```bash
yarn start
```
#
## For Production
First we need to build the project. Then serve with any production process manager like: forver or pm2.
##
Serve with `forever`. Prerequisite library [serve](https://www.npmjs.com/package/serve) and [forever](https://www.npmjs.com/package/forever)

```bash
yarn build
forever start -c "serve -s" ./build
# to specefy port
forever start -c "serve -s -l 5500" ./build
```
The application should run `5000` port or specefied port.

#
This boilerplate is built using [create-react-app](https://github.com/facebook/create-react-app) so you will want to read the User Guide for more goodies.
