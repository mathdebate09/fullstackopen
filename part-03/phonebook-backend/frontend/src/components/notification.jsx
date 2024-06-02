const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  let classMessage = ''

  if (message.toLowerCase().includes('remove') || message.toLowerCase().includes('fail')) {
    classMessage = 'error note'
  } else {
    classMessage = 'info note'
  }

  return (
    <div className={classMessage}>
      {message}
    </div>
  )
}

export default Notification