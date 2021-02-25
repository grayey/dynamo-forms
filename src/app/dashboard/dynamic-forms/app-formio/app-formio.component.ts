import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../../../services/forms/forms.service';
import { AuthCredentials } from '../config';
import { tableRun, tableRerender } from '../../../../utils/helpers';

@Component({
  selector: 'app-formio',
  templateUrl: './app-formio.component.html',
  styleUrls: ['./app-formio.component.css'],
})
export class AppFormioComponent implements OnInit {

  constructor(private formsService:FormsService) {
    this.authenticate();
  }

  public boilerPlate = {
    components: []
   }

   public allForms = [];
   public loaders = {
    fetching: false
   }


  public ngOnInit(): void {
  }


  /**
   * This method attempts to log a user into the formio platform
   */
  private authenticate = async () => {
    this.loaders.fetching = true;
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
      this.allForms = allForms;
      this.loaders.fetching = false;
      if(this.allForms.length){
        tableRun(this.allForms, 'forms_list')
      }
    },
    (error)=>{
      this.loaders.fetching = false;
      console.error('Form response Error');
    })
  }

}
