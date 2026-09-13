import './App.css'

import { BrowserRouter } from "react-router-dom"
import Routes from './routes/routes'
import { UserStorage } from './hooks/useStorage'

function App() {

  return (
    <BrowserRouter>
      <UserStorage>
        <div className="flex flex-col min-h-screen bg-(--bg-principal) overflow-x-hidden">
          <header></header>
          <main className="flex flex-col flex-1">
            <Routes />
          </main>
          <footer></footer>
        </div>
      </UserStorage>
    </BrowserRouter>
  )
}

export default App
