import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }

  // get list of customers
  public getCustomers() : Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backendHost + "/customers");
  }

  // save new customer
  public saveCustomer(customer : Customer) : Observable<Customer> {
    return this.http.post<Customer>(environment.backendHost + "/customers", customer);
  }

  public deleteCustomer(id : number) {
    return this.http.delete(environment.backendHost + "/customers/"+ id);
  }

  public searchCustomer(keyword : string): Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost + "/customers/search?keyword=" + keyword);
  }
}
