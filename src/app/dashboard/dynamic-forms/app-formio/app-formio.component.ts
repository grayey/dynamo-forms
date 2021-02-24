import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../../../services/forms/forms.service';
import { AuthCredentials } from '../config';

@Component({
  selector: 'app-formio',
  templateUrl: './app-formio.component.html',
  styleUrls: ['./app-formio.component.css'],
})
export class AppFormioComponent implements OnInit {

  constructor(private formsService:FormsService) {
    this.authenticate();
  }

  ngOnInit(): void {
  }

  onSubmit(submission) {
    alert(submission);
  }


  /**
   * This method attempts to log a user into the formio platform
   */
  private authenticate = async () => {
    await this.formsService.authenticate(AuthCredentials).subscribe(
      (loginResponse)=>{
        console.log({loginResponse})
    },
    (error)=>{
      console.error('Error');
    })
  }
}
