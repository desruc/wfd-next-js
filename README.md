<h1 align="center">wfd-next-js</h1>
<p align="center">The frontend for WFD! A Next.js app written in TypeScript.</p>

<h3 align="center">
  <a href="https://github.com/desruc/wfd-api">View api</a>
</h3>

## First things first! 🚨

This is a work in progress! As you can see there is only a `develop` branch... I will remove this disclaimer and create a `master` branch when the first iteration is ready.

## What is wfd? 🍳

wfd is a recipe sharing platform!

## Features ⚡️

- 💙 **TypeScript**
- ⚛️ **Next.js** - Server-side React goodness
- ☄️ **Material-UI** - Custom design system
- ✔️ **Tests** - Jest is all set up and ready to go!
- 😻 **Linting** - Eslint configured with the AirBnb standard and TypeScript packages
- 💻 **VS Code ready** - Predefined config. Auto format on save etc.
- 🐶 **Husky** - Ensures lint and format before commits

## Setting up development 🛠️

- Clone this repo
- run `yarn install` in the root directory
- create an `.env` file from the supplied `.env.example` and fill in the details
- ensure a local version of the API is running
- run `yarn dev` to start the web app

## Hot tips 🔥

- `./src` has been mapped to `~` for cleaner imports

## Commands 🤖

- `yarn dev` - Start development mode
- `yarn build` - Build for production
- `yarn start` - Start a production build
- `yarn lint` - Get a list of lint errors
- `yarn lint:fix` - Attempts to fix lint errors for you
- `yarn test` - Run all tests
