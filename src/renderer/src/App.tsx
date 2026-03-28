import { useState } from 'react'

function App(): React.JSX.Element {
  const [randomNumber, setRandomNumber] = useState<number>(0)

  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  const getRandomNumber = (): void => {
    const number = window.example.getRandomNumber()
    setRandomNumber(number)
  }

  return (
    <div>
      <p>Random Number: {randomNumber}</p>
      <button onClick={getRandomNumber}>Get Random Number</button>
      <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
        Send IPC
      </a>
    </div>
  )
}

export default App
