import React from "react";
import TicketCard from "./TicketCard";
import { ReactComponent as HighPriorityIcon } from "../Assets/icons/Img - High Priority.svg";
import { ReactComponent as MediumPriorityIcon } from "../Assets/icons/Img - Medium Priority.svg";
import { ReactComponent as LowPriorityIcon } from "../Assets/icons/Img - Low Priority.svg";
import { ReactComponent as UrgentPriorityIcon } from "../Assets/icons/SVG - Urgent Priority colour.svg";
import { ReactComponent as NoPriorityIcon } from "../Assets/icons/No-priority.svg";
import { ReactComponent as AddTaskIcon } from "../Assets/icons/add.svg";
import { ReactComponent as ThreeDotMenuIcon } from "../Assets/icons/3 dot menu.svg";
import { ReactComponent as ToDoIcon } from "../Assets/icons/To-do.svg";
import { ReactComponent as InProgressIcon } from "../Assets/icons/in-progress.svg";
import { ReactComponent as BacklogIcon } from "../Assets/icons/Backlog.svg";

const KanbanBoard = ({ tickets, groupBy, sortBy, users = [] }) => {
  if (!Array.isArray(tickets)) {
    return <div>No tickets available</div>;
  }

  const groupedTickets = groupTickets(tickets, groupBy);
  const sortedTickets = sortTickets(groupedTickets, sortBy);

  const userMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  return (
    <div className="kanban-board">
      {Object.keys(sortedTickets).map((group) => {
        const userName =
          groupBy === "user" ? userMap[group] || "Unknown User" : null;
        const initials = userName ? getInitials(userName) : null;
        const bgColor = initials ? getColorFromInitials(initials) : null;

        return (
          <div className="kanban-column" key={group}>
            <div className="kanban-column-header">
              <div className="left-content">
                {groupBy === "user" ? (
                  <div className="user-header">
                    <div
                      className="initials-circle"
                      style={{ backgroundColor: bgColor }}
                    >
                      {initials}
                    </div>
                    <span className="user-name">{userName}</span>
                  </div>
                ) : (
                  <>
                    {getStatusIconForGroup(group)}
                    {getPriorityIconForGroup(group)}
                    <span>{group}</span>
                  </>
                )}
                <span className="task-count">
                  {sortedTickets[group].length}
                </span>
              </div>
              <div className="right-content">
                <AddTaskIcon className="icons" />
                <ThreeDotMenuIcon className="icons" />
              </div>
            </div>
            {sortedTickets[group].map((ticket) => {
              const ticketUserName = userMap[ticket.userId] || "Unknown User";
              const initials = getInitials(ticketUserName);
              const bgColor = getColorFromInitials(initials);

              return (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  user={ticketUserName}
                  showInitials={groupBy !== "user"}
                  showPriority={groupBy !== "priority"}
                  showStatus={groupBy !== "status"}
                  bgColor={bgColor}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const getInitials = (name) => {
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials;
};

const getColorFromInitials = (initials) => {
  const colors = ["#7CB81C", "#532288", "#45115B", "#0E6144", "#428210"];
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash += initials.charCodeAt(i);
  }
  return colors[hash % colors.length];
};

const getStatusIconForGroup = (group) => {
  switch (group) {
    case "Todo":
      return <ToDoIcon className="status-icon" />;
    case "In progress":
      return <InProgressIcon className="status-icon" />;
    case "Backlog":
      return <BacklogIcon className="status-icon" />;
    default:
      return null;
  }
};

const getPriorityIconForGroup = (group) => {
  switch (group) {
    case "Urgent":
      return <UrgentPriorityIcon className="priority-icon" />;
    case "High":
      return <HighPriorityIcon className="priority-icon" />;
    case "Medium":
      return <MediumPriorityIcon className="priority-icon" />;
    case "Low":
      return <LowPriorityIcon className="priority-icon" />;
    case "No priority":
      return <NoPriorityIcon className="priority-icon" />;
    default:
      return null;
  }
};

const groupTickets = (tickets, groupBy) => {
  const groups = {};
  tickets.forEach((ticket) => {
    let groupKey = "";
    switch (groupBy) {
      case "status":
        groupKey = ticket.status;
        break;
      case "user":
        groupKey = ticket.userId;
        break;
      case "priority":
        groupKey = getPriorityLabel(ticket.priority);
        break;
      default:
        groupKey = "Uncategorized";
    }
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(ticket);
  });
  return groups;
};

const sortTickets = (groupedTickets, sortBy) => {
  const sortedGroups = {};
  Object.keys(groupedTickets).forEach((groupKey) => {
    sortedGroups[groupKey] = [...groupedTickets[groupKey]].sort((a, b) => {
      if (sortBy === "priority") return b.priority - a.priority;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  });
  return sortedGroups;
};

const getPriorityLabel = (priorityLevel) => {
  switch (priorityLevel) {
    case 4:
      return "Urgent";
    case 3:
      return "High";
    case 2:
      return "Medium";
    case 1:
      return "Low";
    case 0:
      return "No priority";
    default:
      return "Unknown";
  }
};

export default KanbanBoard;
