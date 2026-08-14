import { Button } from '../components/ui/button'

import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      Essa é a home cupinxa
      <Button onClick={() => console.log('Button clicked!')} variant="default" size="default">
        <Link to="/login">Ir para Login</Link>
      </Button>
    </div>
  )
}

export default Home
