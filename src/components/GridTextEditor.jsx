import React, { useState } from "react";

const GridTextEditor = ({ handleClose, handleSubmit,defaultName }) => {
  const [form, setForm] = useState({
    name: defaultName,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <div className="modal">
      <div className="modal-body">
        <h3>Grid Text Editor</h3>
        <div className="modal-grid">
          <label htmlFor="name">Grid Name: </label>
          <input name="name" value={form?.name} onChange={handleChange} />
        </div>
        <div>
          <button
            style={{ padding: "0.2rem", margin: "0.5rem" }}
            onClick={() => handleSubmit(form?.name)}
          >
            Submit
          </button>
          <button
            onClick={handleClose}
            style={{ padding: "0.2rem", margin: "0.5rem" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridTextEditor;
