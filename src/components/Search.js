import React from "react";
import './Search.css';

class Search extends React.Component {
    state = {
        search: '',
        type: 'all',
        page: 1
        
    }

    handleKey = (even) => {
        if (even.key === 'Enter') {
            this.props.searchMovies(this.state.search, this.state.type);
        }
    }
    handFilter = (event) => {
        this.setState(() => ({type: event.target.dataset.type}), 
        () => this.props.searchMovies(this.state.search, this.state.type))
    }

    prevPage = () => {
        this.setState(
            () => (this.state.page > 1 ? { page: this.state.page - 1} : {page: 1}),
            () => this.props.searchMovies(this.state.search, this.state.type, this.state.page)
        )

    }

    nextPage = () => {
        this.setState(
            () => ({ page: this.state.page + 1}),
            () => this.props.searchMovies(this.state.search, this.state.type, this.state.page)
        )
    }

    setPage = (num) => {
        this.setState(
            () => ( {page: num }),
            () => this.props.searchMovies(this.state.search, this.state.type, this.state.page)
        )
    }

    render(){
        let limit = 10;
        let totalPages = Math.ceil(this.props.totalCount / limit);
        let lastIndex = totalPages <= 10 ? totalPages + 1 : this.state.page + limit;
        let firstIndex = totalPages <= 10 ? lastIndex - limit + lastIndex + 1 :
        lastIndex - limit;
        let num = [];
        for(let i = 0; i <= totalPages; i++){
            num.push(i);
        }
        return (
            <>
                <div className="search">
                    <input
                        type="search"
                        placeholder="search"
                        value={this.state.search}
                        onChange={(e) => this.setState({ search: e.target.value })}
                        onKeyDown={this.handleKey}

                    />
                    <button className="btn"
                        onClick={() => this.props.searchMovies(this.state.search, this.state.type)}>
                        Search
                    </button>
                </div>
                <div className="radio">
                    <input type="radio" name="type" id='all'
                    data-type='all'
                    checked={this.state.type === 'all'}
                    onChange={this.handFilter} />
                    <label htmlFor="all"><span>All</span></label>
                    
                    <input type="radio" name="type" id='movies'
                    data-type='movie'
                    checked={this.state.type === 'movie'}
                    onChange={this.handFilter} />
                    <label htmlFor="movies"><span>Movies only</span></label>

                    <input type="radio" name="type" id='series'
                    data-type='series'
                    checked={this.state.type === 'series'}
                    onChange={this.handFilter} />
                    <label htmlFor="series"><span>Series only</span></label>

                    <input type="radio" name="type" id='games'
                    data-type='game'
                    checked={this.state.type === 'game'}
                    onChange={this.handFilter} />
                    <label htmlFor="games"><span>Game only</span></label>
                </div>
                <div className="navigation">
                    <button className="btn" onClick={this.prevPage}>Previous page</button>
                    {
                        num
                        .slice(firstIndex, lastIndex)
                        .map((el, index) => (
                            <button
                            className="btn" 
                            key={index}
                            style={{ background: this.state.page !== el ? 'gray' : ""}}
                            onClick={() => (this.setPage(el))}
                            >{el}</button>
                        ))
                    }
                    <button className="btn" onClick={this.nextPage}>/Next page</button>
                </div>

            </>
        )

    }
}
export default Search;