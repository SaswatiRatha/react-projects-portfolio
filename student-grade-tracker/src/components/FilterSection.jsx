import React from "react";

class FilterSection extends React.Component{

    render(){
        const {filter, sortBy, handleFilter, handleSortBy} = this.props;
        return(
            <section className="filter-students">
              <div className="filter-section">
                <h3>Filter By:</h3>
                <div className="filter-buttons">
                  <button className={filter === 'all' ? 'active' : ''} onClick={() => handleFilter('all')}>All</button>
                  <button className={filter === 'passed' ? 'active' : ''} onClick={() => handleFilter('passed')}>Passed</button>
                  <button className={filter === 'failed' ? 'active' : ''} onClick={() => handleFilter('failed')}>Failed</button>
                </div>
              </div>
              <div className="sort-section">
                <h3>Sort By Grade:</h3>
                <div className="filter-buttons">
                  <button className={sortBy === 'high' ? 'active' : ''} onClick={()=>handleSortBy('high')}>High to Low</button>
                  <button className={sortBy === 'low' ? 'active' : ''} onClick={()=>handleSortBy('low')}>Low to High</button>
                  <button className={sortBy === 'default' ? 'active' : ''} onClick={()=>handleSortBy('default')}>Set Default</button>
                </div>
              </div>
          </section>
        )
    }
}

export default FilterSection;