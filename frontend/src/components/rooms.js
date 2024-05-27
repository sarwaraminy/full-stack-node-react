import React, { useEffect, useState } from 'react';
import { LogoutButton } from '../auth/LogoutButton';

const RoomData = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/rooms`);
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  return (
    <>
      <LogoutButton />
      <div className="container">
          <div className="table-container">
              <table className="table">
                  <thead className="sticky-header">
                      <tr>
                      <th>Name</th>
                      <th>Room Number</th>
                      <th>Bed Info</th>
                      </tr>
                  </thead>
                  <tbody>
                      {rooms.map(room =>
                          <tr key={room.room_id}>
                              <td>{room.name}</td>
                              <td>{room.room_number}</td>
                              <td>{room.bed_info}</td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </>
  );
};

export default RoomData;
