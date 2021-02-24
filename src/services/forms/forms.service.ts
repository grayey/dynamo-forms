import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { Observable } from 'rxjs';

@Injectable()
export class FormsService{

  constructor(private apiHandler:ApiHandlerService) {

  }


  /**
   *
   * @param credentials
   * This method logs a user into the form.io platform
   */
  public authenticate =  (credentials): Observable<any> => {
    const url = 'login';
    return  this.apiHandler.post(url, credentials);
  }




}
