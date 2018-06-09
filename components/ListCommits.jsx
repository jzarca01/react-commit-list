import React, { Component, PropTypes } from 'react';
import idx from 'idx';
import Item from './Item';

import Masonry from 'react-masonry-component';
 
const masonryOptions = {
    transitionDuration: 0,
    gutter: 20
};

const masonryStyle = {
    margin: 20
}

function sanitizeData(commit) {
    return {
      "author": {
        "login": idx(commit, _ => _.author.login),
        "profile_url": idx(commit, _ => _.author.html_url),
        "image": idx(commit, _ => _.author.avatar_url),
        "name": idx(commit, _ => _.commit.author.name),
        "email": idx(commit, _ => _.commit.author.email)
      },
      "commit": {
        "date": commit.commit.author.date,
        "message": commit.commit.message,
        "url": commit.commit.url
      }
    }
  }

class ListCommits extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { commits } = this.props
        return (
            <div>
                <Masonry
                    enableResizableChildren={true}
                    updateOnEachComponentUpdate={true}
                    options={masonryOptions}
                    style={masonryStyle}
                >
                    {commits.map((commit, index) => <Item key={index} commit={sanitizeData(commit)} />)}
                </Masonry>
            </div>
        );
    }
}

ListCommits.propTypes = {
  commits: PropTypes.array.isRequired
};

export default ListCommits;
