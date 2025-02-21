import { useState } from "react"

const HiddenDetail = ({ label, info }: { label: string, info: string }) => {

    const [ hidden, setHidden ] = useState(true)

    const toggle = () => {
        const newHidden = hidden ? false : true
        setHidden(newHidden)
    }

    return (
        hidden ? 
            <button className="small-button wide-button menufalse" onClick={ toggle } >Show { label }</button> : 
            <button className="small-button wide-button menu shiny" onClick={ toggle } >{ label }: { info }</button>
    )
}

export default HiddenDetail