// import { createSelector } from "@ngrx/store";
// import { AppState } from '@store/app.state'
export interface HttpLoadingState{
  loading:boolean,
  error:string|null
}

// export const httpLoadingSelector = createSelector(
//   (state:AppState)=>state.httpLoadingState.loading,
//   (state:AppState)=>state.httpLoadingState.error,
//   (loading:boolean,error:string)=> {
//      return loading && error === null
//   }
// )
//
