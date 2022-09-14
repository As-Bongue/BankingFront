import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers! : Observable<Array<Customer>>;
  errorMessage! : string;
  searchCustomerForm : FormGroup | undefined;

  constructor( private customerService : CustomerService, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.searchCustomerForm = this.fb.group({
      keyword : this.fb.control("")
    });

    this.handleSearchCustomers();

  //  this.customers = this.customerService.getCustomers().pipe(
  //   catchError( error => {
  //     this.errorMessage = error.message;
  //     return throwError(error);
  //   } )
  //  );
  }

  handleDeleteCustomer(customer : Customer){
    let conf = confirm("are you sure you want to delete ?");
    if(!conf) return;
    this.customerService.deleteCustomer(customer.id).subscribe({
      next : (resp) => {
        this.customers = this.customers.pipe(
          map( data => {
            let index = data.indexOf(customer);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : (err) => {
        console.log(err);
      }
    })
  }

  handleSearchCustomers(){
    let kw = this.searchCustomerForm?.value.keyword;
    this.customers = this.customerService.searchCustomer(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

}
