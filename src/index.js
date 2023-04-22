// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// import RecipesProvider from './context/RecipesProvider';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

// ReactDOM
//   .createRoot(document.getElementById('root'))
//   .render(
//     <BrowserRouter>
//       <RecipesProvider>
//         <App />
//       </RecipesProvider>
//     </BrowserRouter>,
//   );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RecipesProvider from './context/RecipesProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div id="root" style={ { maxWidth: '766px', margin: '0 auto' } }>
    <BrowserRouter>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </BrowserRouter>
  </div>,
);

serviceWorker.unregister();
