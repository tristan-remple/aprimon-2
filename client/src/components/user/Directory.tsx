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
    const [ filteredList, setFilteredList ] = useState<Trainer[]>([])

    useEffect(() => {
        (async() => {
            const response: AxiosResponse<Trainer[]> = await axios.get<Trainer[]>(url, axiosOptions)
            setTrainerList(response.data)
            setFilteredList(response.data)
        })()
    }, [])

    const self = useAppSelector(selectLoggedTrainer)

    const renderedList = filteredList
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(trnr => <TrainerTile trnr={ trnr } key={ trnr.name } />)

    const [ open, setOpen ] = useState(true)
    const header = <SidebarHeader title="Navigation" open={open} setOpen={setOpen} />

    const [ keyword, setKeyword ] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setKeyword(input)
        if (input !== "") {
            const keywordFilteredList = [...trainerList].filter(trnr => trnr.name.toLowerCase().includes(input.toLowerCase()))
            setFilteredList(keywordFilteredList)
        } else {
            setFilteredList(trainerList)
        }
    }

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
                <div className="box wide-button">
                    <input type="text" className="wide-row" value={ keyword } placeholder="Search..." onChange={ handleChange } />
                </div>
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