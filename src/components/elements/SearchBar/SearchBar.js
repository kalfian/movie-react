import React from 'react'
import FontAwesome from 'react-fontawesome'
import './SearchBar.css'

class SearchBar extends React.Component {
    state = {
        value:''
    }

    timeOut = null;

    doSearch = (e) => {
        this.setState({
            value: e.target.value
        })
        clearTimeout(this.timeOut)

        this.timeOut = setTimeout(()=>{
            this.props.callback(this.state.value)
        }, 500)
        console.log(this.state.value)
    }

    render(){
        return(
            <div className="rmdb-searchbar">
                <div className="rmdb-searchbar-content">
                    <FontAwesome className="rmdb-fa-search" name="search" size="2x" />
                    <input 
                        type="text"
                        className="rmdb-searchbar-input"
                        placeholder="Search"
                        onChange={this.doSearch}
                        value={this.state.value}
                    />
                </div>
            </div>
        )
    }
}

export default SearchBar