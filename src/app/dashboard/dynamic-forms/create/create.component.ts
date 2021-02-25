import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { hasRequiredField, setValidationClass } from '../../../../utils/helpers';
import { FormsService } from '../../../../services/forms/forms.service';


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
      form_type: ['Form', Validators.compose([Validators.required])],
    };
  };

  public hasRequiredField = hasRequiredField;
  public setValidationClass = setValidationClass;
  public customForm:FormGroup

  constructor(private fb:FormBuilder,private formsService:FormsService) {
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
      "INVOICE"
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
      const formObject = {...this.customForm.value, ...this.formioFormObject };
      console.log({ formObject });
      await this.formsService.createCustomForm(formObject).subscribe(
        (formResponse)=>{
          this.loaders = {
            processing:false,
            msg:"Save"
          };

          console.log({ formResponse })
      },
      (error)=>{
        this.loaders = {
          processing:false,
          msg:"Save"
        };

      })
    }

}
