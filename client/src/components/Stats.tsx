// external dependencies
import { useState } from "react"
import { useAppSelector } from '../redux/hooks'
import util from '@aqualunae/util'

// internal dependencies
import { selectSelf, selectStats } from '../redux/slices/trainerSlice'
import { selectMetadata } from "../redux/slices/aprimonSlice"

// components
import SidebarHeader from "./SidebarHeader"

export default function Stats() {

    const stats = useAppSelector(selectStats)
    const metadata = useAppSelector(selectMetadata)
    const self = useAppSelector(selectSelf)
    const { name, ign, bio, since, queue } = stats
    const { count, shinies, ratio, eggs } = metadata
    const [ open, setOpen ] = useState(true)
    const header = <SidebarHeader title="Stats" open={open} setOpen={setOpen} />

    if (open) {
        return (
            <>
                { header }
                <p>
                    { self === name && "That's you!" }
                    { self === name && <br /> }
                    { bio }
                </p>
                <table id="stats">
                    <tbody>
                        <tr>
                            <td className="num">{ count }</td>
                            <td className="label">Aprimon Types</td>
                        </tr>
                        <tr>
                            <td className="num">{ shinies }</td>
                            <td className="label">Shinies Hatched</td>
                        </tr>
                        <tr>
                            <td className="num">{ eggs }</td>
                            <td className="label">Eggs Hatched</td>
                        </tr>
                        <tr>
                            <td className="num">1:{ ratio }</td>
                            <td className="label">Shiny Ratio</td>
                        </tr>
                        <tr>
                            <td className="num">{ since }</td>
                            <td className="label">Eggs Since Last Shiny</td>
                        </tr>
                        <tr>
                            <td className="num">{ queue.number }</td>
                            <td className="label">Queue ({
                                queue.pokemon ? util.str.title(`${ queue.ball } ${ queue.pokemon }`) : "empty"
                            })</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    } else {
        return header
    }
}