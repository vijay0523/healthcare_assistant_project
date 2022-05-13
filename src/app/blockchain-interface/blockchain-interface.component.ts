import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
// import * as crypto from 'crypto';
const crypto  = require('crypto');
let keypair = require('keypair');
import { JSEncrypt } from 'jsencrypt';
const CryptoBrowserify = require('crypto-browserify');
import { Buffer } from 'buffer';

// import * as keypair from 'keypair';
import Web3 from 'web3';

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

interface PatientRecord {
  healthcare_admit_id: string,
  admit_time: string,
  discharge_time: string,
  admission_type: string,
  admission_location: string,
  discharge_location: string,
  insurance: string,
  marital_status: string,
  ethinicity: string,
  diagnosis: string
}

@Component({
  selector: 'app-blockchain-interface',
  templateUrl: './blockchain-interface.component.html',
  styleUrls: ['./blockchain-interface.component.css']
})
export class BlockchainInterfaceComponent implements OnInit {

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
  
  column_names: string[];
  values: string[];
  json_encoded: string;
  encrypted_data: string;
  decrypted_data: string;
  blockchain_data!: string;
  blockchain_decrypted!: string;
  secrets: string[] = [];
  smart_contract_addr: string = "0x1f1aAFECeeaEd1aD8F896e024681763828e47332";
  account_addr: string = "0x3738311e29EA5B33092063E5Eb8D43AD83012E07";
  currentPara: number = 0;
  loading: boolean = false;

  constructor(private http: HttpClient) { 
    this.column_names = Object.keys(this.patient_dataset);
    this.values = Object.values(this.patient_dataset);
    this.column_names = this.column_names.map(key => {return key.replace('_', ' ').replace('_', ' ').replace('_', ' ');});

    this.json_encoded = JSON.stringify(this.patient_dataset);

    this.encrypted_data = CryptoJS.AES.encrypt(this.json_encoded, 'secret key 123').toString();
    this.decrypted_data = CryptoJS.AES.decrypt(this.encrypted_data, 'secret key 123').toString(CryptoJS.enc.Utf8);

    let Web3 = require('web3/dist/web3.min.js');
    Web3 = new Web3((window as any).ethereum);
	  (window as any).ethereum.enable();

    Web3.eth.getBalance(this.account_addr).then((balance: any) => {

			console.log(balance);
      
	});

  }

  ngOnInit(): void {
  }

  call_blockchain() {

	// let keyPair = window.crypto.subtle.generateKey(
	// 	{
	// 		name: "RSA-OAEP",
	// 		modulusLength: 2048,
	// 		publicExponent: new Uint8Array([1, 0, 1]),
	// 		hash: "SHA-256"
	// 	},
	// 	true,
	// 	["encrypt", "decrypt"]
	// 	);
	
	// keyPair.then((keyPair: any) => {
	// 	console.log(keyPair);
	// 	window.crypto.subtle.exportKey('jwk', keyPair).then(
	// 		(key: any) => {
	// 			console.log(key);
	// 		}
	// 	);
	// });

	// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	// 	// The standard secure default length for RSA keys is 2048 bits]
	// 	modulusLength: 2048,
	// 	publicKeyEncoding: {
	// 	  type: 'spki',       // recommended to be 'spki' by the Node.js docs
	// 	  format: 'pem'
	// 	},
	// 	privateKeyEncoding: {
	// 	  type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
	// 	  format: 'pem',
	// 	}
	// });

	// let keyPair = keypair();

	// let keys = keyPair;
	// console.log(keys);

	// let publicKey = keys.public;
	// let privateKey = keys.private;

	this.loading = true;

	let Web3 = require('web3/dist/web3.min.js');
	Web3 = new Web3((window as any).ethereum);

	var contract = new Web3.eth.Contract(abi, this.smart_contract_addr);

	// contract.methods.store(["abc", "def", "ghi", "klm", this.encrypted_data], 0).send({from: this.account_addr}).on('receipt', (result: any) => {
	//   console.log(result);
	let crypt = new JSEncrypt({default_key_size: '2048'});
	let privateKey = crypt.getPrivateKey();
	let publicKey = crypt.getPublicKey();
	console.log(privateKey);
	console.log(publicKey);
	crypt.setPublicKey(publicKey);
	let e = crypt.encrypt("hii").toString();
	console.log(e);
	crypt.setPrivateKey(privateKey);
	let d = crypt.decrypt(e);
	console.log(d);

	this.http.post('http://localhost:3000/api/getRecords', {key: publicKey.toString()}).subscribe((result: any) => {

		// let decr_sec:any = [];

		result.data.encrypted_secrets.forEach((secret: string) => {
			// this.secrets.push(this.decryptText(secret, privateKey.toString()).toString());
			// console.log(this.decryptText(secret, privateKey.toString()));
			// console.log(CryptoBrowserify.privateDecrypt(privateKey, Buffer.from(secret, 'base64')).toString());
			console.log(crypt.decrypt(secret.toString()));
			this.secrets.push(String(crypt.decrypt(secret)));
		});
		// let decr_sec = this.decryptText(result.data.encrypted_secrets, privateKey.toString());
		// console.log(decr_sec.toString());
		// this.secrets = JSON.parse(decr_sec.toString());
		console.log(this.secrets);
	
		contract.methods.read_all_records(result.data.pid).call({from: this.account_addr}).then((result1: any) => {
			console.log(result1);
			this.blockchain_data = result1[0];
			this.blockchain_decrypted = CryptoJS.AES.decrypt(this.blockchain_data, this.secrets[0]).toString(CryptoJS.enc.Utf8);
			this.loading = false;
		});

	});
  }

  read_data_blockchain(para: number) {
	// para = 1;
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
		localStorage.setItem('keys', JSON.stringify(this.secrets));
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

  decryptText (encryptedText: any, key: any) {
	return crypto.privateDecrypt(
	  {
		// key: fs.readFileSync('private_key.pem', 'utf8'),
		key: key,
		// In order to decrypt the data, we need to specify the
		// same hashing function and padding scheme that we used to
		// encrypt the data in the previous step
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: 'sha256'
	  },
	  encryptedText
	)
  }

}
