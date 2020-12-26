import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import AppContext from '../AppContext'
import NoteError from '../NoteError/NoteError'
import config from '../config'
import './AddNote.css'

export default class AddNote extends Component {

  static defaultProps = {
    history: {
      push: () => { }
    }
  }

  static contextType = AppContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folder_id: e.target['note-folder-id'].value,
      modified: new Date(),
    }

    fetch(config.API_ENDPOINT + 'notes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }, 
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.log({error})
      })
    }

  render(){
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NoteError>
          <NotefulForm onSubmit={this.handleSubmit}>
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name (required)
              </label>
              <input 
                type='text' 
                id='note-name-input' 
                name='note-name'
                aria-label='Name of note'
                aria-required='true' />
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea 
                id='note-cntent-input' 
                name='note-content'
                aria-label='Text of note' />
            </div>
            <div className='field'>
              <label html='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select' name='note-folder-id'>
                <option value={null}>...</option>
                {folders.map(folder => 
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
            </div>
            <div className='buttons'>
              <button type='submit'>
                Add note
              </button>
            </div>
          </NotefulForm>
        </NoteError>
      </section>
    )
  }
}

