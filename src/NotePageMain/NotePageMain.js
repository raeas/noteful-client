import React, { useContext } from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import AppContext from '../AppContext'
import { findNote } from '../notes-helpers'
import { Link } from 'react-router-dom';

export default function NotePageMain(props) {
  console.log(props)
  const context = useContext(AppContext)
  const {noteId} = props.match.params;
  const note = findNote(context.notes, noteId) || { content: '' };
  const onDeleteNote = () => {
    console.log('deleting')
    props.history.push('/')
  }

  console.log(context)

  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
        onDeleteNote={onDeleteNote}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
      <h2>
        <Link to={`/edit/${noteId}`}>Update Note</Link>{' '}
      </h2>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
