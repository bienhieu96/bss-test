import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from "axios";
import { AppThunk } from "typeuser";


interface UserState {
    data: any,
    loading: boolean,
    error: string | null
}

const initialState: UserState = {
    data: [],
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        setDataSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.data = action.payload
        },
        setDataFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {setDataStart, setDataSuccess, setDataFailure} = userSlice.actions;
export default userSlice.reducer;

export const fetchData = (): AppThunk => async(dispatch) => {
    try {
        dispatch(setDataStart());
        const response: AxiosResponse<any> = await axios.get('https://random-data-api.com/api/users/random_user?size=10');
        const data = response.data;
        dispatch(setDataSuccess(data));
    } catch (error : any){
        dispatch(setDataFailure(error.message))
    }
}