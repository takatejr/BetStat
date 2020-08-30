import React from 'react'

export const Matches = ({matches, getAndSendID, getAndSendObject}) => {

    const MatchRow = (match,index) => {
        // console.log(match)
        return(
              <tr key = {index} onClick={(e) => getAndSendObject(e, index)}>
                  <td>{index + 1}</td>
                  <td >{match.league}</td>
                  <td>{match.start}</td>
                  <td>{match.home}</td>
                  <td>{match.away}</td>
                  {/* <td>{match.homeLastMatches}</td> */}
                  {/* <td>{match.awayLastMatches}</td> */}
                  <td onClick={(e) => getAndSendID(e)} className={match.matchID}>XOXOXO</td>
              </tr>
          )
    }

    const matchTable = matches.map((match,index) => MatchRow(match,index))

        return(
        <div className="container">
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>League</th>
                    <th>Start</th>
                    <th>Home</th>
                    <th>Away</th>
                    {/* <th>HomeMMM</th> */}
                    {/* <th>AwayMMM</th> */}
                    <th>Advanced</th>
                </tr>

                </thead>
                <tbody>
                    {matchTable}
                </tbody>
            </table>
        </div>
    )
}