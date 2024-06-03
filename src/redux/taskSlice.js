import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dailyTask:0,
    unlockedColors:[],
    newColors:0,
};


const taskSlice = createSlice({
    name:'task',
    initialState,
    reducers:{
        setDailyTask:(state)=>{
            state.dailyTask = state.dailyTask + 1;
        },
        setUnlockedColors:(state,actions)=>{
            if (!state.unlockedColors.includes(actions.payload)) {
                state.unlockedColors.push(actions.payload); // 如果不存在，则将新颜色添加到数组中
            }
        },
        setNewColors:(state)=>{
            state.newColors = state.dailyTask*5
        }

    }
});

export const selectDailyTask = (state) => state.task.dailyTask;
export const selectUnlockedColors = (state) => state.task.unlockedColors;
export const selectNewColors = (state) => state.task.newColors;

export const {setDailyTask,setUnlockedColors,setNewColors} = taskSlice.actions;
export default taskSlice.reducer;