import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import  store, { persistor }  from './redux/store/store.ts'
import './index.css'
import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
);
