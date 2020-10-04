import React from "react";

export const MoreDetails = ({ details, idd }) => {
  const away = [];
  const home = [];
  const h2hToMap = [];

  const homes = (details) => {
    if (details === undefined) {
      return;
    } else {
      const { h2h } = details;
      h2hToMap.push(h2h);
      const { homeLastMatches } = details;
      for (let match of homeLastMatches) {
        home.push(match);
      }
    }
  };

  const aways = (details) => {
    if (details === undefined) {
      return;
    } else {
      const { awayLastMatches } = details;
      for (let match of awayLastMatches) {
        away.push(match);
      }
    }
  };

  return (
    <div className="WinDrawLose">
      <div className="home">
        <div className="last__matches">
          {homes(details)}
          {home.map((el) => (
            <div>
              <div className={el[0][0]}>{el[0][0]}</div>
              <div className="hidden">{el[1]}</div>
            </div>
          ))}
        </div>
        <span>{details !== undefined ? details.home : null}</span>
      </div>
      <div className="away">
        <div className="last__matches">
          {aways(details)}
          {away.map((el) => (
            <div>
              <div className={el[0][0]}>{el[0][0]}</div>
              <div className="hidden">{el[1]}</div>
            </div>
          ))}
        </div>
        <span>{details !== undefined ? details.away : null}</span>
      </div>
      <div>
        <h1>H2H</h1>
        <div>
          {h2hToMap.map(el => 
            <div className="grid">
            <div>{el[0]}  </div>
            <div>{el[1]}  </div>
            <div>{el[2]}  </div>
            <div>{el[3]}  </div>
            <div>{el[4]}  </div>
            </div>
            )}
        </div>
      </div>
    </div>
  );
};
