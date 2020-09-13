import React from "react";

export const MoreDetails = ({ details, idd }) => {
  const away = [];
  const home = [];

  const homes = (details) => {
    if (details === undefined) {
      return;
    } else {
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
            <div className={el[0]}>{el[0]}</div>
          ))}
        </div>
        <span>{details !== undefined ? details.home : null}</span>
      </div>
      <div className="away">
        <div className="last__matches">
          {aways(details)}
          {away.map((el) => (
            <div className={el[0]}>{el[0]}</div>
          ))}
        </div>
          <span>{details !== undefined ? details.away : null}</span>
      </div>
    </div>
  );
};
