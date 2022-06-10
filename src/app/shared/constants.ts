export const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pid",
				"type": "string"
			}
		],
		"name": "approve_access",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
				"internalType": "string",
				"name": "pid",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "padd",
				"type": "address"
			}
		],
		"name": "request_access",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "revoke_access",
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
				"internalType": "address",
				"name": "padd",
				"type": "address"
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
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "accessAuthority",
		"outputs": [
			{
				"internalType": "address",
				"name": "doctor_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "patient_address",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "access",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
			},
			{
				"internalType": "address",
				"name": "account_addr",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "add",
				"type": "address"
			}
		],
		"name": "list_account_priviledges",
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
		"inputs": [],
		"name": "list_all_patients",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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

export const SMART_CONTRACT = "0x279395A8DB4656e043319F075b08e7CC2dd3e66e";

export const PATIENT_EXPLAINER_1 = "https://a0sn1u9tru-496ff2e9c6d22116-8050-colab.googleusercontent.com/";
// https://colab.research.google.com/drive/1jq_5v0b0b9NF6zTAh9GLf-LZeFXckkDu#scrollTo=fpUyRsAzSL8f

export const PATIENT_EXPLAINER_2 = "https://csaaewka7k6-496ff2e9c6d22116-8050-colab.googleusercontent.com/";
// https://colab.research.google.com/drive/1PNo14DdV3NVuvpwf-xlW_H2Hyj_9-F4M

export const DOCTOR_EXPLAINER_1 = "https://bbnpzj7bjq-496ff2e9c6d22116-8050-colab.googleusercontent.com/";
// https://colab.research.google.com/drive/1pSxhHFZLjkAknmPnwJxFDjHfcOjs0sCF

export const DOCTOR_EXPLAINER_2 = "https://p756q6ww6m-496ff2e9c6d22116-8050-colab.googleusercontent.com/";
// https://colab.research.google.com/drive/1kCR6EjYVQGLj0f2MaYT46h9cjV_Vm2id#scrollTo=fpUyRsAzSL8f