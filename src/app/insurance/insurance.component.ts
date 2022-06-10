import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { ABI, SMART_CONTRACT } from '../shared/constants';

const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "access_type",
				"type": "uint256"
			}
		],
		"name": "init_priviledges",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "init_priviledges_admin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "para",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "access_type",
				"type": "uint256"
			}
		],
		"name": "modify_priviledges",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "para",
				"type": "uint256[]"
			},
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "string[]",
				"name": "newPara",
				"type": "string[]"
			}
		],
		"name": "write_all_records",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "para",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "newPara",
				"type": "string"
			}
		],
		"name": "write_record",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "accessPriviledges",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "account_type",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "list_priviledges",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256[10]",
				"name": "",
				"type": "uint256[10]"
			},
			{
				"internalType": "uint256[10]",
				"name": "",
				"type": "uint256[10]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			}
		],
		"name": "read_all_records",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "para",
				"type": "uint256"
			}
		],
		"name": "read_record",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "records",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.css']
})
export class InsuranceComponent implements OnInit {

//   patient_dataset = Object({
//     healthcare_admit_id: '123456',
//     admit_time: '23-10-2164 21:09',
//     discharge_time: '01-11-2164 17:15',
//     admission_type: 'EMERGENCY',
//     admission_location: 'EMERGENCY ROOM',
//     discharge_location: 'HOME HEALTH CARE',
//     insurance: 'Medicare',
//     marital_status: 'Seperated',
//     ethinicity: 'BLACK/AFRICAN',
//     diagnosis: 'SEPSIS'
//   });
  
//   column_names: string[] = [];
//   values: string[] = [];
//   blockchain_data!: string;
//   blockchain_decrypted!: string;
//   secrets: string[] = [];
//   smart_contract_addr: string = "0x1f1aAFECeeaEd1aD8F896e024681763828e47332";
//   account_addr: string = "0x3738311e29EA5B33092063E5Eb8D43AD83012E07";
//   currentPara: number = 0;
//   loading: boolean = false;
//   account_type: string = "";
//   read_access: number[] = [];
//   write_access: number[] = [];

//   constructor() { 
//     (window as any).ethereum.enable();
//   }

//   async ngOnInit(): Promise<void> {
//     (window as any).ethereum.enable();
//     const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
//     const account = accounts[0];
//     this.account_addr = account;
//     console.log(account);
//     (window as any).ethereum.on('accountsChanged',  (accounts: any) => {
//       // Time to reload your interface with accounts[0]!
//       console.log(accounts[0]);
//       this.account_addr = accounts[0];
//     });

//     let Web3 = require('web3/dist/web3.min.js');
//     Web3 = new Web3((window as any).ethereum);
//     var contract = new Web3.eth.Contract(abi, this.smart_contract_addr);
//     contract.methods.list_priviledges().call({from: this.account_addr}).then((result1: any) => {
//       this.account_type = result1[0];
//       this.read_access = result1[1];
//       this.write_access = result1[2];
//     });

//     this.read_data_blockchain(5);

//   }

//   read_data_blockchain(para: number) {
//     // para = 1;
//     this.secrets = JSON.parse(String(localStorage.getItem('keys')));
//     let Web3 = require('web3/dist/web3.min.js');
//     Web3 = new Web3((window as any).ethereum);
//     var contract = new Web3.eth.Contract(abi, this.smart_contract_addr);
//     contract.methods.read_all_records("PID1").call({from: this.account_addr}).then((result1: any) => {
//       console.log(result1);
//       this.blockchain_data = result1[0];
//       this.blockchain_decrypted = CryptoJS.AES.decrypt(result1[0], this.secrets[para]).toString(CryptoJS.enc.Utf8);
//       this.column_names = Object.keys(JSON.parse(this.blockchain_decrypted));
//         this.values = Object.values(JSON.parse(this.blockchain_decrypted));
//       this.loading = false;
//     });
//     }
  
//     goNext() {
//     this.currentPara = (this.currentPara + 1)%6;
//     this.read_data_blockchain(this.currentPara);
//     }
//     goPrev() {
//     if(this.currentPara != 0)
//       this.currentPara = this.currentPara - 1;
//     this.read_data_blockchain(this.currentPara);
//     }
	
patient_dataset = {}
pat_address_field = new FormControl('');
pat_addr = ";"

column_names: string[] = [];
values: string[] = [];
json_encoded: string;
encrypted_data: string;
decrypted_data: string;
blockchain_data!: string;
blockchain_decrypted!: string;
secrets: string[] = [];
account_addr: string = "";
currentPara: number = 0;
loading: boolean = false;
show_record = false;
err_message = "";
access_status = 0;

constructor() {
  this.column_names = Object.keys(this.patient_dataset);
  this.values = Object.values(this.patient_dataset);
  this.column_names = this.column_names.map(key => {return key.replace('_', ' ').replace('_', ' ').replace('_', ' ');});

  this.json_encoded = JSON.stringify(this.patient_dataset);

  this.encrypted_data = CryptoJS.AES.encrypt(this.json_encoded, 'secret key 123').toString();
  this.decrypted_data = CryptoJS.AES.decrypt(this.encrypted_data, 'secret key 123').toString(CryptoJS.enc.Utf8);

  let Web3 = require('web3/dist/web3.min.js');
  Web3 = new Web3((window as any).ethereum);
	(window as any).ethereum.enable();

//   Web3.eth.getBalance(this.account_addr).then((balance: any) => {

  // 		console.log(balance);
	
  // });
}

async ngOnInit(): Promise<void> {
  const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  this.account_addr = account;
  console.log(account);
  // this.read_data_blockchain(0);
}

read_data_blockchain(para: number) {
  // para = 1;
  this.secrets = JSON.parse(String(localStorage.getItem('keys')));
  let Web3 = require('web3/dist/web3.min.js');
  Web3 = new Web3((window as any).ethereum);
  var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);
  contract.methods.read_all_records("PID1").call({from: this.account_addr}).then((result1: any) => {
	console.log(result1);
	this.blockchain_data = result1[para];
	this.blockchain_decrypted = CryptoJS.AES.decrypt(result1[para], this.secrets[para]).toString(CryptoJS.enc.Utf8);
	this.column_names = Object.keys(JSON.parse(this.blockchain_decrypted));
	  this.values = Object.values(JSON.parse(this.blockchain_decrypted));
	this.loading = false;
	// localStorage.setItem('keys', JSON.stringify(this.secrets));
  });
}

