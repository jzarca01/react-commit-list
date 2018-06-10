import React, { Component, PropTypes } from 'react';
import SearchBar from 'material-ui-search-bar'


class FilterComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { onChange } = this.props
        return (
            <div>
                <SearchBar
                    hintText={"Search by login"}
                    onChange={value => onChange(value)}
                    onRequestSearch={value => onChange(value)}
                    style={{
                        margin: '0 auto',
                        maxWidth: 800
                    }}
                />
            </div>
        );
    }
}

FilterComponent.propTypes = {
  onChange: PropTypes.func
};

export default FilterComponent;
