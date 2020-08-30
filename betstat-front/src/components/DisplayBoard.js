import React from 'react'
import { scrapData } from '../services/UserService'

export const DisplayBoard = ({numberOfMatches, betdatas, consol, sortujto}) => {
    
    return(
        <div className="display-board">
            <div className="number">
            {numberOfMatches} matches
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => scrapData()}>SCRAPDATA</button>
                <button type="button" onClick={(e) => betdatas()}>DO TABELI</button>
                <button type="button" onClick={(e) => consol()}>Check state</button>
                <button type="button" onClick={(e) => sortujto()}>sortujto</button>
            </div>
        </div>
    )
}