request_access() {
	  let Web3 = require('web3/dist/web3.min.js');
	  Web3 = new Web3((window as any).ethereum);
	  var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);

	  contract.methods.request_access("PID1", "0x24E3a0d298595A65D91FcB35F26143a3D1B076d0").send({from: this.account_addr}).then((result1: any) => {
		  console.log(result1);
		  },
		  (err: Error) => {
			  console.log(err);
			  // console.log(err.message.split('Internal JSON-RPC error.\n')[1]);
			  let temp: string = err.message.split('Internal JSON-RPC error.\n')[1];
			  temp = temp.split('reason": ')[1];
			  temp = temp.split('\"')[1]
			  temp = temp.split('\"')[0]
			  console.log(temp);
			  this.err_message = temp;
		  });
  }

save_para() {
  this.loading = true;
  let Web3 = require('web3/dist/web3.min.js');
  Web3 = new Web3((window as any).ethereum);
	(window as any).ethereum.enable();
  var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);

  let doc = document.getElementById('textarea') as any;;
  let newPara = doc.value;
  console.log(newPara);
  let encrypted_data = CryptoJS.AES.encrypt(newPara, this.secrets[this.currentPara]).toString();
  console.log(encrypted_data);
  contract.methods.write_record(this.currentPara+1, "PID1", this.pat_addr, encrypted_data).send({from: this.account_addr}).then((result1: any) => {
	console.log(result1);
	this.read_data_blockchain(this.currentPara);
  });
}

load_record() {
  this.pat_addr = this.pat_address_field.value;
  console.log(this.pat_addr);
  let Web3 = require('web3/dist/web3.min.js');
  Web3 = new Web3((window as any).ethereum);
	(window as any).ethereum.enable();
  var contract = new Web3.eth.Contract(ABI, SMART_CONTRACT);
  contract.methods.accessAuthority("PID1", this.pat_addr).call({from: this.account_addr}).then((result1: any) => {
	console.log(result1);
	this.access_status = result1.access;
	},
	(err: Error) => {
	  console.log(err);
	  // console.log(err.message.split('Internal JSON-RPC error.\n')[1]);
	  let temp: string = err.message.split('Internal JSON-RPC error.\n')[1];
	  temp = temp.split('reason": ')[1];
	  temp = temp.split('\"')[1]
	  temp = temp.split('\"')[0]
	  console.log(temp);
	  this.err_message = temp;
	}
  );
  this.show_record = true;
  this.read_data_blockchain(0);
}

goNext() {
  this.currentPara = (this.currentPara + 1)%6;
  this.read_data_blockchain(this.currentPara);
  }
goPrev() {
if(this.currentPara != 0)
  this.currentPara = this.currentPara - 1;
this.read_data_blockchain(this.currentPara);
}

}
