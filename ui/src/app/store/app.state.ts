import {HttpLoadingState} from '@store/selectors/http-loading.selector'
import { httpLoadingReducer } from './reducers/http-loading.reducer'
export interface AppState{
  httpLoadingState:HttpLoadingState,
}

export const Reducers  = {
  httpLoadingState:httpLoadingReducer
}
