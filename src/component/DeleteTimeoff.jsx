import { useContext, useEffect, useState } from 'react';
import { apiPath } from '../api';
import { TeamDataContext } from '../component/Context';
import { useParams } from 'react-router-dom';

const DeleteTimeoff = () => {
  const { members, teams } = useContext(TeamDataContext);
  const [selectedTimeoff, setSelectedTimeoff] = useState('');
  const [filteredTimeoff, setFilteredTimeoff] = useState([]);
  const { code } = useParams(); 
  const [teamId, setTeamId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const team = teams.find(team => team.team_code === code);
        if (team) {
          setTeamId(team.id);
          const filtered = members.filter(member => member.team_id === team.id);
          const timeoffForMember = filtered.map(member => member.timeoff);
          setFilteredTimeoff(timeoffForMember.flat());
        } else {
          console.error(`Team with code '${code}' not found.`);
          setFilteredTimeoff([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [code, teams, members]);
  

  const handleDeleteTimeoff = async () => {
    if (!selectedTimeoff) {
      alert('Please select a timeoff');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this timeoff?');
    if (confirmDelete) {
      try {
        const response = await fetch(apiPath(`/timeoff/${selectedTimeoff}`), {
          method: 'DELETE',
        });

        if (response.ok) {
          const updatedTimeoff = filteredTimeoff.filter(timeoff => timeoff.id !== selectedTimeoff);
          setFilteredTimeoff(updatedTimeoff);
          alert('Timeoff deleted successfully');
        } else {
          alert('Failed to delete timeoff. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting timeoff:', error);
        alert('An unexpected error occurred. Please try again later.');
      } finally {
        setIsFormVisible(false); 
      }
    }
  };

  const handleTimeoffChange = (e) => {
    setSelectedTimeoff(e.target.value);
  };

  return (
    <div>
      <button onClick={() => setIsFormVisible(true)}>Select timeOff to delete</button>
      {isFormVisible && (
        <div>
          <select id="timeoffSelect" value={selectedTimeoff} onChange={handleTimeoffChange}>
            <option value="">Select a timeoff</option>
            {filteredTimeoff.map(timeoff => (
  timeoff && timeoff.id &&
  <option key={timeoff.id} value={timeoff.id}>{`${timeoff.start_date} ${timeoff.end_date}`}</option>
))}

          </select>
          <button onClick={handleDeleteTimeoff}>Delete Timeoff</button>
        </div>
      )}
    </div>
  );
};

export default DeleteTimeoff;
