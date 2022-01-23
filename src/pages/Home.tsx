
import { useNavigate } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'
import { useContext } from 'react'
import { AuthContext } from '../App'


export function Home(){
  const navigate = useNavigate();
  const {user, signInWithGoogle} = useContext(AuthContext)
  

  

  async function handleCreateRoom(){
   if (!user){
    await signInWithGoogle();
   }

    navigate('/rooms/new');

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustracao simbolizando perguntas e respostas" />
        <strong> Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Make Questions" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator"> ou entre em uma sala</div>
          <form>
            <input 
            type="text"
            placeholder="Digite o codigo da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}