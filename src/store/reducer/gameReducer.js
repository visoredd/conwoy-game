import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  gridContainer: [],
  value:0,
}

export const generateEmptyGrid = (numRows=20,numCols=40) => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  };

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addGrid:(state,action)=>{
        state.gridContainer.push({
            id:parseInt(action.payload),
            grid: generateEmptyGrid(),
            running: false,
            name: "Grid: "+ parseInt(action.payload),
        });
    },
    updateGrid:(state,action)=>{
        let newGrid = [...state?.gridContainer]
        state.gridContainer = newGrid?.map(cell=>{
            if(parseInt(action.payload.id)===parseInt(cell?.id)){
                return {...cell,grid:action.payload.grid,running:action.payload.running}
            }
            return cell
        })
    },
    updateName:(state,action)=>{
        let newGrid = [...state?.gridContainer]
        state.gridContainer = newGrid?.map(cell=>{
            if(parseInt(action.payload.id)===parseInt(cell?.id)){
                return {...cell,name:action.payload.name}
            }
            return cell
        })
    }
  },
})

export const {addGrid,updateGrid,updateName} = gameSlice.actions

export default gameSlice.reducer