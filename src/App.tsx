import './App.css'

import { BrowserRouter } from "react-router-dom"
import Routes from './services/routes'

// import { Button } from './components/ui/button'
// import { Rocket, Sparkles } from "lucide-react"

function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-(--bg-principal)">
        <header></header>
         <main className="flex flex-col flex-1">
            <Routes />
          </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  )
}

export default App
