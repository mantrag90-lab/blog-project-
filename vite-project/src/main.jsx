import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {provider} from 'react-redux'
import store from './store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
   < Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
