import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux/hooks'
import { getPossible } from './redux/slices/possibleSlice'
import { getTrainer } from './redux/slices/trainerSlice'
import { getAprimon } from './redux/slices/aprimonSlice'
import Header from './components/Header'
import Collection from './components/Collection'
import Sidebar from './components/Sidebar'
import Modal from './components/control/Modal'
import Details from './components/Details';

export default function App() {

  const dispatch = useAppDispatch()

  const apiStatusPossible = useAppSelector(state => state.possible.status)
  useEffect(() => {
    if (apiStatusPossible === 'idle') {
      dispatch(getPossible())
    }
  }, [apiStatusPossible, dispatch])
  
  const apiStatusApri = useAppSelector(state => state.trainer.status)
  useEffect(() => {
    if (apiStatusApri === 'idle') {
      dispatch(getAprimon("knifecat"))
    }
  }, [apiStatusApri, dispatch])
  
  const apiStatusTrainer = useAppSelector(state => state.trainer.status)
  useEffect(() => {
    if (apiStatusTrainer === 'idle') {
      dispatch(getTrainer("knifecat"))
    }
  }, [apiStatusTrainer, dispatch])

  return (
    <>
      <Modal />
      <Details />
      <Header />
      <Collection />
      <Sidebar />
    </>
  )
}