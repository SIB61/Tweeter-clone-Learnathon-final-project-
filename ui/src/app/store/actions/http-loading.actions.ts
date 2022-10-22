import { createAction, props } from "@ngrx/store";
export const setHttpLoading = createAction("[Http loading] global" , props<{httpLoading:boolean}>())
export const setHttpError = createAction("[Http loading] global" , props<{error:string|null}>())
