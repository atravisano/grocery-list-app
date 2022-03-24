# Grocery Shopping List App

This is an Angular 13 app that allows users to view, add, delete and cross items off their shopping list.

## Project Structure

This app uses a scalable folder structure in `src/app/` to separate components, models, and services into their respective groups.

```text
page-a
 ┣ components
 ┃ ┣ component-a
 ┃ ┃ ┣ *
 ┃ ┣ component-b
 ┃ ┃ ┣ *
 ┃ ┗ component-c
 ┃ ┃ ┣ *
 ┣ cotainers
 ┃ ┣ component-d
 ┃ ┃ ┣ *
 ┃ ┣ component-e
 ┃ ┃ ┣ *
 ┃ ┗ component-f
 ┃ ┃ ┣ *
 ┣ models
 ┃ ┣ model-a.ts
 ┃ ┗ model-b.ts
 ┗ services
 ┃ ┗ service-a
 ┃ ┃ ┣ *
 ┃ ┗ service-b
 ┃ ┃ ┣ *
```

- `/components`: component(s) that can be used one or more times in other component templates.
- `/containers`: component(s) that represent a web page shell.
  - Note: this is not used in this application since there is no routing.
- `/models`: Interface(s) to represent an object in `page-a`.
- `/services` Service(s) used in `page-a`.

## Running the project

First, in the command propmt, run `npm install`

Then, run `ng serve` for a dev server and open <http://localhost:4200/> in your browser.
