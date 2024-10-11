# Tusu

The project is bootstrapped using create-next-app. The projects uses yarn as it's package manager

Demo live at: [https://next.tusustaging.ml/](https://next.tusustaging.ml//)

Source code: [git@gitlab.com:centresource_nodejs/tusu-frontend.git](git@gitlab.com:centresource_nodejs/tusu-frontend.git)
  
## Installation

The project is bootstrapped using create-next-app. The projects uses yarn as it's package manager. First

```bash

yarn install

```

## Run Locally

Clone the project

```bash

git clone git@gitlab.com:centresource_nodejs/tusu-frontend.git

```

Go to the project directory

```bash

cd tusu-frontend

```

Install dependencies

```bash

yarn install

```

Start the server

```bash

yarn dev

```

## Tech Stack

**Client:**

- [NextJs](https://nextjs.org/docs/getting-started) - React framework with Server side rendering

- [Redux Toolkit](https://redux-toolkit.js.org/usage/usage-guide) - For state management

- [React Query](https://react-query.tanstack.com/overview) - For data fetching and caching

- [Sass](https://sass-lang.com/documentation) - CSS preprocessor

- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - CSS library

- [Formik](https://formik.org/docs/overview) - For form management

- [Yup](https://github.com/jquense/yup) - For form validation

- [ReCharts](https://recharts.org/en-US/api) - For charts

**Server:**

- [Strapi](https://strapi.io/) - Used for Back-end APIs and Content management

- [RocketChat](https://rocket.chat/) - Used for real time chat services

- [BigBlueButton](https://bigbluebutton.org/) - Used for Video conferencing feature

- [Firebase](https://firebase.google.com/) - Used for real-time notifications and online status

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Server side:**

`FRONTEND_HOME` - NextJs app base URL.

`API_ENDPOINT` - Back-end server API base URL.

**Client side:**

`NEXT_PUBLIC_FRONTEND_HOME` - NextJs app base URL.

`NEXT_PUBLIC_API_ENDPOINT` - Back-end server API base URL.

## API Reference

#### Folder structure

| Folder         | Description                                                                |
| :------------- | :------------------------------------------------------------------------- |
| `@types`       | Type declarations for packages with no type declarations                   |
| `api`          | axios instance with default headers                                        |
| `components`   | Components that can be used any any modules                                |
| `config`       | Config files                                                               |
| `consts`       | Constants used in the project                                              |
| `features`     | Redux toolkit slices based on different features                           |
| `HOC`          | Higher order components which enhances wrapped component's functionalities |
| `hooks`        | Custom hooks which can be used commonly                                    |
| `layouts`      | Wrapper components for different layouts                                   |
| `modules`      | Components and custom hooks organized based on different modules           |
| `node_modules` | Third-party package dependencies                                           |
| `pages`        | Each components is associated with a route based on its file name.         |
| `public`       | Static files                                                               |
| `store`        | Redux store                                                                |
| `styles`       | Style related files                                                        |
| `utils`        | Custom utility function library related to the project                     |

## Deployment

To build this project run

```bash

yarn build

```

## Branching

| Branch        | Description                                                |
| :------------ | :--------------------------------------------------------- |
| `master`      | Merged from pre-release                                    |
| `dev`         | Latest features are merged to this branch                  |
| `staging`     | Working code from dev merged to this branch                |
| `pre-release` | Tested and working code from staging merged to this branch |
