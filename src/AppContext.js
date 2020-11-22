import React from 'react'

const AppContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {}
})

export default AppContext