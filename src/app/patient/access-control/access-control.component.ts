import { Component, OnInit } from '@angular/core';
import { read } from 'fs';
import { ABI, SMART_CONTRACT } from '../../shared/constants';

interface accessTable {
  "name": string,
  "account_address": string,
  "account_type": string,
  "read_access": string,
  "write_access": string,
  "permission": string
}

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit {

  access_table: accessTable[] = [];
  account_addr: string = "";
  read_access_disp = [1, 2, 3, 0, 0, 0];
  write_access_disp = [1, 2, 3, 4, 5, 6];
  show_access_panel: boolean = false;
  selected_doctor = "";

  constructor() {
    
  }

  async ngOnInit(): Promise<void> {

    let Web3 = require('web3/dist/web3.min.js');
    Web3 = new Web3((window as any).ethereum);
	  (window as any).ethereum.enable();

    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.account_addr = account;

    Web3.eth.getBalance(this.account_addr).then((balance: any) => {
      console.log(balance);  
    });

    var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);

    contract.methods.list_all_patients().call({from: this.account_addr}).then((result: any) => {
      console.log(result);
      result.forEach((addr: string) => {
        contract.methods.list_account_priviledges(addr).call({from: this.account_addr}).then((result1: any) => {
          console.log(result1);
          contract.methods.accessAuthority("PID1", this.account_addr).call({from: this.account_addr}).then((result2: any) => {
            console.log(result2);
            let record: accessTable = {
              name: "Doctor",
              account_address: addr,
              account_type: result1[0],
              read_access: result1[1],
              write_access: result1[2],
              permission: result2.access,
            };
            console.log(record);
            this.access_table.push(record);
          });
        });
      });
    });

    // contract.methods.list_all_patients().call({from: this.account_addr}).then((result1: any) => {
    //   console.log(result1);
    //   this.access_status = result1.access;
    //   },
    //   (err: Error) => {
    //     console.log(err);
    //     // console.log(err.message.split('Internal JSON-RPC error.\n')[1]);
    //     let temp: string = err.message.split('Internal JSON-RPC error.\n')[1];
    //     temp = temp.split('reason": ')[1];
    //     temp = temp.split('\"')[1]
    //     temp = temp.split('\"')[0]
    //     console.log(temp);
    //     this.err_message = temp;
    //   }
    // );
  }

  read_para() {

  }

  async approve_access() {

    let Web3 = require('web3/dist/web3.min.js');
    Web3 = new Web3((window as any).ethereum);
	  (window as any).ethereum.enable();

    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.account_addr = account;

    var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);

    contract.methods.approve_access("PID1").send({from: this.account_addr}).then(
      (res: any) => {
        console.log(res);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  async revoke_access() {

    let Web3 = require('web3/dist/web3.min.js');
    Web3 = new Web3((window as any).ethereum);
	  (window as any).ethereum.enable();

    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.account_addr = account;

    var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);

    contract.methods.revoke_access("PID1").send({from: this.account_addr}).then(
      (res: any) => {
        console.log(res);
      },
      (err: Error) => {
        console.log(err);
      }
    );
  }

  async lock_para(para: number, mode: number) {
    //mode : 0 -  read _________ 1 - write
    let Web3 = require('web3/dist/web3.min.js');
    Web3 = new Web3((window as any).ethereum);
	  (window as any).ethereum.enable();

    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.account_addr = account;

    Web3.eth.getBalance(this.account_addr).then((balance: any) => {
      console.log(balance);  
    });

    var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);

    contract.methods.modify_priviledges(this.selected_doctor, para, mode == 0 ? 4 : 5).send({from: this.account_addr}).then(
      (res: any) => {
        console.log(res);
      },
      (err: Error) => {
        console.log(err);
      }
    );
    
  }

  async unlock_para(para: number, mode: number) {
    //mode : 0 -  read _________ 1 - write
    let Web3 = require('web3/dist/web3.min.js');
    Web3 = new Web3((window as any).ethereum);
	  (window as any).ethereum.enable();

    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.account_addr = account;

    Web3.eth.getBalance(this.account_addr).then((balance: any) => {
      console.log(balance);  
    });

    var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);

    contract.methods.modify_priviledges(this.selected_doctor, para, mode == 0 ? 9 : 10).send({from: this.account_addr}).then(
      (res: any) => {
        console.log(res);
      },
      (err: Error) => {
        console.log(err);
      }
    );
    
  }

  enable_panel(addr: string, read:any, write:any) {
    this.selected_doctor = addr;
    this.show_access_panel=true;
    this.read_access_disp = read;
    this.write_access_disp = write;
  }

}
