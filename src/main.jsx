import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ExpenseProvider from './context/ExpenseProvider.jsx'
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <ExpenseProvider>
                <App />
                <ToastContainer
                    position="top-right"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    theme="light"
                />
            </ExpenseProvider>
        </AuthProvider>
    </BrowserRouter>
)
