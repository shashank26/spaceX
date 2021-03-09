### NOTE: 
 Lighthouse reports can be downloaded from the main branch of the repository.
  1. lighthouse_desktop.pdf
  2. lighthouse_mobile.pdf

# SpaceX

This project is made with angular and implements Server Side Rendering, one thing that I couldn't resolve was the initial flickering that happens when loading tha app for first time the page is rendered server side and I am using TransferState to retrieve the cached data, however, still it is flickering twice may be because the component re renders itself and during that split second all the variables are initialized and the data variable is set to empty array before rceiving the TrasferState data.

Another thing that I wasn't able to perform was pre-rendering my filter module as pre rendering the route that contained this module was also pre rendering the launch-program route which is dynamic and is subject to change with the server data, so I switched back to stock SSR.

## Structure

The project follows simple structure of component inside their respective folders while mantaining the heirarchy, shared components/directives/services are in shared module which is imported wherever required

## Routing

This project has one route that is '/launch-programs' which is loaded initially even when route is starting with '/' this route is lazily loaded as it contains the bulk of UI, this route is also rendered server side and subsequent filters to the route are managed at client side.
In addition, the first URL that we hit irrespective of filters or not is rendered server side.

## Mobile Performance
I am using a useragent parser node module called ua-parser-js, this parses the user-agent header received when our app is requested from client side, after parsing I am retreiving the OS of the client side which subsequently gives Android, iOS etc, and then injects the dependency while bootstrapping the app server module. This dependency is being used in Launch Programs service to set the browser type if it is desktop I am loading 10 items at a time, if it is a Mobile then only 4 are being loaded which in turn improved the mobile device rendering and lighthouse score. 

## Linting

Using stock TS Lint, even though it shows that it is deprecated by angular and forces to use ES Lint. [Added in the CI Pipeline]

## Unit Testing

All components have their stock spec files having default test cases, I have added a few to check following things: [Added in the CI Pipeline]
  1. Testing the coverter service if the conversion is taking place correctly and data is being returned.
  2. Testing the LaunchProgram service if the service is returning the data with query params.
  3. Testing if the filter buttons are present in the template after rendering.

## GitHub Actions
  Added to the main branch currently.
  Using Nodejs to serve the github actions.
  Using Nodejs v14.x, running linting, build and tests correspondingly.
  
## Deployment Production
  This app is deployed on heroku server, Heroku server waits for the github CI to complete successfully and then deploys the main branch.

## Development server

Run `npm run dev:ssr` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

