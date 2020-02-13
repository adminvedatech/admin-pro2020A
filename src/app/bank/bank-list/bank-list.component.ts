import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BankService } from '../bank.service';
import { Bank } from '../bank.model';

@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css']
})
export class BankListComponent implements OnInit {

  banks: Bank[] = [];
  bank: Bank;
  total: number = 0.0;

  @Output() onClickable = new EventEmitter<string>();
  message = 'Hello World';

  constructor(private bankservice: BankService) { }

  ngOnInit() {

    this.bankservice.getAllBanks().subscribe(res => {
      this.banks= res;
      console.log('BANKS ', this.banks);
      this.sumBalance();
    });

  }

  onClick() {
    console.log('Clickable on Bank list');
    this.onClickable.emit(this.message);
    
  }

  sumBalance() {
    this.total = 0;
    for(let i = 0; i < this.banks.length; i++) {
     this.total = this.banks[i].balanceToday + this.total;
    }
  }

}
