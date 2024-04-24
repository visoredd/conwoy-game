import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGrid } from "../store/reducer/gameReducer";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const grids = useSelector((state) => state.gameReducer.gridContainer);
  const handleAddMoreGrid = () => {
    dispatch(
      addGrid( grids?.length)
    );
  };
  return (
    <div>
      <h2>List of Grids</h2>
      <div className="grid-container">
        {grids.map((grid) => (
          <>
            <button className="grid-div" onClick={()=>navigate(`/${grid?.id}`)}>
              {grid?.name}
            </button>
          </>
        ))}
        <button className="grid-div" onClick={handleAddMoreGrid}>
        Add More
      </button>
      </div>
    </div>
  );
};

export default Dashboard;
