import React, { useEffect, useState } from "react"
import "../App.css"

function Row({ rowData, handleDeleteInTable, checkedAll, setSelectedData }) {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [role, setRole] = useState()
  const [isEdit, setEdit] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    setName(rowData.name)
    setEmail(rowData.email)
    setRole(rowData.role)
    setChecked(false)
  }, [rowData])

  function handleEdit() {
    setEdit(true)
  }
  function handleSave() {
    setEdit(false)
    console.log("handle save")
  }
  function handleDelete(e) {
    // console.log(e.target)

    const elementToRemove = e.target.parentNode.parentNode.parentNode.childNodes[2].children[0].value
    handleDeleteInTable(elementToRemove)
  }
  useEffect(() => {
    setChecked(checkedAll)
  }, [checkedAll])
  function handleSelectedData(e) {
    let selectedRow = e.target.parentNode.parentNode
    let check = !checked
    setChecked(check)
    if (check) setSelectedData(prev => [...prev, selectedRow.children[2].children[0].value])
    else {
      console.log(selectedRow.children[2].children[0].value)
      setSelectedData(prev => {
        const index = prev.indexOf(selectedRow.children[2].children[0].value)
        console.log(Number(index))
        return [...prev.slice(0, index), ...prev.slice(index + 1)]
      })
    }
  }

  return (
    <>
      <tr>
        <th scope="row">
          {" "}
          <input type="checkbox" onClick={handleSelectedData} checked={checked}></input>{" "}
        </th>
        <td>
          {" "}
          <input className={!isEdit ? "input_edit" : ""} disabled={!isEdit ? "disabled" : ""} onChange={e => setName(e.target.value)} type="text" value={name} />
        </td>
        <td>
          <input className={!isEdit ? "input_edit" : ""} disabled={!isEdit ? "disabled" : ""} onChange={e => setEmail(e.target.value)} type="text" value={email} />
        </td>
        <td>
          {" "}
          <input className={!isEdit ? "input_edit" : ""} disabled={!isEdit ? "disabled" : ""} onChange={e => setRole(e.target.value)} type="text" value={role} />{" "}
        </td>
        <td>
          <span>{!isEdit ? <i onClick={handleEdit} className="fa-solid fa-pen-to-square"></i> : <i onClick={handleSave} class="fa-solid fa-floppy-disk"></i>}</span>
          <span>
            <i onClick={handleDelete} className="fa-solid fa-trash"></i>
          </span>
        </td>
      </tr>
    </>
  )
}

export default Row
