import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { AccountService } from '../account.service';
import { SubAccount } from '../account.model';

@Component({
  selector: 'app-add-accounting-policy',
  templateUrl: './add-accounting-policy.component.html',
  styleUrls: ['./add-accounting-policy.component.css']
})
export class AddAccountingPolicyComponent implements OnInit {

  orderForm: FormGroup;
  items: FormArray;
  subAccounts: SubAccount[]=[];

  constructor(private formBuilder: FormBuilder,
              private accountservice: AccountService) { }

  ngOnInit() {

    this.orderForm = this.formBuilder.group({
      type: '',
      concept: '',
      number: '',
      date: '',
      items: this.formBuilder.array([ this.createItem() ])
    });

    this.getAllSubAccount();

    // this.addItem();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      subAccount: this.formBuilder.group({
        id:[''] 
      }),
      concept: '',
      debit: '',
      credit:'',
    });
  }

  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

  removeItem(i:number) {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.removeAt(i);
  }

  getAllSubAccount(){

    this.accountservice.getAllSubAccounts().subscribe(res=> {
        this.subAccounts =res;
        console.log('SUBACCOUNTS ', this.subAccounts);
        
    })
  }

  onSubmit() {
    console.log('VALUE ', this.orderForm.value);
    
  }

}
