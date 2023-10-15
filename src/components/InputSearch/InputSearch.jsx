import React from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";
import "./InputSearch.css";

class InputSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.debouncedSearchChange = debounce(this.handleSearchChange, 500);
  }

  handleChange = (event) => {
    const newValue = event.target.value;
    this.setState({ value: newValue });
    this.debouncedSearchChange(newValue);
  };

  handleSearchChange = (value) => {
    const { searchChange } = this.props;
    if (searchChange) {
      searchChange(value);
    }
  };

  render() {
    return (
      <input
        className="input-search"
        type="text"
        placeholder="Type to search..."
        onChange={this.handleChange}
      />
    );
  }
}

InputSearch.propTypes = {
  searchChange: PropTypes.func.isRequired,
};

InputSearch.defaultProps = {
  searchChange: () => {},
};

export default InputSearch;
