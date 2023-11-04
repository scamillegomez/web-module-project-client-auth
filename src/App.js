import React from 'react';
import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Link, Routes, Route, Navigate, Redirect, Switch } from 'react-router-dom';
import FriendsList from './components/FriendsList';
import { useState } from 'react';
import AddFriend from './components/AddFriend';
import { axiosWithAuth } from './util/axiosWithAuth';
import Logout from './components/Logout';

const initialFriendsList = [];
const initialFormValues = {
  name: '',
  email: ''
}

function App() {
  const token = localStorage.getItem('token');
  const [formValues, setFormValues] = useState(initialFormValues);
  const [friends, setFriends] = useState(initialFriendsList);


  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const postNewFriend = newFriend => {
    axiosWithAuth().post(`http://localhost:9000/api/friends`, newFriend)
      .then(res => {
        console.log(res);
        setFriends(res.data);
      })
      .catch(err => console.log(err))
      .finally(setFormValues(initialFormValues))
  }

  const handleSubmit = () => {
    const newFriend = {
      name: formValues.name.trim(),
      email: formValues.email.trim()
    }

    postNewFriend(newFriend);
  }

  return (
    <div className="App">
      <h2>FRIENDS DATABASE</h2>
      <nav>
        <Link to="/login">LOGIN</Link> {' '}
        <Link to="/protected/friends">FRIENDS</Link>{' '}
        <Link to="/protected/addfriend">ADDFRIEND</Link>{' '}
        <Link to="/logout">LOGOUT</Link>
      </nav>
      <Routes>
        <Route path='/protected/friends'
          element={token ? <FriendsList friends={friends} setFriends={setFriends} /> : <Navigate to="/login" replace />} />
        <Route path='/protected/addfriend'
          element={token ? <AddFriend 
                              friends={friends} 
                              setFriends={setFriends} 
                              values = {formValues}
                              handleChange={handleChange}
                              handleSubmit={handleSubmit}
                            /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={token ? <Logout /> : <Navigate to="/login" replace />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}

export default App;
