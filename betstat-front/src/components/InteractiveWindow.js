import React from "react";

export const MoreDetails = ({ details, idd }) => {
  const MoreDetaileeeed = (home, away, idd) => {
    return (
      <div className="WinDrawLose">
        <div className="home">
          <div className="last__matches">
            <div>
              {home}
              {idd}
            </div>
          </div>
        </div>
        <div className="away">
          <div className="last__matches">
            <div>{away}</div>
          </div>
        </div>
      </div>
    );
  };

  // console.log(details)

  const home = (details) => {
    if (details === undefined) {
      return;
    } else {
      const { homeLastMatches } = details;
      return homeLastMatches.toString().split(",").join(" ");
    }
  };

  const away = (details) => {
    if (details === undefined) {
      return;
    } else {
      const { awayLastMatches } = details;
      return awayLastMatches.toString().split(",").join(" ");
    }
  };

  return (
    <div className="WinDrawLose">
    <div className="home">
      <div className="last__matches">
        <div>
          {home(details)}
        </div>
      </div>
    </div>
    <div className="away">
      <div className="last__matches">
        <div>{away(details)}</div>
      </div>
    </div>
  </div>
  );
};
