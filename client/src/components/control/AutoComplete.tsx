import React from "react";
import ucfirst from '../../helpers/ucfirst'
import util from '@aqualunae/util'

export default function AutoComplete({ list, inputValue, onChange }) {

    if (!inputValue) {
        return;
    }

    const filteredList = list.filter(item => item.toLowerCase().includes(inputValue.toLowerCase()))

    if (filteredList.length === 0 || (filteredList.length === 1 && filteredList[0].toLowerCase() === inputValue.toLowerCase())) {
        return;
    }

    const select = (option) => {
        onChange(option)
    }

    const output = filteredList.map(item => {
        return <div className="suggest" key={item} onClick={() => {select(util.str.title(item))}} >{util.str.title(item)}</div>
    })

    return (
        <div id="auto-suggest" className="box">
            { output }
        </div>        
    )
}