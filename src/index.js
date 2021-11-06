import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import  store  from './app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrateMyPhotos } from './reducers/myPhotosSlice';

const getTodosFromLocalStorage = () => {
  try { 
    const persistedState = localStorage.getItem('reduxState') 
    if (persistedState) 
      return JSON.parse(persistedState)
  }
  catch (e){ 
    console.log(e)
  }
}

const todos = getTodosFromLocalStorage()
if(todos){
  store.dispatch(hydrateMyPhotos(todos))
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
