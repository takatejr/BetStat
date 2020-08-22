import React from 'react'
import { scrapData, betdatas } from '../services/UserService'

export const DisplayBoard = ({numberOfUsers, getAllUsers}) => {
    
    return(
        <div className="display-board">
            <h4>Users Created</h4>
            <div className="number">
            {numberOfUsers}
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => getAllUsers()} className="btn btn-warning">Get all Users</button>
                <button type="button" onClick={(e) => scrapData()}>SCRAPDATA</button>
                <button type="button" onClick={(e) => betdatas()}>DO TABELI</button>
            </div>
        </div>
    )
}