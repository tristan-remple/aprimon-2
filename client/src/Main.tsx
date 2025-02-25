import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Footer } from "./components/Footer"
// import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={ import.meta.env.VITE_PUBLIC_URL } >
        <App />
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
