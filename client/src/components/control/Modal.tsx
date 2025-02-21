// external dependencies
import { useAppSelector } from '../../redux/hooks'

// internal dependencies
import { selectOpenWindow } from '../../redux/slices/trainerSlice'

// components
import AddEggs from "./AddEggs"
import HatchEggs from "./HatchEggs"
import AddApri from './AddApri'
import Login from '../user/Login'
import HatchShiny from './HatchShiny'
import DetailsEdit from '../DetailsEdit'
import Browse from '../Browse'
import Wishlist from './Wishlist'
import Remove from './Remove'

// types
import OpenWindow from '../../types/WindowEnum'
import Logout from '../user/Logout'
import Register from '../user/Register'
import ProfileEdit from '../user/ProfileEdit'

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
        case OpenWindow.Login:
            display = <Login />
            break
        case OpenWindow.DetailsEdit:
            display = <DetailsEdit />
            break
        case OpenWindow.Browse:
            display = <Browse />
            break
        case OpenWindow.Wishlist:
            display = <Wishlist />
            break
        case OpenWindow.Remove:
            display = <Remove />
            break
        case OpenWindow.Logout:
            display = <Logout />
            break
        case OpenWindow.Register:
            display = <Register />
            break
        case OpenWindow.ProfileEdit:
            display = <ProfileEdit />
            break
    }

    return (
        <div id="overlay">
            { display }
        </div>
    )
}