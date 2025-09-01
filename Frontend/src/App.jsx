import React from 'react'
import Mainroute from './routes/Mainroute'

const App = () => {
  // tanstack query get => useQuery
  // tanstack query post, delete, put => useMutation
  return (
    <div data-theme='forest'>
      <Mainroute/>
    </div>
  )
}

export default App