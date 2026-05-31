import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RecipeContext from './context/RecipeContext.jsx'

createRoot(document.getElementById('root')).render(
  <RecipeContext>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastStyle={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.9rem",
          borderRadius: "0.875rem",
          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
        }}
      />
    </BrowserRouter>
  </RecipeContext>
)
