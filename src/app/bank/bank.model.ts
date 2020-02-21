import { SubAccount, AccountType } from '../account/account.model';

export class Bank {
   public id: null;
   public nameBank: string;
   public accountNumber: string;
   public address: string;
   public email: string;
   public phone: string;
   public observation: string;
   public balance: number;
   public balanceToday: number;
   // public subAccount: SubAccount;
}


export class BankTransaction {
   public id: null;
   public Cuenta: string;
   public fechaOperacion: string;
   public fecha: string;
   public referencia: string;
   public descripcion: string;
   public codeTransac: string;
   public sucursal: string;
   public deposito: number;
   public retiro: number;
   public saldo: number;
   public movimiento: number;
   public DescripcionDetallada: string;

}

export class SubAccountBank {

   public id: null;
   public nameAccount: string;
   public accountNumber: string;
   public balance: number;
   public status: boolean;
   public accountType: AccountType;

}

