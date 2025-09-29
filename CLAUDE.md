# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Vue.js 2.x medical system application with Element UI components. The application uses Vue Router for navigation and Vuex for state management.

## Project Structure
- `src/main.js` - Application entry point
- `src/App.vue` - Root component
- `src/router/index.js` - Router configuration
- `src/store/index.js` - Vuex store configuration
- `src/views/` - Page components (currently only Login.vue)
- `src/assets/` - Static assets (images, fonts, styles)

## Development Commands
- `npm install` - Install dependencies
- `npm run serve` - Start development server with hot reload
- `npm run build` - Build for production

## Architecture
The application follows a standard Vue.js architecture:
1. Entry point in `main.js` initializes Vue with router and store
2. Routes are defined in `src/router/index.js`
3. State management is handled by Vuex in `src/store/index.js`
4. Views are located in `src/views/` directory
5. Assets (images, styles) are in `src/assets/`

The current implementation includes a login page with username and password fields using Element UI form components. The login functionality is partially implemented but commented out in the Login.vue component.