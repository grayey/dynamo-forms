import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';
import { Observable } from 'rxjs';

@Injectable()
export class FormsService{

  constructor(private apiHandler:ApiHandlerService) {

  }


  /**
   *
   * @param paymentData
   * This method makes a credit card payment
   */
  public makePayment =  (paymentData): Observable<any> => {
    const url = 'credit-card-pay';
    return  this.apiHandler.post(url, paymentData);
  }




}
