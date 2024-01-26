import React from "react";
import ucfirst from '../../helpers/ucfirst'

export default function AutoComplete({ list, inputValue, onChange }) {

    if (!inputValue) {
        return;
    }

    const filteredList = list.filter(item => item.toLowerCase().includes(inputValue.toLowerCase()))

    if (filteredList.length <= 1) {
        return;
    }

    const select = (option) => {
        onChange(option)
    }

    const output = filteredList.map(item => {
        return <div className="suggest" onClick={() => {select(ucfirst(item))}} >{ucfirst(item)}</div>
    })

    return (
        <div id="auto-suggest" className="box">
            { output }
        </div>        
    )
}