const { json } = require("express");
const Web3 = require("web3");
require("dotenv").config();

const clientUrl = process.env.CLIENT_HOST + ":" + process.env.CLIENT_PORT;
const contractAdress = process.env.CONTRACT_ADRESS;
const walletAdress = process.env.WALLET_ADRESS;

const web3 = new Web3(clientUrl);
const contractInstance = getContractInstance(web3);

exports.createOrUpdateExam = async (req, res, next) => {
  const cpf = req.body.cpf;
  const isInfected = req.body.isInfected;

  contractInstance.methods
    .createOrUpdate(cpf, isInfected)
    .send({ from: walletAdress, gas: 2999984 })
    .on("receipt", function (receipt) {
      console.log(receipt);
      res.status(200).send(JSON.stringify(receipt));
    })
    .on("error", function (error, receipt) {
      res
        .status(500)
        .send(
          "Failed to send exam: " +
            error +
            "\nReceipt: " +
            JSON.stringify(receipt)
        );
    });
};

exports.retrieveExamByCpf = async (req, res, next) => {
  const cpf = req.body.cpf;

  const result = await contractInstance.methods
    .retrieveLastExamByCpf(cpf)
    .call()
    .catch(function (err) {
      res.status(500).send("Failed to get exam: " + err);
    });

  console.log(parseResult(result));
  res.status(200).send(parseResult(result));
};

function parseResult(result) {
  var obj = new Object();
  obj.cpf = result.cpf;
  obj.id = result.id;
  obj.isInfected = result.isInfected;
  obj.isLastExam = result.isLastExam;
  obj.timestamp = result.timestamp;

  return JSON.stringify(obj);
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
