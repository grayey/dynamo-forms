import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { hasRequiredField, setValidationClass } from '../../../../utils/helpers';
import { FormsService } from '../../../../services/forms/forms.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  private static customForm = () => {
    return {
      title: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      form_type: ['form', Validators.compose([Validators.required])],
    };
  };

  public hasRequiredField = hasRequiredField;
  public setValidationClass = setValidationClass;
  public customForm:FormGroup

  constructor(private fb:FormBuilder, private router:Router, private formsService:FormsService) {
    this.customForm = this.fb.group(CreateComponent.customForm());
   }


    public boilerPlate = {
      components: []
    }
    public loaders = {
      processing:false,
      msg:"Save"
    }
    public formNames = [ // replace with organizations formVaribles
      "KYC",
      "TICKET",
      "INVOICE",
      "LOAN",
      "RENTAL",
      "BID"
    ]
    public formioFormObject = {
      components:[]
    };


    ngOnInit(): void {
    }


    /**
     *
     * @param e
     * This method tracks the form-builder changes and updates the local formioObject
     */
    public onFormBuilderChange = (e) =>{
      const { form } = e;
      this.formioFormObject = form;
      console.log(this.formioFormObject)
    }



    /**
     * This method creates a custom form
     */
    public createCustomForm = async () =>{
      this.loaders = {
        processing:true,
        msg:"Saving"
      };
      let formObject = {...this.customForm.value};
      const { form_type, name } = formObject;
      formObject.type = form_type;
      formObject.dispay = form_type;
      formObject.path = name.toLowerCase();
      delete formObject.form_type;
      formObject = { ...formObject, ...this.formioFormObject };
      console.log({ formObject });
      await this.formsService.createCustomForm(formObject).subscribe(
        async (formResponse)=>{
          this.loaders = {
            processing:false,
            msg:"Save"
          };
          const { _id } = formResponse;
          await this.createFormOnApp(_id);


      },
      (error)=>{
        this.loaders = {
          processing:false,
          msg:"Save"
        };

      })
    }

    /**
     *
     * @param formio_id
     * This method creates a form on the portal
     */
    private createFormOnApp = async (formio_id) => {
      const formObject = {...this.customForm.value, formio_id}
      formObject.form_name = formObject.name;
      formObject.form_title = formObject.title;
      return await this.formsService.createFormOnApp(formObject).subscribe(
        (formResponse) =>{
          console.log({ formResponse }, 'Credtedd')
        },
        (error) => {console.log("Error")},
        () =>{
          this.router.navigateByUrl('dashboard/forms');
        }
      )

    }

}
