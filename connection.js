const Web3 = require("web3");
require("dotenv").config();

const clientUrl = process.env.CLIENT_HOST + ":" + process.env.CLIENT_PORT;
const contractAdress = process.env.CONTRACT_ADRESS;

function start() {
  // const web3 = new Web3(clientUrl);

  console.log(clientUrl);
  console.log(contractAdress);

  // connection = getContractInstance(web3);
  // connection.createOrUpdate("120", true);
}

function getContractInstance(web3) {
  //This is the 'interface' that explains to our javascript code how to interact with the solidity contract.
  //Passing the adress of contract deploy transaction, we instantiate the contract session.
  var EthereumSession = new web3.eth.Contract(
    [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "arrayExams",
        outputs: [
          {
            internalType: "string",
            name: "cpf",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isInfected",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isLastExam",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_cpf",
            type: "string",
          },
        ],
        name: "checkUser",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "a",
            type: "string",
          },
          {
            internalType: "string",
            name: "b",
            type: "string",
          },
        ],
        name: "compareStrings",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_cpf",
            type: "string",
          },
          {
            internalType: "bool",
            name: "_isInfected",
            type: "bool",
          },
        ],
        name: "createOrUpdate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "nextId",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_cpf",
            type: "string",
          },
        ],
        name: "retrieveLastExamByCpf",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "cpf",
                type: "string",
              },
              {
                internalType: "bool",
                name: "isInfected",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "isLastExam",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
            ],
            internalType: "struct CovidExams.Exam",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    contractAdress
  );

  return EthereumSession;
}

module.exports = start;
