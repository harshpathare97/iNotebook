import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useParams } from "react-router-dom";

export default function Note(props) {
  const context = useContext(noteContext);
  const { notes } = context;
  let para = useParams();
  const note = notes.find((note) => note._id === para.id);

  if (!note) {
    return <div>Note not found</div>;
  }
  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="mb-3">{note.title}</h2>
          <i
            className="bi bi-copy mx-2"
            onClick={() => {
              navigator.clipboard.writeText(note.description);
              props.showAlert("Note Copied to Clipboard", "success");
            }}
          ></i>
        </div>
        <p style={{ whiteSpace: "pre-wrap" }}>{note.description}</p>
      </div>
    </div>
  );
}
