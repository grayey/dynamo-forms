import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { hasRequiredField, setValidationClass } from '../../../../utils/helpers';
import { FormsService } from '../../../../services/forms/forms.service';
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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

  constructor(private fb:FormBuilder, private router:Router, private formsService:FormsService, private activeRoute: ActivatedRoute) {
    this.customForm = this.fb.group(EditComponent.customForm());
   }


    public boilerPlate = {
      components: []
    }
    public loaders = {
      processing:false,
      verifying:false,
      msg:"Update"
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

    public formioId;
    public appForm:any;
    public canUpdate = true;
    public formPath = environment.FORMIO_PROJECT_URL;


    ngOnInit(): void {
      this.activeRoute.params.subscribe(params => {
          this.formioId = params.form_id;
          this.getFormFromAppByFormioId(this.formioId);
        });
      this.activeRoute.queryParams.subscribe(queryParam => {
        this.formPath +=`/${queryParam.f_p}`;
      });
    }


    /**
     *
     * @param e
     * This method tracks the form-builder changes and updates the local formioObject
     */
    public onFormBuilderChange = (e) => {
      const { form } = e;
      this.formioFormObject = form;
      console.log(this.formioFormObject)
    }



    /**
     * This method updates a custom form on formio
     */
    public editCustomForm = async () =>{
      this.loaders = {
        processing:true,
        msg:"Updating",
        verifying:false
      };
      let formObject = this.customForm.value;
      const { form_type, name } = formObject;
      formObject.type = form_type;
      formObject.dispay = form_type;
      formObject.path = name.toLowerCase();
      delete formObject.form_type;
      formObject = {...this.formioFormObject, ...formObject};
      console.log({ formObject });
      await this.formsService.editCustomForm(formObject, this.formioId).subscribe(
        (formResponse)=>{
          this.loaders = {
            processing:false,
            msg:"Update",
            verifying:false
          };
          this.updateFormOnApp();
          this.router.navigateByUrl('dashboard/forms');
          console.log({ formResponse })
      },
      (error)=>{
        this.loaders = {
          processing:false,
          msg:"Update",
          verifying:false
        };

      },
      ()=>{
        localStorage.setItem('REFRESH_FORMIO', 'TRUE'); //When formio doesn't refresh, there is a 409 conflict on update
      })
    }

    /**
     *
     * @param formio_id
     * This method gets a form on the portal by the formio_id
     */
    private getFormFromAppByFormioId = async (formio_id) => {
      return await this.formsService.getFormFromAppByFormioId(formio_id).subscribe(
        (formResponse) =>{
          const { form_title, form_name } = formResponse;
          const formObject = { title: form_title, name:form_name };
          this.customForm.patchValue(formObject);
          this.appForm = formResponse;

        },
        (error) => {console.log("Error")}
      )

    }

    /**
     *
     * @param form_name
     * This method gets a form from formio by name.
     * Hint: Form name must be unique per project
     */
    public getFormFromFormioByName = async (form_name) =>{
      this.loaders.verifying = true;
      return await this.formsService.getFormFromFormioByName(form_name).subscribe(
        (formResponse:any[]) =>{
          this.loaders.verifying = false;
          const formExists = !!formResponse.length;
          if(formExists){
            const name =  this.appForm.form_name;
            this.customForm.patchValue({ name });
            if(form_name !== name) alert('A form with that name already exists!');
          }
          this.canUpdate = !formExists;
          console.log({ formResponse })
        },
        (error) => {
        this.loaders.verifying = false;

          console.log("Error")
        }
      )
    }

    /**
     *
     * @param formio_id
     * This method updates a form on the portal
     */
    private updateFormOnApp = async () => {
      const formObject = {...this.customForm.value}
      formObject.form_name = formObject.name;
      formObject.form_title = formObject.title;
      return await this.formsService.updateFormOnApp(formObject, this.appForm._id).subscribe(
        (formResponse) =>{
          console.log({ formResponse }, 'Credtedd')
        },
        (error) => {console.log("Update form on app error")}
      )

    }

    onLoad = (event) =>{
      alert()
    }

}
