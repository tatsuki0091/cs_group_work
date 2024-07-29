import React from 'react'
import { WidgeContents } from '../../interface'

const Widget = ({ title, content }: WidgeContents) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p>{content}</p>
        </div>
    )
}

export default Widget