import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormsService } from '../../../../services/forms/forms.service';
import { AuthCredentials } from '../config';
import { tableRun, tableRerender } from '../../../../utils/helpers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formio',
  templateUrl: './app-formio.component.html',
  styleUrls: ['./app-formio.component.css'],
})
export class AppFormioComponent implements OnInit {

  constructor(private formsService:FormsService, private router:Router) {
    this.authenticate();
  }

  public boilerPlate = {
    components: []
   }

   public allForms = [];
   public loaders = {
    fetching: false
   }
   public LIST_TABLE_ID = 'forms_list';


  public ngOnInit(): void {
  }


  /**
   * This method attempts to log a user into the formio platform
   */
  private authenticate = async () => {
    this.loaders.fetching = true;
    if(localStorage.getItem('X_JWT_TOKEN')) {
      return await this.getAllForms();
    }
    await this.formsService.authenticate(AuthCredentials).subscribe(
     async (loginResponse)=>{
        await this.getAllForms();
      },
    (error)=>{
    this.loaders.fetching = false;
      console.error('Error');
    })
  }

  /**
   * This method list all forms in the current project
   */
  private getAllForms = async() => {
    await this.formsService.getAllForms().subscribe(
      (allForms)=>{
      this.allForms = allForms.filter((form) => form.type=='form');
      this.loaders.fetching = false;
      if(this.allForms.length){
        tableRun(this.allForms, this.LIST_TABLE_ID)
      }
    },
    (error)=>{
      this.loaders.fetching = false;
      console.error('Form response Error');
    })
  }

  /**
   *
   * @param projectForm
   * This method routes to the view-edit page.
   * Optionally refreshing the page to reset the formio builder
   */
  public routeToViewEdit = (projectForm) => {
    let redirectUrl = `/view-edit/${projectForm?._id}`;
    const REFRESH_FORMIO = localStorage.getItem('REFRESH_FORMIO');
    if(REFRESH_FORMIO){
      localStorage.setItem('REFRESH_FORMIO', '');
      redirectUrl+=`?f_p=${projectForm?.path}`;
      return window.location.href+=redirectUrl;
    }
    redirectUrl = 'dashboard/forms'+redirectUrl;
    const navigationExtras = {
      queryParams:{f_p:projectForm?.path}
    }
    this.router.navigate([redirectUrl],navigationExtras);
  }

 


  /**
   *
   * @param project_form
   * This method launches a form
   */
  public launchForm = (project_form) => {
    Swal.fire({
      title: `You are about to launch ${project_form.name}!`,
      text: 'Continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        project_form['launching'] = true;
        this.formsService.launchForm(project_form?.id).subscribe(
          (userDeletedResponse) => {

            // this.notification.success(`${project_form.name} successfully deleted!`);

          },
          (error) => {
            project_form['deleting'] = false;
            // $(`#${event.target.id}`)[0].click();
            console.log('An Error Occurred', error);
            // this.notification.error(`${user.name} could not be deleted`, error);

          }
        );
      }
    });
  }

  /**
   *
   * @param project_form
   * This method deletes a form
   */
  public deleteForm = (project_form) => {
    Swal.fire({
      title: `You are about to delete ${project_form?.title}!`,
      text: 'Continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        project_form['launching'] = true;
        this.formsService.deleteFormFromFormio(project_form?.path).subscribe(
          (userDeletedResponse) => {
            this.reRenderOnDelete(project_form);
            // this.notification.success(`${project_form.name} successfully deleted!`);

          },
          (error) => {
            if(error.status === 200){
              this.reRenderOnDelete(project_form);
            }
            console.log({error});
            // this.notification.error(`${user.name} could not be deleted`, error);

          }
        );
      }
    });
  }

  /**
   * This method rerenders the table on delete
   */
  private reRenderOnDelete = (project_form) =>{
    this.allForms = this.allForms.filter((form) => form.path !== project_form?.path);
    // tableRerender(this.allForms, this.LIST_TABLE_ID)
  }

}
