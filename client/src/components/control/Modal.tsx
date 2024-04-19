// external dependencies
import { useAppSelector } from '../../redux/hooks'

// internal dependencies
import { selectOpenWindow } from '../../redux/slices/trainerSlice'

// components
import AddEggs from "./AddEggs"
import HatchEggs from "./HatchEggs"
import AddApri from './AddApri'

// types
import OpenWindow from '../../types/WindowEnum'
import HatchShiny from './HatchShiny'

export default function Modal() {

    const openWindow = useAppSelector(selectOpenWindow)

    if (!openWindow) {
        return
    }

    let display = null
    switch (openWindow) {
        case OpenWindow.AddEggs:
            display = <AddEggs />
            break
        case OpenWindow.HatchEggs:
            display = <HatchEggs />
            break
        case OpenWindow.AddApri:
            display = <AddApri />
            break
        case OpenWindow.HatchShiny:
            display = <HatchShiny />
            break
    }

    return (
        <div id="overlay">
            { display }
        </div>
    )
}