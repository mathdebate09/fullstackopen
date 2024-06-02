const Filter = ({ searchKey, setSearchKey }) => {
    const handleSearchChange = (e) => {
        setSearchKey(e.target.value)
    }

    return (
        <form>
            <div>
                filter shown with: <input value={searchKey} onChange={handleSearchChange} />
            </div>
        </form>
    )
}

export default Filter