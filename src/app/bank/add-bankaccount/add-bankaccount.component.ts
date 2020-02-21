import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Bank, SubAccountBank } from '../bank.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-add-bankaccount',
  templateUrl: './add-bankaccount.component.html',
  styleUrls: ['./add-bankaccount.component.css']
})
export class AddBankaccountComponent implements OnInit {

  form: FormGroup;
  subAccounts: SubAccountBank[] = [];
  // bank: Bank;
  bank: Bank = {
    id: null,
    nameBank: '',
    accountNumber: '',
    address: '',
    phone: '',
    email: '',
    observation: '',
    balance: null,
    balanceToday: null,
   
  }

  submitted: boolean = false;

  // bankUpdate:Bank = {
  //   id: null,
  //   nameBank: '',
  //   accountNumber: '',
  //   address: '',
  //   phone: '',
  //   email: '',
  //   observation: '',
  //   balance: null,
  //   balanceToday: null

  // };

  
  Id: number = null;

  constructor( private bankservice: BankService,
               private formBuilder: FormBuilder,
               private _routerLink: ActivatedRoute,
               private router: Router) {

                console.log('Route ', this._routerLink.snapshot.paramMap.get('id'));
              this.Id = parseInt(  this._routerLink.snapshot.paramMap.get('id'));
              console.log('Id', this.Id);
             
              
              
                if(this._routerLink.snapshot.paramMap.get('id') !== null) {
                  console.log('GO TO GET BY ID');
                    
                  this.getBankById(this._routerLink.snapshot.paramMap.get('id'));

                }
                
  }


  ngOnInit() {

    this.form = this.formBuilder.group({
      id: [''],
      subAccount: this.formBuilder.group({
        id: ['', Validators.required]
      }),
      nameBank: ['', Validators.required],
    accountNumber: ['', Validators.required],
    address: [''],
    phone: [''],
    email: [''],
    observation: [''],
    balance: ['', Validators.required],
    balanceToday: ['']

    })

    this.getAllSubAccounts();

   
  }

  get f() { return this.form.controls; }


  onSubmit(){
    console.log('FORM ',this.form);
    this.submitted = true;
   
    if(this.form.valid) {

      this.bankservice.createBankAccount(this.form.value).subscribe(res=> {
        console.log('RESW ', res);
        this.cleanForm();
        Swal.fire({
          icon: 'success',
          title: 'Proceso',
          text: 'Transaccion con exito!',
          // footer: '<a href>Why do I have this issue?</a>'
        })
        
      })
     
    } else {

      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Llene el formulario con los datos requeridos!',
        // footer: '<a href>Why do I have this issue?</a>'
      })

    }
  }

  cleanForm() {
    // this.form.setValue(this.bankUpdate);
     this.router.navigate(['/bank/bank-list']);
    
  }

  getBankById(id) {
    console.log('GET BANK BY ID ', id);
    this.bankservice.getBankById(id).subscribe(res => {
      this.bank = res;
      console.log('RESP ', this.bank);
      this.form.setValue(this.bank);
      
      

    })
    
  }

  getAllSubAccounts(){
    this.bankservice.getAllSubAccounts().subscribe(res=> {
      console.log('SUBACCOUNTS ', res);
      this.subAccounts = res;
      
    })
  }

 

}
