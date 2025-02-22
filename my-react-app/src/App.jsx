import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Questions from './Components/Questions'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <Questions></Questions>
    </>
  )
}

export default App
