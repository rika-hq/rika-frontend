# rika-frontend

This repository contains frontend (Next.js) service of Rika project.

## Run

After clone the repository, install dependencies:

```shell
yarn install
```

> If you use another package manager such as `npm` or `pnpm`, just replace the `yarn` commands with them.

Then run it in development mode as a normal Next.js project by typing:

```shell
yarn dev
```

## Build

To build the project, type:

```shell
yarn build
```

This will build and bundle the project. Then you can run the built version by typing:

```shell
yarn start
```

### Docker Image

You can build a Docker image. To do this, just type the command below in your command prompt:

```shell
yarn build:container
```

This command deletes the previous image (if it exists) and builds a new one named `rika-frontend:latest`.
