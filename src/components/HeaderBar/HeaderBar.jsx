import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tabs } from "antd";

import "./HeaderBar.css";

function HeaderBar({ onChange }) {
  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
    onChange(key);
  };

  const items = [
    {
      key: "1",
      label: "Search",
    },
    {
      key: "2",
      label: "Rated",
    },
  ];

  return (
    <div className="header-bar">
      <Tabs activeKey={activeTab} items={items} onChange={handleTabChange} />
    </div>
  );
}
HeaderBar.propTypes = {
  onChange: PropTypes.func.isRequired,
};

HeaderBar.defaultProps = {
  onChange: () => {},
};
export default HeaderBar;
