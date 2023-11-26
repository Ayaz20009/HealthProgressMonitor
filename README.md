# CenSoS Intake form

This repo includes the CenSoS Intake Form React application and App Services backend code used. 

The front-end is developed using the Leafy library
https://www.mongodb.design/


# Getting started with CenSoS Intake Form Front-End

This project was created using the React Leafy Library with TS. 

Below are the steps to run the project locally

0. Get the .env file from `Federico Inserra`

1. ### `npm install`

Install all the dependencies

2. ### `npm start`

Runs the app in the development mode.\
Open [http://localhost:5050](http://localhost:5050) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Other Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build-realm`

Runs the `build` script and updates the hosted files in the realm project. This is usefule if you are using App Services Github Integration to deploy your build.

Alternatively, you can upload all files and folders in the `build` directory to the Hosting service in your App Services app.

### `npm run serve`

This will build the project and start a static file server locally to test the application build locally prior to deploying to App Services.

**Note: You'll need to have the `serve` package installed globally**

`npm i -g serve`


## Learn More

[Leafy Design](https://www.mongodb.design/)

[Realm Web SDK](https://www.mongodb.com/docs/realm/web/)

[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)

## Steps to Create a New Card

1. Add the new card
/utils/homePageData.json
  {
    "title": "Card Title",
    "text": "Card description",
    "img": "image.jpg", // Must exactly match title inside /assets
    "salesSegment": ["Growth", "Acquisition", "PLS", "CSMs", "Marketing", "Partners" "All"], // Allows for UI filtering
    "cardLink": "discovery", // Parameter that passes into the form page
    "leadTime": "2 Days" // Just a text box for now. The control  for the actual lead time in the forms page. Ideal future state: This field controls actual lead time
  },

2. Add a new form handler
/routers/form.tsx

## Steps to Create a New Field
Work in Progress
1. Create a new state
2. Copy the react component 
