import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SubmissionsService } from '../../../../services/submissions/submissions.service';
import { AuthCredentials } from '../config';
import { tableRun, tableRerender } from '../../../../utils/helpers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})

export class SubmissionsComponent implements OnInit {

  constructor(private submissionsService:SubmissionsService, private router:Router,
    private activeRoute: ActivatedRoute) {

  }

  public boilerPlate = {
    components: []
   }
   public formPath:string;
   public allSubmissions = [];
   public tableColumns = [];
   public loaders = {
    fetching: false
   }
   public LIST_TABLE_ID = 'submissions_list';


  public ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.formPath = params.form_path;
      this.authenticate();
    });

  }


  /**
   * This method attempts to log a user into the submissionio platsubmission
   */
  private authenticate = async () => {
    this.loaders.fetching = true;
    if(localStorage.getItem('X_JWT_TOKEN')) {
      // return await this.getAllSubmissions();
    }
    await this.submissionsService.authenticate(AuthCredentials).subscribe(
     async (loginResponse)=>{
        await this.getAllSubmissions();
      },
    (error)=>{
    this.loaders.fetching = false;
      console.error('Error');
    })
  }

  /**
   * This method list all submissions in the current project
   */
  private getAllSubmissions = async() => {
    await this.submissionsService.getAllSubmissions(this.formPath).subscribe(
      (allSubmissions)=>{
      const lastSubmission = allSubmissions[0] || {data:[]};
      this.tableColumns = Object.keys(lastSubmission['data']);
      this.allSubmissions = allSubmissions.map((submission) => submission.data);
      this.loaders.fetching = false;
      if(this.allSubmissions.length){
        tableRun(this.allSubmissions, this.LIST_TABLE_ID)
      }
    },
    (error)=>{
      this.loaders.fetching = false;
      console.error('Submission response Error');
    })
  }

  /**
   *
   * @param projectSubmission
   * This method routes to the view-edit page.
   * Optionally refreshing the page to reset the submissionio builder
   */
  public routeToViewEdit = (projectSubmission) => {
    let redirectUrl = `/view-edit/${projectSubmission?._id}`;
    const REFRESH_FORMIO = localStorage.getItem('REFRESH_FORMIO');
    if(REFRESH_FORMIO){
      localStorage.setItem('REFRESH_FORMIO', '');
      redirectUrl+=`?f_p=${projectSubmission?.path}`;
      return window.location.href+=redirectUrl;
    }
    redirectUrl = 'dashboard/submissions'+redirectUrl;
    const navigationExtras = {
      queryParams:{f_p:projectSubmission?.path}
    }
    this.router.navigate([redirectUrl],navigationExtras);
  }


  /**
   *
   * @param project_submission
   * This method launches a submission
   */
  public launchSubmission = (project_submission) => {
    Swal.fire({
      title: `You are about to launch ${project_submission.name}!`,
      text: 'Continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        project_submission['launching'] = true;
        this.submissionsService.launchSubmission(project_submission?.id).subscribe(
          (userDeletedResponse) => {

            // this.notification.success(`${project_submission.name} successfully deleted!`);

          },
          (error) => {
            project_submission['deleting'] = false;
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
   * @param project_submission
   * This method deletes a submission
   */
  public deleteSubmission = (project_submission) => {
    Swal.fire({
      title: `You are about to delete ${project_submission?.title}!`,
      text: 'Continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        project_submission['launching'] = true;
        this.submissionsService.deleteSubmissionFromSubmissionio(project_submission?.path).subscribe(
          (userDeletedResponse) => {
            this.reRenderOnDelete(project_submission);
            // this.notification.success(`${project_submission.name} successfully deleted!`);

          },
          (error) => {
            if(error.status === 200){
              this.reRenderOnDelete(project_submission);
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
  private reRenderOnDelete = (project_submission) =>{
    this.allSubmissions = this.allSubmissions.filter((submission) => submission.path !== project_submission?.path);
    // tableRerender(this.allSubmissions, this.LIST_TABLE_ID)
  }

}
