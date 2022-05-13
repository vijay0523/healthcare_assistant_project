import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';

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
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  patient_dataset = Object({
    healthcare_admit_id: '123456',
    admit_time: '23-10-2164 21:09',
    discharge_time: '01-11-2164 17:15',
    admission_type: 'EMERGENCY',
    admission_location: 'EMERGENCY ROOM',
    discharge_location: 'HOME HEALTH CARE',
    insurance: 'Medicare',
    marital_status: 'Seperated',
    ethinicity: 'BLACK/AFRICAN',
    diagnosis: 'SEPSIS'
  });
  
  column_names: string[] = [];
  values: string[] = [];
  blockchain_data!: string;
  blockchain_decrypted!: string;
  secrets: string[] = [];
  smart_contract_addr: string = "0x1f1aAFECeeaEd1aD8F896e024681763828e47332";
  account_addr: string = "0x3738311e29EA5B33092063E5Eb8D43AD83012E07";
  currentPara: number = 0;
  loading: boolean = false;
  account_type: string = "";
  read_access: number[] = [];
  write_access: number[] = [];

  constructor() { 
    (window as any).ethereum.enable();
  }

  async ngOnInit(): Promise<void> {
    (window as any).ethereum.enable();
    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.account_addr = account;
    console.log(account);
    (window as any).ethereum.on('accountsChanged',  (accounts: any) => {
      // Time to reload your interface with accounts[0]!
      console.log(accounts[0]);
      this.account_addr = accounts[0];
    });

    let Web3 = require('web3/dist/web3.min.js');
    Web3 = new Web3((window as any).ethereum);
    var contract = new Web3.eth.Contract(abi, this.smart_contract_addr);
    contract.methods.list_priviledges().call({from: this.account_addr}).then((result1: any) => {
      this.account_type = result1[0];
      this.read_access = result1[1];
      this.write_access = result1[2];
    });

    this.read_data_blockchain(1);

  }

  read_data_blockchain(para: number) {
    // para = 1;
    this.secrets = JSON.parse(String(localStorage.getItem('keys')));
    let Web3 = require('web3/dist/web3.min.js');
    Web3 = new Web3((window as any).ethereum);
    var contract = new Web3.eth.Contract(abi, this.smart_contract_addr);
    contract.methods.read_all_records("PID1").call({from: this.account_addr}).then((result1: any) => {
      console.log(result1);
      this.blockchain_data = result1[para];
      this.blockchain_decrypted = CryptoJS.AES.decrypt(result1[para], this.secrets[para]).toString(CryptoJS.enc.Utf8);
      this.column_names = Object.keys(JSON.parse(this.blockchain_decrypted));
        this.values = Object.values(JSON.parse(this.blockchain_decrypted));
      this.loading = false;
    });
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
