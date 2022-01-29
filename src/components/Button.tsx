import { ButtonHTMLAttributes } from "react"

import '../styles/button.scss'

type ButttonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({isOutlined = false, ...props}: ButttonProps){
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}` }{...props}/>
  )
}