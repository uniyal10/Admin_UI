function ComponentName({ setSearch }) {
  return (
    <>
      <div className="container">
        <input on onChange={e => setSearch(e.target.value)} className="search_input" type="text" placeholder="Search by name email or role" autoFocus />
      </div>
    </>
  )
}

export default ComponentName
