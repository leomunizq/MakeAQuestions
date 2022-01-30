
import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'


export function Home(){
  const navigate = useNavigate();
  const {user, signInWithGoogle} = useAuth()
  const [roomCode, setRoomCode] = useState('');
  

  

  async function handleCreateRoom(){
   if (!user){
    await signInWithGoogle();
   }

    navigate('/rooms/new');

  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if (roomCode.trim()==='') {
      return
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()) {
      alert('This room does not exist.');
      return;
    }
    if (roomRef.val().endedAt){
      alert('Room already closed.');
      return;
    }
    navigate(`rooms/${roomCode}`)
    
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustracao simbolizando perguntas e respostas" />
        <strong> Create live Q&amp;A rooms</strong>
        <p>Answer your audience's questions in real time.</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Make Questions" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo Google" />
            Create your room with Google
          </button>
          <div className="separator"> or enter a room</div>
          <form onSubmit={handleJoinRoom}>
            <input 
            type="text"
            placeholder="Enter room code"
            onChange={event => setRoomCode(event.target.value )}
            value={roomCode}
            />
            <Button type="submit">Enter the room</Button>
          </form>
        </div>
      </main>
    </div>
  )
}