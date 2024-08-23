// external dependencies
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import util from '@aqualunae/util'

// internal dependencies
import { removeAprimon, selectApriDetails } from '../../redux/slices/aprimonSlice'
import { setOpenWindow } from '../../redux/slices/trainerSlice'

// components
import ConfirmButton from './ConfirmButton'
import CloseButton from './CloseButton'

const Remove = () => {

    const dispatch = useAppDispatch()
    const aprimon = useAppSelector(selectApriDetails)
    const title = aprimon.pokemon.form ? util.str.title(`${ aprimon.ball } ${ aprimon.pokemon.form } ${ aprimon.pokemon.name }`) : util.str.title(`${ aprimon.ball } ${ aprimon.pokemon.name }`)

    const confirmRemove = () => {
        dispatch(removeAprimon(aprimon))
        setOpenWindow(null)
    }

    return (
        <div id="zoom" className="box">
            <h2>Confirm that { title } is no longer in your collection?</h2>
            <div className="nav-row">
                <ConfirmButton confirm={ confirmRemove } />
                <CloseButton />
            </div>
        </div>
    )
}

export default Remove