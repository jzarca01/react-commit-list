import React, { Component, PropTypes } from 'react';
import { DebounceInput } from 'react-debounce-input';

class FilterComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { onChange } = this.props
        return (
            <div><h2>Search by login</h2>
                <DebounceInput
                    debounceTimeout={300}
                    onChange={e => onChange(e.target.value)} />
 
            </div>
        );
    }
}

FilterComponent.propTypes = {
  onChange: PropTypes.func
};

export default FilterComponent;
