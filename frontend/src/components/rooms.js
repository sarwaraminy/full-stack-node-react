import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LogoutButton } from '../auth/LogoutButton';
import AddRoom from './Add_Room';
import SearchRooms from './SearchRoom';

const RoomData = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRoomList, setFilteredRoomList] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [editRoomId, setEditRoomId] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', roomNumber: '', bedInfo: '' });
  const [editMessage, setEditMessage] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_ADDRESS}/rooms`);
      const data = await response.json();
      setRooms(data);
      setFilteredRoomList(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const sortRooms = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedRooms = [...filteredRoomList].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredRoomList(sortedRooms);
  };

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  const handleSearch = (filteredRooms) => {
    setFilteredRoomList(filteredRooms);
  };

  const handleEditClick = (room) => {
    setEditRoomId(room.room_id);
    setFormData({
      room_id: room.room_id,
      name: room.name,
      roomNumber: room.room_number,
      bedInfo: room.bed_info
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      console.log("Form Data:", formData);
      const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/room/edit/${formData.roomNumber}`, formData);
      console.log("Response:", response);
      fetchRooms();
      setEditRoomId(null);
      setEditMessage(`<font color="green">Record is updated Successfully!</font>`);
    } catch (error) {
      console.error("Error saving room:", error);
      setEditMessage(`<font color="red">Error saving room: ${error}</font>`);
    }
  };

  const handleCancelClick = () => {
    setEditRoomId(null);
    setFormData({ id: '', name: '', roomNumber: '', bedInfo: '' });
    setEditMessage('');
  };

  const handleDeleteClick = async (roomNumber) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_ADDRESS}/room/delete/${roomNumber}`);
      setEditMessage(`<font color="green">Record is Deleted Successfully!</font>`);
      fetchRooms();
    } catch (error) {
      setEditMessage(`<font color="red">Error deleting room: ${error}</font>`);
    }
  };

  return (
    <>
      <LogoutButton />
      <AddRoom fetchRoom={fetchRooms} />
      <div className="container">
        <div className="row border-bottom mb-3">
          <div className="col-md-8">Explore Room Data: Fetched dynamically using ReactJS and RESTful API integration with nodejs</div>
          <div className="col-md-4" dangerouslySetInnerHTML={{ __html: editMessage }}></div>
        </div>
        <SearchRooms roomList={rooms} onSearch={handleSearch} />
        <div className="table-container">
          <table className="table">
            <thead className="sticky-header">
              <tr>
                <th role="button" title="Click here to sort data" onClick={() => sortRooms('name')}>Name{getSortArrow('name')}</th>
                <th role="button" title="Click here to sort data" onClick={() => sortRooms('room_number')}>Room Number{getSortArrow('room_number')}</th>
                <th role="button" title="Click here to sort data" onClick={() => sortRooms('bed_info')}>Bed Info{getSortArrow('bed_info')}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoomList.map(room => (
                <tr key={room.room_id}>
                  {editRoomId === room.room_id ? (
                    <React.Fragment>
                      <td><input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} /></td>
                      <td>{room.room_number}</td>
                      <td><input type="text" className="form-control" name="bedInfo" value={formData.bedInfo} onChange={handleInputChange} /></td>
                      <td>
                        <button className="btn btn-success btn-sm" onClick={handleSaveClick}>Save</button>
                        <button className="btn btn-warning btn-sm ml-2" onClick={handleCancelClick}>Cancel</button>
                        <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteClick(room.room_number)}>Delete</button>
                      </td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <td className='editRoomBtn' title="Click here to update/delete this record" onClick={() => handleEditClick(room)}>{room.name}</td>
                      <td>{room.room_number}</td>
                      <td className='editRoomBtn' title="Click here to update/delete this record" onClick={() => handleEditClick(room)}>{room.bed_info}</td>
                      <td></td>
                    </React.Fragment>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RoomData;
