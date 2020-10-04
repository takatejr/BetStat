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
                <button type="button" onClick={(e) => consol()}>stan</button>
                <button type="button" onClick={(e) => sortujto()}>obiekty</button>
            </div>
        </div>
    )
}