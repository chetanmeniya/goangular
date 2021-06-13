import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../service/company.service';
import { NgForm } from '@angular/forms';
import { Company } from '../../service/company.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {

  constructor(public service: CompanyService,public router: Router,
    private toastr: ToastrService) { }
    alldata: any;
    

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.service.formData.status = Number(this.service.formData.status)
    if (this.service.formData.id == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      data => {
        this.alldata = data;
        if(this.alldata.status == 1) {
          this.resetForm(form);
          this.toastr.success('Submitted successfully', 'Company Details');
          this.router.navigate(['/company/list']);
        } else {
          if(this.alldata.data.errors) {
            this.toastr.error(this.alldata.data.errors[0], 'Company Details');
          } else {
            this.toastr.error(this.alldata.message, 'Company Details');
          }
        }
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      data => {
        this.alldata = data;
        if(this.alldata.status == 1) {
          this.resetForm(form);
          this.toastr.info('Updated successfully', 'Company Details');
          this.router.navigate(['/company/list']);
        } else {
          if(this.alldata.data.errors) {
            this.toastr.error(this.alldata.data.errors[0], 'Company Details');
          } else {
            this.toastr.error(this.alldata.message, 'Company Details');
          }
        }
      },
      err => { console.log(err); }
    );
  }


  resetForm(form: NgForm) {
    this.service.formData.name = '';
    this.service.formData.status = 1;
  }

}