import React from 'react'
import { overall } from '../services/UserService'

export const MoreDetails = (details) => {

    const MatchRow = (details) => {

        return(
            <div>
                <div className="home">
                    <div className="last__matches">
                        <div className="{details.homeLastMatches}">{details.homeLastMatches}</div>
                    </div>
                </div>
                <div className="away">
                    <div className="last__matches">
                        <div className="{details.homeLastMatches}">{details.homeLastMatches}</div>
                    </div>
                </div>
            </div>
          )
    } 

    const lastMatches = details.map((match) => MatchRow(match))
    const row = document.querySelectorAll('div.container');
    row.forEach(item => {
        item.addEventListener('mouseover', overall())
    })

    return(
        <div className="container">
            <div className="currentForm">
                {lastMatches}
            </div>

        </div>
    )
}