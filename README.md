# Web Assassin == Alpine.js Boilerplate Starter Template
Webpack based boilerplate starter template including Alpine.js and Sass/Scss compilation.

## Getting Started

1. Clone or download the repo
2. `npm i`
3. `npm run dev`

## Basic Use

### Change the namespace
In `src/index.js` you'll see </br>
```javascript
const namespace = 'webassassin'
```
This is there to avoid collisions with other libraries. Change it to something uniquely yours if you prefer.

### Add Alpine.js Components

To add a new Alpine.js component, navigate to `src/scripts/components` and create a `.js` file and inside it export a default objecct with

- A name key/value pair
- A function called `component()` that returns the guts of your Alpine.js component per their specs