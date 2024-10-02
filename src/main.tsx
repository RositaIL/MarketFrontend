import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MarbellaApp from './MarbellaApp.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MarbellaApp />
    </Provider>
  </StrictMode>,
)
