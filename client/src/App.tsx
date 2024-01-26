import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './redux/hooks'

import { getTrainer } from './redux/slices/trainerSlice'
import { getAprimon } from './redux/slices/aprimonSlice'

import Header from './components/Header'
import Collection from './components/Collection'
import Sidebar from './components/Sidebar'
import Modal from './components/control/Modal';

export default function App() {

  const dispatch = useAppDispatch()
  
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
      <Header />
      <Collection />
      <Sidebar />
    </>
  )
}