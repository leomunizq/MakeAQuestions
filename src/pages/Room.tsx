import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss'


export function Room(){
  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="logo" />
          <RoomCode/>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span> 4 pergunta(s)</span> 
        </div>
        <form>
          <textarea 
          placeholder="O que voce quer perguntar?"/>
          <div className="form-footer">
            <span>para enviar uma pergunta, <button>faca login</button>.</span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>

      </main>
    
    </div>
  
  )
}