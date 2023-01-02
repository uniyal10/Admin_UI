import React, { useEffect, useState } from "react"
import Row from "./Row"
import Pagination from "./Pagination"
import Axios from "axios"

function Table({ searchInput }) {
  const [tableData, setTableData] = useState([])
  const [currentRecords, setCurrentRecords] = useState([])
  const [recordsPerPage] = useState(10)
  const [NumberOfPages, setNumberOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [checkedAll, setCheckedAll] = useState(false)
  const [selectedData, setSelectedData] = useState([])
  const [searchData, setSearchData] = useState([])

  useEffect(() => {
    function fetchData() {
      Axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then(function (response) {
          setTableData(response.data)
          setSearchData(response.data)

          setNumberOfPages(Math.ceil(response.data.length / recordsPerPage))
        })
        .catch(function (err) {
          console.log(err)
        })
    }
    fetchData()
  }, [])

  useEffect(() => {
    let searchdata = searchData.filter(data => {
      return data.name.toLowerCase().includes(searchInput.toLowerCase()) || data.email.toLowerCase().includes(searchInput.toLowerCase()) || data.role.toLowerCase().includes(searchInput.toLowerCase())
    })
    setTableData(searchdata)
    setNumberOfPages(Math.ceil(tableData.length / recordsPerPage))
    setCurrentPage(1)
  }, [searchInput])

  useEffect(() => {
    setCurrentPageNumber(currentPage)
    setNumberOfPages(Math.ceil(tableData.length / recordsPerPage))
  }, [tableData])
  function handleDeleteInTable(elementToRemove) {
    const data = tableData.filter(d => d.email !== elementToRemove)
    setTableData(data)
    setSearchData(data)
  }
  function setCurrentPageNumber(page) {
    setCurrentPage(page)

    setCurrentRecords(tableData.slice(page * 10 - 10, page * 10))
    setCheckedAll(false)
  }

  function handleSelectAll(e) {
    const ischecked = e.target.checked
    setCheckedAll(ischecked)

    let selectedData = []
    if (ischecked) {
      currentRecords.map(data => {
        selectedData.push(data.email)
      })
      setSelectedData(selectedData)
    } else {
      setSelectedData(selectedData)
    }
  }

  function handleDeleteSelected() {
    let tabledata = tableData.filter(data => selectedData.indexOf(data.email) < 0)
    setTableData(tabledata)
    setSearchData(tabledata)
  }
  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <input type="checkbox" onClick={handleSelectAll} checked={checkedAll}></input>{" "}
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((rowData, index) => {
              return <Row key={index} rowData={rowData} handleDeleteInTable={handleDeleteInTable} checkedAll={checkedAll} setSelectedData={setSelectedData} />
            })}
          </tbody>
        </table>
        <div className="d-flex  flex-row justify-content-between align-items-start">
          <button onClick={handleDeleteSelected} className="btn btn-danger">
            Delete selected
          </button>
          <Pagination setCurrentPage={setCurrentPageNumber} numPage={NumberOfPages} currentPage={currentPage} />
        </div>
      </div>
    </>
  )
}

export default Table
