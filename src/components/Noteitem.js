import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";


const Noteitem = (props) => {
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const handleDelete = () => {
    deleteNote(note._id);
    props.showAlert("Note Deleted Successfully", "success");
  };
  return (
    <div className="col-md-3">
      <div className="card my-1">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              
              <i
                className="bi bi-pencil-square mx-2 text-primary"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
              <i
                className="bi bi-trash3 mx-2 text-danger"
                onClick={handleDelete}
              ></i>
            </div>
          </div>
          <div style={{cursor: "pointer"}} onClick={() => navigate(`/note/${note._id}`)}>
            <p
              className="card-text text-truncate"
              // style={{ whiteSpace: "pre-wrap", maxHeight: "120px" }} // preserves spacing and line breaks, limits height, hides overflow
            >
              {note.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
