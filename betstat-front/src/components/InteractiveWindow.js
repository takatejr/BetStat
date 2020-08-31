import React from 'react'

export const MoreDetails = ({details, idd}) => {
    

    const MoreDetaileeeed = (home, away, idd) => {
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
    
    // console.log(details)

    const destruct = details => {
    if(details == undefined){
        return
    } else {
    const { homeLastMatches: homeLastMatches, awayLastMatches: awayLastMatches} = details;
    MoreDetaileeeed(homeLastMatches, awayLastMatches, idd)
    console.log(homeLastMatches, awayLastMatches)
    return homeLastMatches, awayLastMatches
    }

    // console.log(details.homeLastMatches)
    }

    return(
        <div className="container">
            <div className="currentForm">
                {destruct(details)}
                {idd}
            </div>
            <div>
            </div>
        </div>
    )
}