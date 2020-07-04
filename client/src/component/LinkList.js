import React from "react";
import {Link} from "react-router-dom";

export const LinkList = ({link}) => {
    if (!link.length){
        return <h3> No links</h3>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Link from</th>
                <th>Link to</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {link.map((item, index) => {

                return (<tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.from}</td>
                    <td>{item.to}</td>
                    <td>
                        <Link to={`/detail/${item._id}`}>Open</Link>
                    </td>
                </tr>)
            })}

            </tbody>
        </table>
    )
}