import React from 'react'

export const Matches = ({matches}) => {

    const MatchRow = (match,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{index + 1}</td>
                  <td>{match.home}</td>
                  <td>{match.away}</td>
                  <td>{match.referee}</td>

                  {/* <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td> */}
              </tr>
          )
    }

    const matchTable = matches.map((match,index) => MatchRow(match,index))

    return(
        <div className="container">
            <h2>Matches</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Home</th>
                    <th>Away</th>
                    <th>Referee</th>    
                </tr>
                </thead>
                <tbody>
                    {matchTable}
                </tbody>
            </table>
        </div>
    )
}