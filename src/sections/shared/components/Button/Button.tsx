import './button.css'

interface ButtonProps {
  children?: React.ReactNode | React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const Button = ({ children, type = 'button', disabled = false }: ButtonProps) => {
  return (
    <button type={type} disabled={disabled} className='button'>{children}</button>
  )
}
export default Button
