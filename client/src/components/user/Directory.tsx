import axios, { AxiosResponse } from "axios"
import Trainer from "../../types/Trainer";
import { useEffect, useState } from "react";
import TrainerTile from "./TrainerTile";
import { useAppSelector } from "../../redux/hooks";
import { selectLoggedTrainer } from "../../redux/slices/trainerSlice";
import SidebarHeader from "../SidebarHeader";
import NavButton from "../control/NavButton";
import ControlButton from "../control/ControlButton";
import OpenWindow from "../../types/WindowEnum";


const Directory = () => {

    const url = `${import.meta.env.VITE_API_URL}/trainers`
    const axiosOptions = {
        withCredentials: true,
        validateStatus: (status: number) => {
            return true;
        }
    }

    const [ trainerList, setTrainerList ] = useState<Trainer[]>([])

    useEffect(() => {
        (async() => {
            const response: AxiosResponse<Trainer[]> = await axios.get<Trainer[]>(url, axiosOptions)
            setTrainerList(response.data)
            console.log(response.data)
        })()
    }, [])

    const self = useAppSelector(selectLoggedTrainer)
    console.log(self)

    const renderedList = trainerList.map(trnr => <TrainerTile trnr={ trnr } key={ trnr.name } />)

    const [ open, setOpen ] = useState(true)
    const header = <SidebarHeader title="Navigation" open={open} setOpen={setOpen} />

    const nav = self ? <>
        <p>You are currently logged in as { self }.</p>
        <div className="nav-row">
            <NavButton href={ `/${ self }` } title="Your Collection" label="ball" icon={ true } />
            <ControlButton label={ OpenWindow.Browse } />
            <ControlButton label={ OpenWindow.Logout } />
        </div>
    </> : <>
        <p>You are not currently logged in.</p>
        <ControlButton label={ OpenWindow.Login } />
    </>
    
    return (
        <>
            <article id="card-rows">
                { renderedList }
            </article>
            <nav className="box">
                { header }
                { nav }
            </nav>
        </>
    )
}

export default Directory