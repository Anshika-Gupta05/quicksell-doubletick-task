import React, { useState, useRef } from "react";
import DisplayIcon from "../Assets/icons/Display.svg";
import DownArrowIcon from "../Assets/icons/down.svg";
const GroupSortControls = ({
  groupBy,
  setGroupBy,
  sortBy,
  setSortBy,
  groups = [],
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="controls-container">
      <div className="display-control">
        <button
          className="display-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <img src={DisplayIcon} alt="Display Icon" className="display-icon" />
          <span>Display</span>
          <img
            src={DownArrowIcon}
            alt="Down Arrow"
            className="down-arrow-icon"
          />
        </button>

        {dropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
            <div className="control">
              <label>Grouping</label>
              <select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div className="control">
              <label>Ordering</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupSortControls;
