import React, { useState } from "react";

import { useAppSelector } from '../redux/hooks'
import { selectStats } from '../redux/slices/trainerSlice';
import ucfirst from '../helpers/ucfirst';
import SidebarHeader from "./SidebarHeader";

export default function Stats() {

    const stats = useAppSelector(selectStats)
    const { bio, count, shinies, eggs, ratio, since, queue } = stats;
    const [ open, setOpen ] = useState(true)
    const header = <SidebarHeader title="Stats" open={open} setOpen={setOpen} />

    if (open) {
        return (
            <>
                { header }
                <p>{bio}</p>
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
                            <td className="label">Queue ({queue.pokemon && ucfirst(`${queue.ball} ${queue.pokemon}`)})</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    } else {
        return header
    }
}