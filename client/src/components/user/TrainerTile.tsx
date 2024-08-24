import { Link, useNavigate } from 'react-router-dom'
import Trainer from '../../types/Trainer'

const TrainerTile = ({ trnr }: { trnr: Trainer }) => {

    return (
        <Link className="small-button wide-button" to={ `/${ trnr.name }` } >
            <h3>{ trnr.name }</h3>
        </Link>
    )
}

export default TrainerTile