import React, { Component } from 'react';
import SideBar from '../Sidebar/sidebar';
import './notecard.css';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteNote, fetchSingleNote} from '../../actions';

class NoteCard extends Component {
    state={
        deleteFormShow: false,
        id: 0,
        note: {
            title: '',
            textBody: ''
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        const nuNote =  this.props.notes.filter((note) => {
            return note._id == id});
        this.setState({id: id});
        this.setState({ note: nuNote[0] });

        this.props.fetchSingleNote(id);

    }

    showDeleteHandler(){
        this.setState({deleteFormShow: !this.state.deleteFormShow});
    }

    deleteHandler(){
        const index = this.state.id;
        let nuNotes = this.props.notes.slice();

        function isindex(note) { 
            return note.id == index;
        }

        const idFinder = nuNotes.indexOf(nuNotes.find(isindex));
        nuNotes.splice(idFinder, 1);

        console.log(this.props.note)
        this.props.deleteNote(this.props.note._id);
    }

    render() {
        return (
            <div className="card-page-container">
                {this.state.deleteFormShow ? 
                <div className='delete-overlay'>
                    <div className='delete-container'>
                        <a>Are you sure you want to delete this? </a>
                        <div className='btn-container'>
                            <Link to='/'> <button type='button' className='overlay-btn delete' onClick={()=>this.deleteHandler()}> Delete </button> </Link>
                            <button className='overlay-btn' onClick={()=> this.showDeleteHandler()}> No </button>
                            </div>
                    </div>
                    </div>  : null}
                <SideBar />
                <div className="section-container"> 
                    <div className="edit-delete">
                        <Link to={`/edit/${this.state.id}`}>
                         <a> edit </a> 
                         </Link>  
                         <a onClick={() => this.showDeleteHandler()}> delete </a>
                     </div>
                    <h1 className="notes-title card "> {this.props.note.title}</h1>
                    <a className="single-notes-content"> {this.props.note.textBody} </a>
                 </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return{
        notes: state.notes,
        note: state.note
      }
   }

export default connect (mapStateToProps, {deleteNote, fetchSingleNote}) (NoteCard);
