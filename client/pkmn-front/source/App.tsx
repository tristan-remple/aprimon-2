import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks'

import { getTrainer } from './features/trainer/trainerSlice'

import Header from './components/Header'
import Collection from './components/Collection'
import Sidebar from './components/Sidebar'
import Modal from './components/control/Modal';

export default function App() {

  const dispatch = useAppDispatch()
  const apiStatus = useAppSelector(state => state.trainer.status)

  useEffect(() => {
    if (apiStatus === 'idle') {
      dispatch(getTrainer("knifecat"))
    }
  }, [apiStatus, dispatch])

  return (
    <>
      <Modal />
      <Header />
      <Collection />
      <Sidebar />
    </>
  )
}