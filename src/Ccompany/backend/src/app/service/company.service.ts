import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:5000/'
  formData: Company = new Company();
  list: Company[];

  postPaymentDetail() {
    return this.http.post(this.baseURL+"companies", this.formData);
  }

  putPaymentDetail() {
    const body = new HttpParams()
    .set('name', this.formData.name)
    .set('status', String(this.formData.status));

    return this.http.put(`${this.baseURL}companies/${this.formData.id}`,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }

  deletePaymentDetail(id: number) {
    return this.http.delete(`${this.baseURL}companies/${id}`);
  }

  refreshList() {
    return this.http.get(this.baseURL+"companies");
  }


}