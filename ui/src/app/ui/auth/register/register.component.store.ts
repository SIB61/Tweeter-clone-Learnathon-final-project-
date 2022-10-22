import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";


export interface RegisterComponentState {
 isUserNameAvailable:boolean;
}

const initialState={
  isUserNameAvailable:true
}


@Injectable()
export class RegisterComponentStore extends ComponentStore<RegisterComponentState>{
  constructor(){
    super(initialState)
  }

}
