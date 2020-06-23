import React from "react";

export const LinkCard = ({link}) => {
    return (<div>
        <h1>Link</h1>
        <p>Short link: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
        <p>Link from: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
        <p>Click count: <strong>{link.clicks}</strong></p>
        <p>Date Create: <strong> {new Date( link.data).toLocaleString()}</strong></p>
    </div>)
}