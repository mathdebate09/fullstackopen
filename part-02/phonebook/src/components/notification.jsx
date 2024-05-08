const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  let classMessage = ''

  if (message.toLowerCase().includes('remove')) {
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