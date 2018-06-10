import React, { Component, PropTypes } from 'react';
import Item from './Item';
import FilterComponent from './Filter';

import Masonry from 'react-masonry-component';
 
const masonryOptions = {
    transitionDuration: 0,
    gutter: 20
};

const masonryStyle = {
    margin: 20,
    display: 'flex', 
    justifyContent: 'center'
}

function treatFilter(filter, commits) {
    if(Object.keys(filter).length === 0 && filter.constructor === Object)
        return commits
    else if(filter.type === 'name') {
        return commits.filter(commit => commit.author.login ? commit.author.login.toLowerCase().includes(filter.searchTerm.toLowerCase()) : false)
    }
}

class ListCommits extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(valueToSearch) {
        return valueToSearch.length ?  this.props.actions.filterByName(valueToSearch) : this.props.actions.resetFilter()
    }

    render() {
        const { commits, filter } = this.props

        return (
            <div>
                <FilterComponent onChange={this.handleChange}/>
                <Masonry
                    enableResizableChildren={true}
                    options={masonryOptions}
                    style={masonryStyle}
                >
                    {treatFilter(filter, commits).map((commit, index) => <Item key={index} commit={commit} />)}
                </Masonry>
            </div>
        );
    }
}

ListCommits.propTypes = {
  commits: PropTypes.array.isRequired,
  filter: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default ListCommits;
