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