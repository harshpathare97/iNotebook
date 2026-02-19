import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "../components/Noteitem";
// import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const context = useContext(noteContext);
  const { notes, setNotes, getNotes, addNote, editNote, loading } = context;
  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  const handleClick = () => {
    note.id
      ? editNote(note.id, note.title, note.description, note.tag)
      : addNote(note.title, note.description, note.tag);

    refClose.current.click();
    props.showAlert(
      `Note ${note.id ? "Updated" : "Added"} Successfully`,
      "success",
    );
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      getNotes();
      return;
    }
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.tag.toLowerCase().includes(search.toLowerCase()),
    );
    setNotes(filtered);
  };

  return (
    <>
      <div className="row my-3">
        <div className="d-flex justify-content-between align-items-center"> 
          <h2 className="text-center fs-1">Notes</h2>
          <input
            type="search"
            className="form-control w-50"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
        <div className="container mx-2 d-flex justify-content-center">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            notes.length === 0 && "No notes to display"
          )}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
      <button
        className=" position-fixed bottom-0 end-0 m-4 rounded-circle btn btn-primary fs-1"
        style={{ lineHeight: "1" }}
        onClick={() => ref.current.click()}
      >
        +
      </button>

      {/* model */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundColor: "#f8f9fa", width: "100%" }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {note.id ? "Edit Note" : "Add Note"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  setNote({ id: "", title: "", description: "", tag: "" })
                }
              ></button>
            </div>
            <div className="modal-body">
              <form className="flex-column gap-3 d-flex">
                <div>
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={note.description}
                    onChange={onChange}
                    minLength={5}
                    required
                    rows={10}
                    style={{ whiteSpace: "pre-wrap" }} // preserves spacing and line breaks
                  />
                </div>
                <div>
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() =>
                  setNote({ id: "", title: "", description: "", tag: "" })
                }
              >
                Close
              </button>
              <button
                disabled={note.title.length < 5 || note.description.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
