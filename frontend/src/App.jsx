import { useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  
  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  }

  return (
    <div className="App">
      <input type="text" placeholder='your pseudo' onChange={(e)=>setUser(e.target.value)}/>
      <input type="text" placeholder='room' onChange={(e)=>setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join room</button>
    </div>
  );
}

export default App;
