import React from 'react'

export const MoreDetails = ({details, idd}) => {
    
    const { homeLastMatches: homeLastMatches, awayLastMatches: awayLastMatches} = details;
    MoreDetaileeeed(homeLastMatches, awayLastMatches, idd)

    const MoreDetaileeeed = (home, away, idd) => {
        console.log(home)
        return(
            <div>
                <div className="home">
                    <div className="last__matches">
                        <div>{home}{idd}</div>
                    </div>
                </div>
                <div className="away">
                    <div className="last__matches">
                        <div>{away}</div>
                    </div>
                </div>
            </div>
          )
    } 


    return(
        <div className="container">
            <div className="currentForm">
                {}
                {idd}
            </div>
            <div>
            </div>
        </div>
    )
}