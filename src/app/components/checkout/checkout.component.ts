import { Component, OnInit } from '@angular/core';
import { NgxPayPalModule, ICreateOrderRequest, PayPalConfig  } from 'ngx-paypal';
import { from } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
 // public payPalConfig ? : IPayPalConfig;
  public showSuccess: boolean;
  public showCancel: boolean;
  public showError: boolean;
  private payPalConfig: PayPalConfig;
  constructor(private translateService: TranslateService,private formBuilder: FormBuilder, 
    private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.initConfig();
  }

  initConfig(){
  const total = this.route.snapshot.queryParams['price'];
  console.log (total);
 this.payPalConfig = new PayPalConfig ({
   currency: 'EUR',
   clientId: 'AcYYvVQ9rTjnGhWhhzXq7kE-ap-5H3X7N6_R1mLs40KrQ6bXNLSkOsOf90g7pOaA1ADns_n5eJvBhDm0',
   createOrder: (data) => < ICreateOrderRequest > {
     intent: 'CAPTURE',
     purchase_units: [{
       amount: {
         currency_code:'EUR',
         value: total,
       }
     }]
   },
   advanced: {
     updateOrderDetails: {
       commit: true
     }
   },
   style: {
     label: 'paypal',
     layout: 'vertical'
   },
 
onApprove: (data, actions) =>{
  console.log ('Transaction was approved, but not authorized yet', data, actions);
  actions.order.get().then(details => {
    console.log ('Order details:', details);
  });
},

onClientAuthorization: (data)=> {
  alert(this.translateService.instant('order.placed'));
  this.router.navigateByUrl('/trips')
},
onCancel: (data,actions) => {
  console.log ('OnCancel', data, actions);
},
onError: err =>{
  console.log ('OnError', err);
},
onClick: () => {
  console.log('onClick');
}
});
}
}

/*private initConfig(): void {
  const price = this.route.snapshot.params['price'];
this.payPalConfig = {
  currency: 'EUR',
  clientId: 'sb',
  createOrderOnClient: (data) => < ICreateOrderRequest > {
      intent: 'CAPTURE',
      purchase_units: [{
          amount: {
              currency_code: 'EUR',
              value: '9.99',
              breakdown: {
                  item_total: {
                      currency_code: 'EUR',
                      value: '9.99'
                  }
              }
          },
          items: [{
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                  currency_code: 'EUR',
                  value: '9.99',
              },
          }]
      }]
  },
  advanced: {
      commit: 'true'
  },
  style: {
      label: 'paypal',
      layout: 'vertical'
  },
  onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
      });

  },
  onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
  },
  onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      this.showCancel = true;

  },
  onError: err => {
      console.log('OnError', err);
      this.showError = true;
  },
  onClick: () => {
      console.log('onClick');
      //this.resetStatus();
  },
};
}*/

