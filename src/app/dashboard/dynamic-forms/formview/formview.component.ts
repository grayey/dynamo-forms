import {  Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormsService } from '../../../../services/forms/forms.service';
import { AuthCredentials } from '../config';
import { environment } from "../../../../environments/environment";


declare const $:any;

@Component({
  selector: 'app-formview',
  templateUrl: './formview.component.html',
  styleUrls: ['./formview.component.css']
})
export class FormviewComponent implements OnInit, OnDestroy {

  public formPath = environment.FORMIO_PROJECT_URL;
  public formTitle:string;
  private submitTimeOut;

  constructor(private formsService:FormsService, private router:Router,
    private activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.formTitle = params.form_path;
      this.formPath +=`/${this.formTitle}`;

      this.authenticate();
    });
  }

  /**
   * This method attempts to log a user into the submissionio platsubmission
   */
  private authenticate = async () => {
    if(localStorage.getItem('X_JWT_TOKEN')) {
      // return;
    }
    await this.formsService.authenticate(AuthCredentials).subscribe(
     async (loginResponse)=>{

      },
    (error)=>{
      console.error('Error');
    })
  }



  public onSubmit = (event) => {
    this.submitTimeOut = setTimeout(() =>{
      this.router.navigateByUrl('/dashboard');
    }, 4000)
    console.log({ event }, 'SUBMITTEDDD')

  }


  /**
   * This method cleans up when the component unmounts
   */
  ngOnDestroy = ():void => {
    clearTimeout(this.submitTimeOut);
  }
}
