import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Questions from './Components/Questions'
import MatchJobs from './Components/MatchJobs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       {/* <h1>AI Job Matcher</h1> */}
       {/* <MatchJobs /> */}
     
      <Questions></Questions>
    </>
  )
}

export default App
