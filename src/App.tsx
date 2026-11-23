import './App.css'

import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import Routes from './routes/routes'
import { UserStorage } from './hooks/useStorage'
import { TooltipProvider } from './components/ui/tooltip'
import { queryClient } from './lib/queryClient'

function App() {

  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
