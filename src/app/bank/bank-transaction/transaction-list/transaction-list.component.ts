import { Component, OnInit, Input } from '@angular/core';
import { BankTransaction } from '../../bank.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  @Input() bankTransaction: BankTransaction;
  transDetails: BankTransaction;
  message = 'hello';

  constructor() { }

  ngOnInit() {
  }

  TransDetails(object: BankTransaction) {

    console.log('dETAILS ', object);
    this.transDetails = object;
    
  }

}
