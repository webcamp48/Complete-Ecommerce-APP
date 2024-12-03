import React from "react";
import { Link } from "react-router-dom";

const DropDownMenu = ({ menuItems }) => {
  return (
    <ul className="dropdownmenu">
      {menuItems.map((item, index) => (
        <li key={index} className="dropdownmenu-item">
          {item.icon}
          <h3><Link to={item.route}>{item.text}</Link></h3>
        </li>
      ))}
    </ul>
  );
};

export default DropDownMenu;
