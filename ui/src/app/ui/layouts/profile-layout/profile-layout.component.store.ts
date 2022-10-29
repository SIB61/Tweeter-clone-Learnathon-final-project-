import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";

interface ProfileLayoutState{
  id:string,
}

@Injectable()
export class ProfileLayoutStore extends ComponentStore<{}> {
  constructor(){
    super()
  }
}
