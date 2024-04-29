import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiPath } from '../api';
import TimeoffDetails from "../component/TimeoffDetails";

const TimeoffPage = () => {
  const [timeoff, setTimeoff] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTimeoff = async () => {
      try {
        const response = await fetch(apiPath(`/timeoff/${id}`));
        if (!response.ok) {
          throw new Error("Failed to fetch time off");
        }
        const timeoffData = await response.json();
        setTimeoff(timeoffData);
      } catch (error) {
        console.error("Error fetching time off:", error);
      }
    };

    fetchTimeoff();
  }, [id]);

  if (!timeoff) {
    return <div>Time off data cannot be retrieved...</div>;
  }

  return (
    <div>
      <TimeoffDetails timeoff={timeoff} /> 
    </div>
  );
};

export default TimeoffPage;
