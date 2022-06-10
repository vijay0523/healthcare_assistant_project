import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { ABI, SMART_CONTRACT } from '../shared/constants';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  // patient_dataset = Object({
  //   healthcare_admit_id: '123456',
  //   admit_time: '23-10-2164 21:09',
  //   discharge_time: '01-11-2164 17:15',
  //   admission_type: 'EMERGENCY',
  //   admission_location: 'EMERGENCY ROOM',
  //   discharge_location: 'HOME HEALTH CARE',
  //   insurance: 'Medicare',
  //   marital_status: 'Seperated',
  //   ethinicity: 'BLACK/AFRICAN',
  //   diagnosis: 'SEPSIS'
  // });
  
  // column_names: string[] = [];
  // values: string[] = [];
  // blockchain_data!: string;
  // blockchain_decrypted!: string;
  // secrets: string[] = [];
  // account_addr: string = "";
  // currentPara: number = 0;
  // loading: boolean = false;
  // account_type: string = "";
  // read_access: number[] = [];
  // write_access: number[] = [];
  // err_message: string = "";
  // access_status: number = 0;

  // constructor() { 
  //   (window as any).ethereum.enable();
  // }

  // async ngOnInit(): Promise<void> {
  //   (window as any).ethereum.enable();
  //   const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  //   const account = accounts[0];
  //   this.account_addr = account;
  //   console.log(account);
  //   (window as any).ethereum.on('accountsChanged',  (accounts: any) => {
  //     // Time to reload your interface with accounts[0]!
  //     console.log(accounts[0]);
  //     this.account_addr = accounts[0];
  //   });

  //   let Web3 = require('web3/dist/web3.min.js');
  //   Web3 = new Web3((window as any).ethereum);
  //   var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);
  //   contract.methods.list_priviledges().call({from: this.account_addr}).then((result1: any) => {
  //     this.account_type = result1[0];
  //     this.read_access = result1[1];
  //     this.write_access = result1[2];
  //   });

  //   this.read_data_blockchain(1);

	// contract.methods.accessAuthority("PID1", "0x24E3a0d298595A65D91FcB35F26143a3D1B076d0").call({from: this.account_addr}).then((result1: any) => {
	// 	console.log(result1);
	// 	this.access_status = result1.access;
	// 	},
	// 	(err: Error) => {
	// 		console.log(err);
	// 		// console.log(err.message.split('Internal JSON-RPC error.\n')[1]);
	// 		let temp: string = err.message.split('Internal JSON-RPC error.\n')[1];
	// 		temp = temp.split('reason": ')[1];
	// 		temp = temp.split('\"')[1]
	// 		temp = temp.split('\"')[0]
	// 		console.log(temp);
	// 		this.err_message = temp;
	// 	}
	// );

  // }

  // read_data_blockchain(para: number) {
  //   // para = 1;
  //   // this.secrets = JSON.parse(String(localStorage.getItem('keys')));
  //   // let Web3 = require('web3/dist/web3.min.js');
  //   // Web3 = new Web3((window as any).ethereum);
  //   // var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);
  //   // contract.methods.read_all_records("PID1").call({from: this.account_addr}).then((result1: any) => {
	// // 	console.log(result1);
	// // 	this.blockchain_data = result1[para];
	// // 	this.blockchain_decrypted = CryptoJS.AES.decrypt(result1[para], this.secrets[para]).toString(CryptoJS.enc.Utf8);
	// // 	this.column_names = Object.keys(JSON.parse(this.blockchain_decrypted));
	// // 		this.values = Object.values(JSON.parse(this.blockchain_decrypted));
	// // 	this.loading = false;
	// // 	},
	// // 	(err: Error) => {
	// // 		// console.log(err.message.split('Internal JSON-RPC error.\n')[1]);
	// // 		let temp: string = err.message.split('Internal JSON-RPC error.\n')[1];
	// // 		temp = temp.split('reason": ')[1];
	// // 		temp = temp.split('\"')[1]
	// // 		temp = temp.split('\"')[0]
	// // 		console.log(temp);
	// // 		this.err_message = temp;
	// // 	});
	// }

	// request_access() {
	// 	let Web3 = require('web3/dist/web3.min.js');
	// 	Web3 = new Web3((window as any).ethereum);
	// 	var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);

	// 	// const transactionOptions = {
	// 	// 	from: fromAccount,
	// 	// 	gas: gasLimit
	// 	// 	gasPrice: gasPriceInWei
	// 	//   };

	// 	contract.methods.request_access("PID1", "0x24E3a0d298595A65D91FcB35F26143a3D1B076d0").send({from: this.account_addr}).then((result1: any) => {
	// 		console.log(result1);
	// 		},
	// 		(err: Error) => {
	// 			console.log(err);
	// 			// console.log(err.message.split('Internal JSON-RPC error.\n')[1]);
	// 			let temp: string = err.message.split('Internal JSON-RPC error.\n')[1];
	// 			temp = temp.split('reason": ')[1];
	// 			temp = temp.split('\"')[1]
	// 			temp = temp.split('\"')[0]
	// 			console.log(temp);
	// 			this.err_message = temp;
	// 		});
	// }
  
  //   goNext() {
  //   this.currentPara = (this.currentPara + 1)%6;
  //   this.read_data_blockchain(this.currentPara);
  //   }
  //   goPrev() {
  //   if(this.currentPara != 0)
  //     this.currentPara = this.currentPara - 1;
  //   this.read_data_blockchain(this.currentPara);
  //   }

  constructor(private router: Router) { }

  redirect(loc: string) {
    if(loc == "appointments")
      this.router.navigate(['doctor/appointments']);
    else if(loc == "medical-record")
      this.router.navigate(['doctor/patient-record']);
    else if(loc == "explainer-dashboard")
    this.router.navigate(['doctor/explainer']);
  }

  ngOnInit() {}

}
