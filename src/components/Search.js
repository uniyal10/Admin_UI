import React, { useEffect, useState } from "react"

function ComponentName({ setSearch }) {
  return (
    <>
      <div className="container">
        <input on onChange={e => setSearch(e.target.value)} className="search_input" type="text" />
      </div>
    </>
  )
}

export default ComponentName
