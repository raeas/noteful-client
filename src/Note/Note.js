import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import AppContext from '../AppContext'

export default function Note(props) {

  console.log({props})
  
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
      console.log('deleteNote')
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

// export default class Note extends React.Component {
  
//   static context = useContext(AppContext)

//   static defaultProps = {
//     onDeleteNote: () => {}
//   }

//   handleClickDelete = e => {
//     e.preventDefault()
//     const noteId = this.props.id

//   fetch(`http://localhost:9090/notes/${noteId}` , {
//     method: 'DELETE', 
//     headers: {
//       'content-type': 'application/json'
//     },
//   })
//     .then( res => {
//       if (!res.ok)
//         return res.json().then(e => Promise.reject(e))
//       return res.json()
//     })
//     .then(() => {
//       this.context.deleteNote(noteId)
//       this.props.onDeleteNote(noteId)
//     })
//     .catch(error => {
//       console.error({ error })
//     })
//   }

//   render() {
//     return (
//       <div className='Note'>
//         <h2 className='Note__title'>
//           <Link to={`/note/${this.props.id}`}>
//             {this.props.name}
//           </Link>
//         </h2>
//         <button className='Note__delete' type='button' onClick={() => this.context.deleteNote(this.props.id)}>
//           <FontAwesomeIcon icon='trash-alt' />
//           {' '}
//           remove
//         </button>
//         <div className='Note__dates'>
//           <div className='Note__dates-modified'>
//             Modified
//             {' '}
//             <span className='Date'>
//               {format(this.props.modified, 'Do MMM YYYY')}
//             </span>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }