import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import deleteImg from '../assets/images/delete.svg'

import '../styles/room.scss'







type RoomParams = {
  id: string;
}

export function AdminRoom(){
const {user} = useAuth();
const params = useParams<RoomParams>();
const [newQuestion, setNewQuestion] = useState('');
const roomId = params.id;

const {questions, title} = useRoom(roomId!);

async function handleDeleteQuestion(questionId: string) {
  if (window.confirm('Are you sure you want to delete')){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }
}

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
         <div>
         <RoomCode code={roomId} />
          <Button isOutlined>Encerrar Sala</Button>
         </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 &&  <span> {questions.length} pergunta(s)</span>  }
        </div>
        

        <div className="question-list">
        {questions.map(questions => {
          return(
            <Question 
            key={questions.id}
            content={questions.content}
            author={questions.author}
            >
              <button 
              type="button"
              onClick= {() => handleDeleteQuestion(questions.id)}
              >
                <img src={deleteImg} alt="Delete Question" />

              </button>
            </Question>
          )
        })}
        </div>

      </main>
    
    </div>
  
  )
}