import { createReducer, on } from "@ngrx/store";
import { setHttpLoading } from "@store/actions/http-loading.actions";
import { HttpLoadingState } from "@store/selectors/http-loading.selector";

const initialState:HttpLoadingState={loading:false,error:null}

export const httpLoadingReducer = createReducer(
    initialState,
    on(setHttpLoading,
    (state:HttpLoadingState,{httpLoading})=>{
      return {...state,loading:httpLoading}
    })
)
