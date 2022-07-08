import React from "react";

function SearchBox(props) {
    return (
        <div className="search-cover">
        <div className="search-container" style={{marginTop: props.margin + "px"}}>
            <form onSubmit={props.handleOnSubmit}>
            <input type="text" name="" placeholder="Search..." className="search-input" value={props.searchTerm} onChange={props.handleChange} />
            <button type="submit" className="search-button"><i className="fa fa-search" aria-hidden="true"></i></button>
            </form>
        </div>
        </div>
    );
}

export default SearchBox;