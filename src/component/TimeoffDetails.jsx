import React from "react";
import DeleteTimeoff from "./DeleteTimeoff"; 

function TimeoffDetails({ timeoff }) {
  return (
    <div className="timeoff-details">
      <h2>{timeoff.description}</h2>
      <p>Start Date: {timeoff.start_date}</p>
      <p>End Date: {timeoff.end_date}</p>

      <div className="form-container">
        <DeleteTimeoff timeoffId={timeoff.id} />
      </div>
    </div>
  );
}

export default TimeoffDetails;
