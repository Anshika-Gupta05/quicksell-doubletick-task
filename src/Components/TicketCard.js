import React from "react";
import { ReactComponent as HighPriorityIcon } from "../Assets/icons/Img - High Priority.svg";
import { ReactComponent as MediumPriorityIcon } from "../Assets/icons/Img - Medium Priority.svg";
import { ReactComponent as LowPriorityIcon } from "../Assets/icons/Img - Low Priority.svg";
import { ReactComponent as UrgentPriorityIcon } from "../Assets/icons/SVG - Urgent Priority colour.svg";
import { ReactComponent as NoPriorityIcon } from "../Assets/icons/No-priority.svg";
import { ReactComponent as ToDoIcon } from "../Assets/icons/To-do.svg";
import { ReactComponent as InProgressIcon } from "../Assets/icons/in-progress.svg";
import { ReactComponent as BacklogIcon } from "../Assets/icons/Backlog.svg";

const getStatusIcon = (status) => {
  switch (status) {
    case "Todo":
      return <ToDoIcon />;
    case "In progress":
      return <InProgressIcon />;
    case "Backlog":
      return <BacklogIcon />;
    default:
      return null;
  }
};

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 4:
      return <UrgentPriorityIcon />;
    case 3:
      return <HighPriorityIcon />;
    case 2:
      return <MediumPriorityIcon />;
    case 1:
      return <LowPriorityIcon />;
    case 0:
      return <NoPriorityIcon />;
    default:
      return null;
  }
};
const getInitials = (name) => {
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials;
};

const TicketCard = ({
  ticket,
  showPriority,
  showStatus,
  showInitials,
  user,
  bgColor,
}) => {
  const initials = getInitials(user);

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <h4 className="ticket-id">{ticket.id}</h4>
        {showInitials && (
          <div className="initials-circle" style={{ backgroundColor: bgColor }}>
            {initials}
          </div>
        )}{" "}
      </div>
      <h4 className="ticket-title">
        {showStatus && getStatusIcon(ticket.status)} {ticket.title}
      </h4>
      <div className="ticket-info">
        {showPriority && (
          <button className="priority-btn">
            {getPriorityIcon(ticket.priority)}
          </button>
        )}
        <button className="features-btn">
          <span className="circle"></span>
          <h4 className="ticket-tag">{ticket.tag}</h4>
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
