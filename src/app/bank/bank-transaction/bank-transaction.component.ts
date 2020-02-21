import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2'
import { BankTransaction } from '../bank.model';

@Component({
  selector: 'app-bank-transaction',
  templateUrl: './bank-transaction.component.html',
  styleUrls: ['./bank-transaction.component.css']
})
export class BankTransactionComponent implements OnInit {

  progress: { percentage: number } = { percentage: 0 };
  selectedFile: File = null;
  name = '';
  currentFileUpload: File = null;
  bankTransaction: BankTransaction[]= [];



  constructor(private bankservice: BankService) { }

  ngOnInit() {

    this.bankservice.refreshNeeded$
    .subscribe(() => {
      this.getAllBankTransaction();
    });
    this.getAllBankTransaction();
  }


   /*----------- Selecciona Archivo AccountType en formato CSV para ser Enviado -------------*/
   onFileSelected(event) {
    this.progress.percentage = 0;
    this.selectedFile = <File>event.target.files[0];
    try {
      this.name = this.selectedFile.name;
      console.log(this.selectedFile.name.split('.'));
      if ( this.name.split('.')[1] !== 'csv') {
        console.log('ERROR!');
        this.cancelFile();
        Swal.fire({
          icon: 'error',
          title: 'Error de Formato',
          text: 'Seleccione un archivo con formato CSV!',
          
        })

    } else {
        console.log('go ahead');
      }
    } catch (error) {
      console.log(error);
      this.cancelFile();
      // swal('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
    }
}


/*----------- Envia Archivo AccountType en formato CSV al Servidor -------------*/
onUploadTxtFile() {
  const fd = new FormData();
  try {
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile;
    this.bankservice.pushFileToStorage(this.currentFileUpload).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          // this.snackbarService.success(':: Proceso exitoso!');
          this.selectedFile = null;
          this.name = null;
           this.getAllBankTransaction();
          this.progress.percentage = 0;

        }
      }, error => {
        // this.snackbarService.fail(':: Error en el Servidor!');

        // console.log(error, '/', error.error);
          //  Swal('Mensaje del Servidor:', `Error!!...El numero de la Factura ya existe `, 'error');
       }
      );
  } catch (error) {
    // swal('Error!', 'Seleccionar un archivo XML para ser enviado!', 'warning');
  }
}


/*----------- Cancela enviar Archivo -------------*/
cancelFile() {
  this.selectedFile = null;
  this.name = null;
  console.log('Cancel File', this.selectedFile);
}

  getAllBankTransaction() {

    this.bankservice.getAllBanksTransaction().subscribe(res=> {
      console.log('Bank Transaction ',res);
      this.bankTransaction = res;
      
    })

}



}
