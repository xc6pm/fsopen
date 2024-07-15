import "./notification.css"

const Notification = ({ message }) => {
    if (!message)
        return null

    return (
        <div className={message.type + " border"}>
            {message.text}!
        </div>
    )
}

export default Notification