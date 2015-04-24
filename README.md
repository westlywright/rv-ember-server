## Node Ember Server
This is a simple HapiJS server that we use running infront of a single page Ember app. Its purpose is to setup the Api Token and Secret Key needed to communicate with the Recruiting Ventures API. The only route is to `index.html` and the route returns the `authToken` and `apiKey` in cookie form.

## Local Config
An example local config is included. Just remove the `.example`. This file is meant to contain the secret you'll use to hash the `apiToken`, but it includes various other variables that coule change should you see fit.

## Install
`npm install rv-ember-server --save`

## Run
`rv-serve`
