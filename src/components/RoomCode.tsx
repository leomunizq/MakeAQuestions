import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

// type RoomCodeProps = {
//   code: string;
// } 

export function RoomCode() {
  

  return (
    <button className="room-code">
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #34634543</span>
    </button>
  )
}