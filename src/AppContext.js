import React from 'react'

const AppContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addNote: () => {},
  addFolder: () => {}
})

export default AppContext