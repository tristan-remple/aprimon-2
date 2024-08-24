import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Collection from '../Collection'
import Sidebar from '../Sidebar'
import { getAprimon } from '../../redux/slices/aprimonSlice'
import { getTrainer } from '../../redux/slices/trainerSlice'
import { useParams } from 'react-router-dom'

const Home = () => {

    const dispatch = useAppDispatch()
    const { trnr } = useParams()

    const trainer = trnr ? trnr : import.meta.env.VITE_DEFAULT_USER

    dispatch(getAprimon(trainer))
    dispatch(getTrainer(trainer))

    return (
        <>
            <Collection />
            <Sidebar />
        </>
    )
}

export default Home