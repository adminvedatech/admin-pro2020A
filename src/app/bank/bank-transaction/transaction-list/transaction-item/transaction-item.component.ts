import { Component, OnInit, Input } from '@angular/core';
import { BankTransaction } from '../../../../bank/bank.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css']
})
export class TransactionItemComponent implements OnInit {

  form: FormGroup;

  @Input()transDetails: BankTransaction;
  @Input()message:string;


  constructor(private formBuilder: FormBuilder) { 

    console.log('fORM DESCRIPTION ',  this.transDetails);
    console.log('fORM DESCRIPTION ',  this.message);

  }

  ngOnInit() {
    console.log('fORM DESCRIPTION ',  this.message);

    this.form = this.formBuilder.group({
      id: [''],
      subAccount: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      descripcion: ['', Validators.required],
    accountNumber: ['', Validators.required],
    address: [''],
    phone: [''],
    email: [''],
    observation: [''],
    balance: ['', Validators.required],
    balanceToday: ['']

    });

    this.form.get('descripcion').setValue(this.transDetails.descripcion)

    console.log('fORM DESCRIPTION ', this.transDetails);
    
  }

  onSubmit(){
    console.log('on submit');

  }
 
}
