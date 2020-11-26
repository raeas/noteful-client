import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import AppContext from '../AppContext'
import PropTypes from 'prop-types';

export default function Note(props) {

  console.log(props)
  
  const context = useContext(AppContext)

  const defaultProps = {
    onDeleteNote: () => {}
  }

  const handleClickDelete = e => {
    e.preventDefault()
    const noteId = props.id
    console.log(noteId)


  fetch(`http://localhost:9090/notes/${noteId}` , {
    method: 'DELETE', 
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(() => {
      context.deleteNote(noteId)
      // console.log('deleteNote')
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

Note.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired
};
