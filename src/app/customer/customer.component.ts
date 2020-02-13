import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Invoice } from './customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  progress: { percentage: number } = { percentage: 0 };
  selectedFile: File = null;
  name = 'Nombre del Archivo';
  currentFileUpload: File = null;
  invoices: Invoice[] = [];
  invoice: Invoice;
  isPayment: boolean = false;


  constructor(private customerservice: CustomerService) { }

  ngOnInit() {
    this.customerservice.refreshNeeded$
    .subscribe(() => {
      this.getAllInvoice();
    });
    this.getAllInvoice();
  }


  onFileSelected(event) {
    this.progress.percentage = 0;
    this.selectedFile = <File>event.target.files[0];
    try {
      this.name = this.selectedFile.name;
      console.log('NAME ', this.name);
      
      console.log(this.selectedFile.name.split('.'));
      if ( this.name.split('.')[1] !== 'xml') {
        console.log('ERROR!');
        this.cancelFile();
      // swal('Error!', 'Cancelar y seleccionar un archivo con formato XML', 'warning');

      } else {
        console.log('go ahead');

      }
    } catch (error) {
      console.log(error);
      this.cancelFile();
      // swal('Error!', 'Cancelar y seleccionar un archivo nuevo!', 'warning');
    }
}

 /*----------- Cancela enviar Archivo -------------*/
 cancelFile() {
  this.selectedFile = null;
  this.name = null;
  console.log('Cancel File', this.selectedFile);
}


 /*----------- Envia Archivo AccountType en formato CSV al Servidor -------------*/
 onUploadTxtFile() {
  const fd = new FormData();
  try {
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFile;
    this.customerservice.sendXmlCustomerInvoice(this.currentFileUpload).subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
          // swal('Mensaje del Servidor...', `La transaccion fue exitosa`, 'success');

          this.selectedFile = null;
          this.name = null;
          this.loadInvoice();
          this.progress.percentage = 0;

            // this.router.navigate(['/suppliers']);
        }

      }, error => {
        // console.log(error, '/', error.error);
          // swal('Mensaje del Servidor:', `Error!!...El numero de la Factura ya existe `, 'error');
       }
      );


  } catch (error) {
    // swal('Error!', 'Seleccionar un archivo XML para ser enviado!', 'warning');
  }

}



/*----------------------- Http carga la Invoice que fue enviada -----------------------*/
loadInvoice() {
  // this.bankservice.getAllInvoiceCustomer().subscribe(resp => {
  //   this.invoices = resp;
  //   if (resp !== null ) {

  //     this.invoice.next(this.invoices);
  //     console.log('INVOICES ', this.invoices);
  //     this.listData = new MatTableDataSource(this.invoices);
  //     this.listData.sort = this.sort;
  //     this.listData.paginator = this.paginator;
  //     this.progress.percentage = 0;
  //   } else {
  //     // swal('Error!', 'No Existen facturas!', 'warning');
  //   }
  // });

}

getAllInvoice() {
  this.customerservice.getAllInvoiceCustomer().subscribe( res=> {
    console.log('ALL INVOICES ', res);
    this.invoices = res;

  
    
  })
}

getPayment(id) {
  console.log('PAYMENT ID 0', id);
  
}

onChange(id: number, isChecked: boolean) {
  // const cartoons = (this.form.controls.name as FormArray);

  if (isChecked) {
    // cartoons.push(new FormControl(name));
    console.log('IS CHECKED ', isChecked, 'NAMED ', id);
    this.customerservice.setTruePaymentInvoiceById(id).subscribe(res=> {
      console.log('INVOICE ', res);
      this.invoice = res;
      
    })
    
  } else {
    // const index = cartoons.controls.findIndex(x => x.value === name);
    // cartoons.removeAt(index);
    console.log('IS not CHECKED ', isChecked, 'NAMED ', id);
    this.customerservice.setFalsePaymentInvoiceById(id).subscribe(res=> {
      console.log('INVOICE ', res);
      this.invoice = res;
      
    })
  }
}


}
