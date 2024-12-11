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

    if (trnr) {
        dispatch(getAprimon(trnr))
        dispatch(getTrainer(trnr))
    }
    
    return (
        <>
            <Collection />
            <Sidebar />
        </>
    )
}

export default Home