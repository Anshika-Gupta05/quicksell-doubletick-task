import React, { useState, useEffect } from "react";
import axios from "axios";
import KanbanBoard from "./Components/KanbanBoard";
import GroupSortControls from "./Components/GroupSortControls";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(
    localStorage.getItem("groupBy") || "status"
  );
  const [sortBy, setSortBy] = useState(
    localStorage.getItem("sortBy") || "priority"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("groupBy", groupBy);
    localStorage.setItem("sortBy", sortBy);
  }, [groupBy, sortBy]);

  return (
    <div>
      <GroupSortControls
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <KanbanBoard
        tickets={tickets}
        groupBy={groupBy}
        sortBy={sortBy}
        users={users}
      />
    </div>
  );
};

export default App;
