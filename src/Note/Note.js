import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import AppContext from '../AppContext'
import config from '../config'

export default function Note(props) {
  
  const context = useContext(AppContext)

  const handleClickDelete = e => {
    e.preventDefault()
    const noteId = props.id
    console.log(noteId)

    fetch(config.API_ENDPOINT + 'notes/' + `${noteId}`, {
      method: 'DELETE', 
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
    })
    .then(() => {
      context.deleteNote(noteId)
      props.onDeleteNote()
    })
    .catch(error => {
      console.error({ error })
    })
  }

  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button' onClick={handleClickDelete}>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
