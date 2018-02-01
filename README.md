# GraphQL - What is it? Why would I use it? How can I use it?

This repo contains a presentation with live components that connect to the included server.

## Getting Started - Running the presentation

* Run `$ yarn install`
* Run `$ yarn start-server`
* Run `$ yarn start-presentation`

## File Structure

The important folders for understanding the project are:

* `./server` which contains the REST/GraphQL server
* `./src/graphQLExampleComponents` and `./src/RESTExampleComponents` which contains the necessary components for fetching data from the GraphQL and REST servers respectively. Both implementations share the same "dumb component", found in `./src/uiComponents/`
