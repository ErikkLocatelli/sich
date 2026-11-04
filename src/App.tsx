import './App.css'

import { BrowserRouter } from "react-router-dom"
import Routes from './routes/routes'
import { UserStorage } from './hooks/useStorage'
import { TooltipProvider } from './components/ui/tooltip'

function App() {

  return (
    <BrowserRouter>
      <UserStorage>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen bg-(--bg-principal) overflow-hidden">
            <div className="flex flex-col flex-1">
              <Routes />
            </div>
          </div>
        </TooltipProvider>
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
