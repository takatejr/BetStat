import React from 'react'

export const MoreDetails = ({details}) => {

    const hehe = (detail) => {

        return(
            <div>
                <div className="home">HOME ---
                    <div className="last__matches">
                        <div>{detail.homeLastMatches}</div>
                    </div>
                </div>
                <div className="away">AWAY ---
                    <div className="last__matches">
                        <div>{detail.awayLastMatches}</div>
                    </div>
                </div>
            </div>
          )
    } 
   
    let hehex = details.map(el => hehe(el));


    return(
        <div className="container">
            <div className="currentForm">
                {hehex}
            </div>

        </div>
    )
}