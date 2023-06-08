import './wrapper.css'

interface WrapperProps {
  children: JSX.Element | JSX.Element[]
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="wrapper">{children}</div>
  )
}
export default Wrapper
