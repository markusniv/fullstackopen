const FindCountry = (props) => {

    return(
        <>
            find countries <input value={props.newSearch}
                                  onChange={props.handleSearchChange}
            />
        </>
    )
}

export default FindCountry