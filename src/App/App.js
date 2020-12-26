import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import UpdateNote from '../UpdateNote/UpdateNote'
import AppContext from '../AppContext'
import config from '../config'
// import NoteError from '../NoteError/NoteError'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    async componentDidMount() {
        let noteRes = await fetch(config.API_ENDPOINT `${notes}` , 
          {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${config.API_KEY}`
          }
        })
        let notes = await noteRes.json()
        let folderRes = await fetch(`http://localhost:8000/api/folders`, 
          {
          method: 'GET',
          headers: {
            'authorization': `Bearer f77374c8-375b-11eb-adc1-0242ac120002`
          }
        })
        let folders = await folderRes.json()
        this.setState({folders, notes})
    }

    async componentDidMount() {
      let noteRes = await fetch(`http://localhost:8000/api/notes` , 
        {
        method: 'GET',
        headers: {
          'authorization': `Bearer f77374c8-375b-11eb-adc1-0242ac120002`
        }
      })
      let notes = await noteRes.json()
      let folderRes = await fetch(`http://localhost:8000/api/folders`, 
        {
        method: 'GET',
        headers: {
          'authorization': `Bearer f77374c8-375b-11eb-adc1-0242ac120002`
        }
      })
      let folders = await folderRes.json()
      this.setState({folders, notes})
  }

    deleteNote = (noteId) => {
      console.log(noteId)
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      })
    }

    handleAddFolder = folder => {
      this.setState({
        folders: [
          ...this.state.folders,
          folder
        ]
      })
    }

    handleAddNote = note => {
      this.setState({
        notes: [
          ...this.state.notes,
          note
        ]
      })
    }

    updateNote = updatedNote => {
      console.log(updatedNote)
      this.setState({
        notes: this.state.notes.map(note => note.id === updatedNote.id ? updatedNote : note)
      }, () => console.log(this.state.notes))
    }
    
    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route 
                  path="/note/:noteId" 
                  component={NotePageNav} />
                <Route 
                  path="/add-folder"
                  component={NotePageNav} />
                <Route 
                  path="/add-note" 
                  component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route
                  path='/note/:noteId'
                  component={NotePageMain}
                />
                <Route 
                  path='/add-folder' 
                  component={AddFolder} 
                />
                <Route 
                  path='/add-note' 
                  component={AddNote} 
                />
                <Route
                  path='/edit/:noteId'
                  component={UpdateNote}
                />
            </>
        );
    }

    render() {
      const value = {
        folders: this.state.folders,
        notes: this.state.notes,
        deleteNote: this.deleteNote,
        addFolder: this.handleAddFolder,
        addNote: this.handleAddNote,
        updateNote: this.updateNote
      }
        return (
          <AppContext.Provider value={value}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
          </AppContext.Provider>
        );
    }
}

export default App;

