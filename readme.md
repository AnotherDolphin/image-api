# Imagize
### seamless image upload and resize API

## Application Properties
1- Use UI to input your image and set desired size

2- Copy generated url and reuse your image anywhere

3- Request any different size using your original image's name and in a URL with queries for width and/or height

## Endpoints
`/` directs to home UI `/public/index.html`

`/img/name:` serves cached images

`/img/name:?width=<number>&height=<number>` to resize and serve a chached image

`/post` to upload a new image (from UI)

## Usage
Clone the repo and run `npm install` to get all depencdencies, then start the server locally with `npm run start` and use the app

## Scripts
`npm run build` to compile TS
`npm run test` to compile TS & run tests
`npm run lint` for es-linting
`npm run prettier` for formatting
`npm run start` to start dev (ts) server
`node build` to run prod (js) server

## Structure
`/src` source TS directory
- `/src/routes` Express routes
- `/src/utils` Express utility functions
- `/src/tests` Jasmine tests

`/build` complied JS directory

`/public` for static browser html

`/gallry` directory for all cached images - resized images distinguished by '@' followed by dimesions in filename