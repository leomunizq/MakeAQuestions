import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Questions';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import '../styles/room.scss'







type RoomParams = {
  id: string;
}

export function AdminRoom(){
const {user} = useAuth();
const params = useParams<RoomParams>();
const [newQuestion, setNewQuestion] = useState('');
const roomId = params.id;
const navigate = useNavigate();

const {questions, title} = useRoom(roomId!);


async function handleEndRoom(){
  database.ref(`rooms/${roomId}`).update({
    endedAt: new Date(),
  })
  navigate('/');
}


async function handleDeleteQuestion(questionId: string) {
  if (window.confirm('Are you sure you want to delete')){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }
}

async function handleCheckQuestionAsAnswered(questionId: string){
  await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ 
isAnswered: true,
  });

}

async function handleHighlightQuestion(questionId: string){
  await database.ref(`rooms/${roomId}/questions/${questionId}`).update({ 
    isHighlighted: true,
  });
  
}

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
         <div>
         <RoomCode code={roomId} />
          <Button isOutlined onClick={handleEndRoom}>Close room</Button>
         </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Room {title}</h1>
          { questions.length > 0 &&  <span> {questions.length} Question(s)</span>  }
        </div>
        

        <div className="question-list">
        {questions.map(questions => {
          return(
            <Question 
            key={questions.id}
            content={questions.content}
            author={questions.author}
            isAnswered={questions.isAnswered}
            isHighlighted={questions.isHighlighted}
            >
              {!questions.isAnswered && (
                <>
              <button 
              type="button"
              onClick= {() => handleCheckQuestionAsAnswered(questions.id)}
              >
                <img src={checkImg} alt="Check Question" />
              </button>
              <button 
              type="button"
              onClick= {() => handleHighlightQuestion(questions.id)}
              >
                <img src={answerImg} alt="Highlight the Question." />
              </button>
              </>
              )}
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