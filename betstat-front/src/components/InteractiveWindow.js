import React, { useState } from "react";
import Pagination from "./Pagination";

export const MoreDetails = ({ details, idd }) => {
  const away = [];
  const home = [];
  const h2he = [];

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [matchesPerPage] = useState(10);

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = details.slice(indexOfFirstMatch, indexOfLastMatch)

  // <Posts posts={currentMatches}/>

  const h2hs = (details) => {
    if (details === undefined) {
      return
    } else {
      const { h2h } = details;
      for (let match of h2h){
        h2he.push(match)
      }
      
    }
  }

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

  const paginate = pageNumber => setCurrentPage(pageNumber)

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
      <Pagination postsPerPage={matchesPerPage} totalPosts={50} />
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
        {h2hs(details)}
        <div>
          {h2he.map(({h2hHomeText, h2hAwayText, score}) =>
          <div className="btn">
            <div>{h2hHomeText}</div>
            <div>{score}</div>
            <div>{h2hAwayText}</div>

          </div>
          )}
        </div>
      </div>
    </div>
  );
};
