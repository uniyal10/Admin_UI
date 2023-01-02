import { useState } from "react"
import "./App.css"
import Search from "./components/Search"
import Table from "./components/Table"
function App() {
  const [searchInput, setSearchInput] = useState()
  function setSearch(input) {
    setSearchInput(input)
  }
  return (
    <>
      <div className="conatiner-fluid">
        <Search setSearch={setSearch} />
      </div>
      <Table searchInput={searchInput} />
    </>
  )
}

export default App
