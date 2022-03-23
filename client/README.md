# Grocery Shopping List App

An Angular 13 app that can view the current items on their list, add items, cross items off their list, or delete items.

## Project Structure

Uses a scalable folder structure in `src/app/` to seperate components, models, and services into their respective groups.

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
