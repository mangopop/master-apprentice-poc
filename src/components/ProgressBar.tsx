const ProgressBar = ({
  bgcolor,
  completed,
}: {
  bgcolor: string
  completed: string
}) => {
  const containerStyles = {
    height: 20,
    backgroundColor: '#e0e0de',
    margin: 20,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  }
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}></span>
      </div>
    </div>
  )
}

export default ProgressBar
