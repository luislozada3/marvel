import './NotificationMessage.css'

interface NotificationMessageProps {
  type?: 'info' | 'danger'
  message: string
}

const NotificationMessage = ({ type = 'info', message = '' }: NotificationMessageProps) => {
  return (
    <div className="notification">
      <p className={`notification__message notification__message--${type}`}>
        {message}
      </p>
    </div>
  )
}

export default NotificationMessage
