import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import AppContext from '../AppContext'
import NoteError from '../NoteError/NoteError'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    async componentDidMount() {
        let folderRes = await fetch('http://localhost:9090/folders')
        let folders = await folderRes.json()
        let noteRes = await fetch('http://localhost:9090/notes')
        let notes = await noteRes.json()
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
            </>
        );
    }

    render() {
      const value = {
        folders: this.state.folders,
        notes: this.state.notes,
        deleteNote: this.deleteNote,
        addFolder: this.handleAddFolder,
        addNote: this.handleAddNote
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

