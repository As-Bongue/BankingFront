import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup! : FormGroup;

  constructor(private fb : FormBuilder, private customerService : CustomerService, private route : Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(5)]),
      email : this.fb.control(null, [Validators.required, Validators.email]),
    });
  }

  hanldeSaveCustomer(){
    let customer : Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next : (data) => {
        alert("Customer has been successfuly saved");
        //vider le formulaire
        // this.newCustomerFormGroup.reset();
        this.route.navigateByUrl("/customers");

      },
      error : (err) => {
        console.log(err);
      }
    })
  }

}
