import React from 'react'

const Pagination = ({ postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i)
        console.log(pageNumbers)
    }

    return (
        <nav>
            <ul>
                {pageNumbers.map(number => <div onClick={() => paginate(number)}>{number}</div>)}
            </ul>
        </nav>
    )
    }

    export default Pagination
