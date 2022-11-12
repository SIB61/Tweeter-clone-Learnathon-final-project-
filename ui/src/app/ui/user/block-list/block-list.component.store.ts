import { state } from '@angular/animations';
import { Statement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { UserModel } from '@shared/models/user.model';
import { AbsBlockService } from '@shared/services/abstract/user/abs-block.service';
import { mergeMap, Observable, tap } from 'rxjs';

interface State {
  blockList: UserModel[];
  loading: boolean;
  pageNumber: number;
}
@Injectable()
export class BlockListComponentStore extends ComponentStore<State> {
  constructor(private blockService: AbsBlockService) {
    super({
      blockList: [],
      loading: false,
      pageNumber: 1,
    });
    this.loadBlockList(this.pageNumber$);
  }
  pageNumber$ = this.select((state) => state.pageNumber);


  pageSize = () => Math.floor(window.innerHeight / 100);
  blockList$ = this.select((state) => state.blockList);
  updateBlockList = this.updater((state, value: UserModel[]) => {
    let newList = [...state.blockList,...value]
    return { ...state, blockList: newList };
  });
  updatePageNumber = this.updater((state)=>({...state,pageNumber:state.pageNumber+1}))
  removeUser = this.updater((state,user:UserModel)=>{
   let updatedState = state
  updatedState.blockList = updatedState.blockList.filter(b=>b.id!=user.id)
    return updatedState
  })

  loadBlockList = this.effect((pageNumber$: Observable<number>) => {
    return pageNumber$.pipe(
      mergeMap((pageNumber) => {
        return this.blockService.getBlockList(pageNumber, this.pageSize()).pipe(
          tap((value) => {
            this.updateBlockList(value);
          })
        );
      })
    );
  });
}
