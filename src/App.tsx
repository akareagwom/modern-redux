import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useAppDispatch, useAppSelector} from './features/app/hooks.tsx'
import {incremented, amountAdded} from './features/counter/counter-slice.tsx'
import {useFetchBreedsQuery} from './dogs/dogs-api-slice.tsx';

function App() {
  const count = useAppSelector((state)=>state.counter.value);
  const dispatch = useAppDispatch();

// const {data, isFetching } = useFetchBreedsQuery
// error fix in progress

//increment by fixed number of 3
  const handleClick = () => dispatch(amountAdded(3));


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
        onClick={handleClick}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
