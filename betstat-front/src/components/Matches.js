import React from 'react'

export const Matches = ({matches}) => {

    const MatchRow = (match,index) => {

        return(
              <tr key = {index} className={match.matchID}>
            {/* <tr key = {index} className={index%2 === 0?'odd':'even'}> */}
                  <td>{index + 1}</td>
                  <td>{match.league}</td>
                  <td>{match.start}</td>
                  <td>{match.home}</td>
                  <td>{match.away}</td>
                  <td>{match.referee}</td>
              </tr>
          )
    }

    const matchTable = matches.map((match,index) => MatchRow(match,index))
    // const row = document.querySelectorAll('div.container');
    // row.forEach(item => {
    //     item.addEventListener('mouseover', event.target)
    // })

    return(
        <div className="container">
            <h1>Matches</h1>
            <table className="table ">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>League</th>
                    <th>Start</th>
                    <th>Home</th>
                    <th>Away</th>
                    <th>Referee</th>
                </tr>

                </thead>
                <tbody>
                    {matchTable}
                </tbody>
            </table>
            <div>
                <div className="container">hehe</div>
            </div>
        </div>
    )
}