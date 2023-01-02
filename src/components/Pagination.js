import React, { useState } from "react"

function Pagination({ setCurrentPage, numPage, currentPage }) {
  let [pageNumber] = useState(1)

  function handleClick(e) {
    let page = Number(e.target.innerHTML)
    setCurrentPage(page)
  }
  function handleNext() {
    let page = currentPage + 1
    setCurrentPage(page)
  }
  function handlePrivious() {
    let page = currentPage - 1
    setCurrentPage(page)
  }

  return (
    <>
      <ul className="pagination">
        {numPage ? (
          <li className={`page-item ` + `${currentPage === 1 ? "disabled" : ""}`}>
            <a onClick={handlePrivious} className="page-link">
              Previous
            </a>
          </li>
        ) : (
          ""
        )}
        {[...Array(numPage)].map((i, index) => {
          return (
            <li key={index} className={`page-item ` + `${currentPage === pageNumber ? "active" : ""}`}>
              <a
                onClick={e => {
                  handleClick(e)
                }}
                className="page-link"
              >
                {pageNumber++}
              </a>
            </li>
          )
        })}

        {numPage ? (
          <li className={`page-item ` + `${currentPage === numPage ? "disabled" : ""}`}>
            <a onClick={handleNext} className="page-link" href="#">
              Next
            </a>
          </li>
        ) : (
          ""
        )}
      </ul>
    </>
  )
}

export default Pagination
