import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankTransaction } from '../../bank/bank.model';
// import { BankService } from '../../services/bank.service';
import { BankService } from '../../bank/bank.service';
import { SubAccount } from '../account.model';
import { AccountService } from '../account.service';


@Component({
  selector: 'app-add-accounting-policy',
  templateUrl: './add-accounting-policy.component.html',
  styleUrls: ['./add-accounting-policy.component.css']
})
export class AddAccountingPolicyComponent implements OnInit {

  orderForm: FormGroup;
  itemsPolizas: FormArray;
  subAccounts: SubAccount[] = [];
  bankTransactions: BankTransaction[] = [];
  bankTr: BankTransaction;
  index: number;

  constructor(private formBuilder: FormBuilder,
              private accountservice: AccountService,
              private bankservice: BankService
              ) {
                this.getTransaction();
                this.index = 0;
               }

  ngOnInit() {

    this.orderForm = this.formBuilder.group({
      transaction: this.formBuilder.group({
        id: ''
      }),
      type: ['', Validators.required],
      concept: '',
      polizaNum: ['', Validators.required],
      date: ['', Validators.required],
      itemsPolizas: this.formBuilder.array([])
    });

    this.addItem();

    this.getAllSubAccount();

  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      subAccount: this.formBuilder.group({
        id: [''],
      }),
      date: '',
      concept: '',
      debit: '',
      credit: '',
    });
  }

  addItem(): void {
    console.log('ADD ITEMS');
    this.itemsPolizas = this.orderForm.get('itemsPolizas') as FormArray;
    this.itemsPolizas.push(this.createItem());

  }

  removeItem(i: number) {
    this.itemsPolizas = this.orderForm.get('itemsPolizas') as FormArray;
    this.itemsPolizas.removeAt(i);
  }

  addValue(event) {

    console.log('form', this.orderForm);
    
    console.log('EVENT ', event.target.selectedIndex);

    this.index =  event.target.selectedIndex;
    //  this.bankTr =  this.bankTransactions.find(res => res.id === this.index-1)

   this.bankTr = this.bankTransactions[this.index - 1];
   console.log('BUSQUEDA ', this.bankTr);
   this.orderForm.get('concept').setValue(this.bankTr.descripcionDetallada);
   this.itemsPolizas.controls[0].get('debit').setValue(0);
   this.itemsPolizas.controls[0].get('credit').setValue(this.bankTr.retiros);

  }

  getAllSubAccount() {

    this.accountservice.getAllSubAccounts().subscribe(res => {
        this.subAccounts = res;
        console.log('SUBACCOUNTS ', this.subAccounts);
    });
  }

  onSubmit() {
    this.itemsPolizas = this.orderForm.get('itemsPolizas') as FormArray;
    for (let i = 0; i < this.itemsPolizas.length; i++) {
      this.itemsPolizas.controls[i].get('date').setValue(this.orderForm.get('date').value);
    }

    this.accountservice.createPoliza(this.orderForm.value).subscribe(res => {
      console.log('RES POLIZA ', res);
    });

    console.log('VALUE ', this.orderForm.value);

  }

  getTransaction() {
    console.log('GET TRNSACTION');
    this.bankservice.getAllBanksTransaction().subscribe(res => {
      this.bankTransactions = res;
      console.log('BANK TRANS', this.bankTransactions);
    });
  }


  addDate(event) {

    console.log('ADDD DATE', event.target.value);
    console.log(this.orderForm.get('date').value);

  }

}
