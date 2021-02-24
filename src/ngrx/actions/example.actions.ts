import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Example } from "../../models/example.model";

export const ADD_EXAMPLE = '[EXAMPLE] Add';
export const REMOVE_EXAMPLE = '[EXAMPLE] Remove';

export class AddExample implements Action {
  readonly type = ADD_EXAMPLE;

  constructor(public payload:Example){}
}


export class RemoveExample implements Action {
  readonly type = REMOVE_EXAMPLE;

  constructor(public payload){}
}




export type Actions = AddExample|RemoveExample;
