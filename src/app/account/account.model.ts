export class AccountType {
    public id: null;
    public name: string;
    public account: string;
    public balance: number;
    public state: boolean;
    public subaccount: SubAccount;

}

export class SubAccount {

    public id: null;
    public nameAccount: string;
    public accountNumber: string;
    public balance: number;
    public status: boolean;
    public accountType: AccountType;

}

export class Poliza {

    public id: null;
    public type: string;
    public concept: string;
    public date: Date;
    public polizaNum: string;
    public itemsPoliza: ItemsPoliza;
}


export class ItemsPoliza {

    public id: null;
    public date: Date;
    public subAccount: SubAccount;
    public concept: string;
    public debit: number;
    public credit: number;

}