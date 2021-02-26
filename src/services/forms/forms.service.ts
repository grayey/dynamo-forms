import { Injectable } from '@angular/core';

import { ApiHandlerService } from '../api-handler.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Formio } from "angular-formio";


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
    const authenticationResponse = this.apiHandler.post(url, credentials);
    Formio.setToken(localStorage.getItem('X_JWT_TOKEN'));
    return authenticationResponse;
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

  /**
   *
   * @param formObject
   * This method edits a custom form
   */
  public editCustomForm = (formObject, formId) => {
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = `form/${formId}`;
    return this.apiHandler.put(url, formObject);
  }


  /**
   *
   * @param formObject
   * This method creates a form on the portal
  */
 public createFormOnApp = (formObject) =>{
    const url = 'formio-builder';
    return this.apiHandler.post(url, formObject);
  }

  /**
     *
     * @param formObject
     * This method updates a form on the portal
  */
  public updateFormOnApp = (formObject, appFormId) =>{
    const url = `formio-builder/${appFormId}`;
    return this.apiHandler.put(url, formObject);
  }


  /**
   *
   * @param formio_id
   * This method gets a form on the app by its formio id
  */
  public getFormFromAppByFormioId = (formio_id) =>{
    const url = `formio-builder/formio/${formio_id}`;
    return this.apiHandler.get(url);
  }

  /**
   *
   * @param form_name
   * This method gets a form from formio by name
   */
  public getFormFromFormioByName = (form_name) =>{
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = `form?name__regex=/^${form_name}/i`;
    return this.apiHandler.get(url);
  }

  /**
   *
   * @param form_id
   * This method launches a form on the portal
   */
  public launchForm = (form_id) => {
    const url = `${form_id}`
    return this.apiHandler.get(url);
  }

  /**
   *
   * @param form_id
   * This method deletes a form on the portal
   */
  public deleteFormFromApp = (form_id) => {
    const url = `${form_id}`
    return this.apiHandler.get(url);
  }


  /**
   *
   * @param formio_id
   * This method deletes a form from formio
   */
  public deleteFormFromFormio = (form_path) => {
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = `${form_path}`
    return this.apiHandler.delete(url);
  }

}
