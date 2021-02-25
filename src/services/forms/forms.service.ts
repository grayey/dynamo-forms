import { Injectable } from '@angular/core';

import { ApiHandlerService } from '../api-handler.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
    ApiHandlerService.API_BASE_URL = environment.FORMIO_LOGIN_URL;
    const url = 'user/login';
    credentials = {
      data:credentials
    }
    return  this.apiHandler.post(url, credentials);
  }


  /**
   * This method lists all forms in a project
   */
  public getAllForms = () => {
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = 'form';
    return this.apiHandler.get(url);
  }

  /**
   *
   * @param formObject
   * This method creates a custom form
   */
  public createCustomForm = (formObject) => {
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = 'form';
    return this.apiHandler.post(url, formObject);
  }



}
