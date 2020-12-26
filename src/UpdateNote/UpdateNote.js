import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import AppContext from '../AppContext'
import NoteError from '../NoteError/NoteError'
import './UpdateNote.css'
import config from '../config'

export default class AddNote extends Component {

  state = {
    name: '',
    content: '',
    folder_id: ''
  }

  static defaultProps = {
    history: {
      push: () => { }
    }
  }

  static contextType = AppContext;


  componentDidMount() {
    console.log(AppContext)
    console.log(this.props.match.params)
    const { noteId } = this.props.match.params
    let note = this.context.notes.find(note => note.id === parseInt(noteId)) || {name: '', content: '', folder_id: ''}
    console.log(note)
    this.setState({
      name: note.name,
      content: note.content,
      folder_id: note.folder_id
    })
  }

  handleChange = e => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const { noteId } = this.props.match.params
    const newNote = {
      name: this.state.name,
      content: this.state.content,
      folder_id: this.state.folder_id,
      modified: new Date(),
      id: parseInt(noteId)
    }

    

    fetch(config.API_ENDPOINT + 'notes/' + `${noteId}`, {
      method: 'PATCH', 
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
      body: JSON.stringify(newNote),
    })
      .then(() => {
        this.context.updateNote(newNote)
        this.props.history.push(`/`)
      })
      .catch(error => {
        console.log({error})
      })
    }

  render(){
    console.log(this.context)
    const { folders=[] } = this.context
    return (
      <section className='UpdateNote'>
        <h2>Update a note</h2>
        <NoteError>
          <NotefulForm onSubmit={this.handleSubmit}>
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name (required)
              </label>
              <input 
                type='text' 
                id='note-name-input' 
                name='name'
                aria-label='Name of note'
                aria-required='true'
                value={this.state.name}
                onChange = {this.handleChange} />
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea 
                id='note-cntent-input' 
                name='content'
                aria-label='Text of note'
                value={this.state.content}
                onChange = {this.handleChange} />
            </div>
            <div className='field'>
              <label html='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select' name='folder_id' onChange = {this.handleChange}>
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
                Update note
              </button>
            </div>
          </NotefulForm>
        </NoteError>
      </section>
    )
  }
}
