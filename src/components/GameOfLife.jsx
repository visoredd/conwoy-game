// GameOfLife.js

import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { generateEmptyGrid, updateGrid, updateName } from "../store/reducer/gameReducer";

import produce from "immer";
import GridSizeEditor from "./GridSizeEditor";
import GridTextEditor from "./GridTextEditor";

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const GameOfLife = () => {
  const gridId = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const grids = useSelector((state) => state.gameReducer.gridContainer);
  const {
    name: gridName,
    grid: mainGrid,
    running: mainRunning,
  } = grids[gridId?.id];


  const [grid, setGrid] = useState(mainGrid);
  const [running, setRunning] = useState(mainRunning);
  const [openSizeEditor,setOpenSizeEditor] = useState(false);
  const [openTextEditor,setOpenTextEditor] = useState(false);

  const numRows = grid.length;
  const numCols = grid[0].length;
  const runningRef = useRef(running);

  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if (g[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 100);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      dispatch(
        updateGrid({
          id: gridId?.id,
          grid: grid,
          running: running,
        })
      );
    };
  }, [dispatch, grid, running, gridId]);

  useEffect(() => {
    runSimulation();
  }, [runSimulation]);

  const handleSubmitSizeEditor = (rows,cols)=>{
    setGrid(generateEmptyGrid(parseInt(rows), parseInt(cols)));
    setOpenSizeEditor(false)
  }

  const handleSubmitTextEditor = (name)=>{
    dispatch(updateName({id:gridId?.id,name:name}))
    setOpenTextEditor(false)
  }

  return (
    <>
      <h2>{gridName}</h2>
      <div className="grid-container grid-row">
        <button
          className="grid-div"
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button
          className="grid-div"
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
              rows.push(
                Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }
            setGrid(rows);
          }}
        >
          Randomize
        </button>
        <button
          className="grid-div"
          onClick={() => {
            setGrid(generateEmptyGrid());
          }}
        >
          Reset
        </button>
        <button
          className="grid-div"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Home
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][j] = grid[i][j] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : undefined,
                border: "solid 1px gray",
              }}
            />
          ))
        )}
      </div>
      <div className="grid-container grid-row">
        <button className="grid-div" onClick={()=>setOpenTextEditor(true)}>Grid Name Editor</button>
        <button className="grid-div" onClick={()=>setOpenSizeEditor(true)}>Grid Size Customizer</button>
      </div>
      {openSizeEditor && <GridSizeEditor handleClose={()=>setOpenSizeEditor(false)} handleSubmit={handleSubmitSizeEditor} defaultRows={numRows} defaultCols={numCols} />}
    {openTextEditor && <GridTextEditor handleClose={()=>setOpenTextEditor(false)} handleSubmit={handleSubmitTextEditor} defaultName={gridName} />}
    </>
  );
};

export default GameOfLife;
