import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  newName: string='HILDA';
  message: string = '';

  constructor() { }

  ngOnInit() {
    console.log('NEW NAME IS ', this.newName);
    
  }

  onMessage(event) {
    console.log('ON MESSAGE ', event);
    this.message = event;
    
  }

}
