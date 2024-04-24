import React, { useState } from "react";

const GridSizeEditor = ({ handleClose, handleSubmit,defaultRows,defaultCols }) => {
  const [form, setForm] = useState({
    rows: defaultRows,
    cols: defaultCols,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <div className="modal">
      <div className="modal-body">
        <h3>Grid Size Editor</h3>
        <div className="modal-grid">
          <label htmlFor="rows">Rows: </label>
          <input name="rows" value={form?.rows} type='number' onChange={handleChange} />
          <label htmlFor="cols">Cols: </label>
          <input name="cols" value={form?.cols} type="number" onChange={handleChange} />
        </div>
        <div>
          <button
            style={{ padding: "0.2rem", margin: "0.5rem" }}
            onClick={() => handleSubmit(form?.rows, form?.cols)}
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

export default GridSizeEditor;
