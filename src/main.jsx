import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ExpenseProvider from './context/ExpenseProvider.jsx'
import "react-datepicker/dist/react-datepicker.css";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <ExpenseProvider>
        <App />
    </ExpenseProvider>
    </BrowserRouter>
)
