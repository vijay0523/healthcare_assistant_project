import { Component, OnInit } from '@angular/core';
import { ABI, SMART_CONTRACT } from '../../shared/constants';
import * as CryptoJS from 'crypto-js';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.css']
})
export class PatientRecordComponent implements OnInit {

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
