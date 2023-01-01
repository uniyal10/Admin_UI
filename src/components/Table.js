import React, { useEffect, useState } from "react"
import Row from "./Row"
import Pagination from "./Pagination"
import Axios from "axios"

function Table() {
  const [tableData, setTableData] = useState([])
  const [currentRecords, setCurrentRecords] = useState([])
  const [recordsPerPage] = useState(10)
  const [NumberOfPages, setNumberOfPages] = useState(0)
  const [currentPage, setCurrentPage] = useState()
  const [checkedAll, setCheckedAll] = useState(false)
  const [selectedData, setSelectedData] = useState([])

  useEffect(() => {
    function fetchData() {
      Axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then(function (response) {
          setTableData(response.data)
          setNumberOfPages(Math.ceil(response.data.length / recordsPerPage))
          //setCurrentPageNumber(1)
        })
        .catch(function (err) {
          console.log(err)
        })
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log(tableData)
    setCurrentPageNumber(currentPage)
    setNumberOfPages(Math.ceil(tableData.length / recordsPerPage))
  }, [tableData])
  function handleDeleteInTable(elementToRemove) {
    console.log(elementToRemove)
    const data = tableData.filter(d => d.email != elementToRemove)
    console.log(data)
    setTableData(data)
  }
  function setCurrentPageNumber(page) {
    setCurrentPage(page)
    console.log(page * recordsPerPage - 10)
    console.log(page * recordsPerPage)
    setCurrentRecords(tableData.slice(page * 10 - 10, page * 10))
    setCheckedAll(false)
    //console.log(currentRecords)
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
          <Pagination setCurrentPage={setCurrentPageNumber} numPage={NumberOfPages} />
        </div>
      </div>
    </>
  )
}

export default Table
