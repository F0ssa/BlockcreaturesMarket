import React from 'react'

const styles: { [key: string]: React.CSSProperties } = {
  errorTitle: {
    marginTop: '30px',
    color: 'white',
    textAlign: 'center',
  },
  errorContent: {
    marginTop: '30px',
    color: 'hsl(0, 0%, 85%)',
    textAlign: 'center',
  },
}

export const Unknown = () => {
  return (
    <div>
      <h1 style={styles.errorTitle}>Error 404</h1>
      <h2 style={styles.errorContent}>Page does not exist!</h2>
    </div>
  )
}
