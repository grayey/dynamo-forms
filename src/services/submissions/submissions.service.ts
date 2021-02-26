import { Injectable } from '@angular/core';

import { ApiHandlerService } from '../api-handler.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable()
export class SubmissionsService{

  constructor(private apiHandler:ApiHandlerService) {

  }


  /**
   *
   * @param credentials
   * This method logs a user into the submission.io platsubmission
   */
  public authenticate =  (credentials): Observable<any> => {
    ApiHandlerService.API_BASE_URL = environment.FORMIO_LOGIN_URL;
    const url = 'user/login';
    credentials = {
      data:credentials
    }
    const authenticationResponse = this.apiHandler.post(url, credentials);
    return authenticationResponse;
  }


  /**
   * This method lists all submissions in a form
   */
  public getAllSubmissions = (formPath) => {
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = `${formPath}/submission`;
    return this.apiHandler.get(url);
  }

  /**
   *
   * @param submissionObject
   * This method creates a custom submission
   */
  public createCustomSubmission = (submissionObject) => {
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = 'submission';
    return this.apiHandler.post(url, submissionObject);
  }

  /**
   *
   * @param submissionObject
   * This method edits a custom submission
   */
  public editCustomSubmission = (submissionObject, submissionId) => {
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = `submission/${submissionId}`;
    return this.apiHandler.put(url, submissionObject);
  }


  /**
   *
   * @param submissionObject
   * This method creates a submission on the portal
  */
 public createSubmissionOnApp = (submissionObject) =>{
    const url = 'submissionio-builder';
    return this.apiHandler.post(url, submissionObject);
  }

  /**
     *
     * @param submissionObject
     * This method updates a submission on the portal
  */
  public updateSubmissionOnApp = (submissionObject, appSubmissionId) =>{
    const url = `submissionio-builder/${appSubmissionId}`;
    return this.apiHandler.put(url, submissionObject);
  }


  /**
   *
   * @param submissionio_id
   * This method gets a submission on the app by its submissionio id
  */
  public getSubmissionFromAppBySubmissionioId = (submissionio_id) =>{
    const url = `submissionio-builder/submissionio/${submissionio_id}`;
    return this.apiHandler.get(url);
  }

  /**
   *
   * @param submission_name
   * This method gets a submission from submissionio by name
   */
  public getSubmissionFromSubmissionioByName = (submission_name) =>{
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = `submission?name__regex=/^${submission_name}/i`;
    return this.apiHandler.get(url);
  }

  /**
   *
   * @param submission_id
   * This method launches a submission on the portal
   */
  public launchSubmission = (submission_id) => {
    const url = `${submission_id}`
    return this.apiHandler.get(url);
  }

  /**
   *
   * @param submission_id
   * This method deletes a submission on the portal
   */
  public deleteSubmissionFromApp = (submission_id) => {
    const url = `${submission_id}`
    return this.apiHandler.get(url);
  }


  /**
   *
   * @param submissionio_id
   * This method deletes a submission from submissionio
   */
  public deleteSubmissionFromSubmissionio = (submission_path) => {
    ApiHandlerService.API_BASE_URL = environment.FORMIO_PROJECT_URL;
    const url = `${submission_path}`
    return this.apiHandler.delete(url);
  }

}
