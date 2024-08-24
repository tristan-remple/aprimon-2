import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { getPossible } from './redux/slices/possibleSlice'
import { getTrainer } from './redux/slices/trainerSlice'
import { getAprimon } from './redux/slices/aprimonSlice'
import Header from './components/Header'
import Collection from './components/Collection'
import Sidebar from './components/Sidebar'
import Modal from './components/control/Modal'
import Details from './components/Details'
import Directory from './components/user/Directory';
import { Route, Routes } from 'react-router-dom';
import Home from './components/user/Home';

export default function App() {

  const dispatch = useAppDispatch()

  const apiStatusPossible = useAppSelector(state => state.possible.status)
  useEffect(() => {
    if (apiStatusPossible === 'idle') {
      dispatch(getPossible())
    }
  }, [apiStatusPossible, dispatch])

  return (
    <>
      <Modal />
      <Details />
      <Header />
      <Routes>
        <Route path="/" element={ <Directory /> } />
        <Route path="/:trnr" element={ <Home /> } />
      </Routes>
    </>
  )
}