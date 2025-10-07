export const ARTIFACT_ABI = [
  {
      "inputs": [
        {
          "internalType": "address",
          "name": "builderAddr",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "honorAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "artifactLoc",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_vouchingAddr",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_honorAmt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_vouchAmt",
          "type": "uint256"
        }
      ],
      "name": "Unvouch",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "_vouchingAddr",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_honorAmt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "_vouchAmt",
          "type": "uint256"
        }
      ],
      "name": "Vouch",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "accHonorHours",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
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
          "name": "claimer",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "activeOnly",
          "type": "bool"
        }
      ],
      "name": "accRewardClaim",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "antihonorWithin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
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
          "name": "account",
          "type": "address"
        }
      ],
      "name": "antivouch",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "vouchAmt",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "builder",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "honorAddr",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "vouchAmt",
          "type": "uint256"
        }
      ],
      "name": "honorAmtPerVouch",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "honorWithin",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
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
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "inputHonor",
          "type": "uint256"
        }
      ],
      "name": "initVouch",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "vouchAmt",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "isValidated",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "location",
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
      "inputs": [],
      "name": "netHonor",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "receiveDonation",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "claimer",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "redeemAmt",
          "type": "uint256"
        }
      ],
      "name": "redeemRewardClaim",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "rewardFlow",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "setRewardFlow",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
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
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "unvouchAmt",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isHonor",
          "type": "bool"
        }
      ],
      "name": "unantivouch",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "hnrAmt",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "unvouchAmt",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isHonor",
          "type": "bool"
        }
      ],
      "name": "unvouch",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "hnrAmt",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "voucher",
          "type": "address"
        }
      ],
      "name": "updateAccumulated",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "validate",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "vouch",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "vouchAmt",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "honorAmt",
          "type": "uint256"
        }
      ],
      "name": "vouchAmtPerHonor",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  // "transactionHash": "0x0c78d08f333ad5303f4ed66f084c53f190f48cdbaefb7e9d90b173e38d4cd4ee",
  // "receipt": {
  //   "to": null,
  //   "from": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //   "contractAddress": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  //   "transactionIndex": 0,
  //   "gasUsed": "1720480",
  //   "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  //   "blockHash": "0x1be4d6c2edbd08124a91b896f043a205d3ef20371846ede3625a603e76fcbfb8",
  //   "transactionHash": "0x0c78d08f333ad5303f4ed66f084c53f190f48cdbaefb7e9d90b173e38d4cd4ee",
  //   "logs": [],
  //   "blockNumber": 5,
  //   "cumulativeGasUsed": "1720480",
  //   "status": 1,
  //   "byzantium": true
  // },
  // "args": [
  //   "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  //   "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  //   "Dummy Artifact"
  // ],
  // "numDeployments": 1,
  // "solcInputHash": "533724cb5f803cfa690faf7c22320e65",
  // "metadata": "{\"compiler\":{\"version\":\"0.8.20+commit.a1b79de6\"},\"language\":\"Solidity\",\"output\":{\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"builderAddr\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"honorAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"artifactLoc\",\"type\":\"string\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_vouchingAddr\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_from\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_honorAmt\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_vouchAmt\",\"type\":\"uint256\"}],\"name\":\"Unvouch\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_vouchingAddr\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"_to\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_honorAmt\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_vouchAmt\",\"type\":\"uint256\"}],\"name\":\"Vouch\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"accHonorHours\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"claimer\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"activeOnly\",\"type\":\"bool\"}],\"name\":\"accRewardClaim\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"antihonorWithin\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"antivouch\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"vouchAmt\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"addr\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"builder\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"honorAddr\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"vouchAmt\",\"type\":\"uint256\"}],\"name\":\"honorAmtPerVouch\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"honorWithin\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"inputHonor\",\"type\":\"uint256\"}],\"name\":\"initVouch\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"vouchAmt\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"isValidated\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"location\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"netHonor\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"\",\"type\":\"int256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"receiveDonation\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"claimer\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"redeemAmt\",\"type\":\"uint256\"}],\"name\":\"redeemRewardClaim\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"rewardFlow\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"setRewardFlow\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"unvouchAmt\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"isHonor\",\"type\":\"bool\"}],\"name\":\"unantivouch\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"hnrAmt\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"unvouchAmt\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"isHonor\",\"type\":\"bool\"}],\"name\":\"unvouch\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"hnrAmt\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"voucher\",\"type\":\"address\"}],\"name\":\"updateAccumulated\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"validate\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"vouch\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"vouchAmt\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"honorAmt\",\"type\":\"uint256\"}],\"name\":\"vouchAmtPerHonor\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}],\"devdoc\":{\"kind\":\"dev\",\"methods\":{},\"version\":1},\"userdoc\":{\"kind\":\"user\",\"methods\":{\"antivouch(address)\":{\"notice\":\"Given some input antihonor to this artifact, return the vouch amount. \"},\"redeemRewardClaim(address,uint256)\":{\"notice\":\"Given some amount to redeem by the artifact's RF contract, check how   much vouch-time the claimer has accumulated and deduct. The return value  is meant to be a ratio relative to the total available, so that the  Geras contract knows how much is redeemable by this claimer.\"},\"unantivouch(address,uint256,bool)\":{\"notice\":\"Given some valid input vouching claim to this artifact, return the honor. \"},\"unvouch(address,uint256,bool)\":{\"notice\":\"Given some valid input vouching claim to this artifact, return the HONOR.  Delta(H) is calculated as: H_out = H_T - (H_T * (V_T - V_in)^2) / V_T^2 OR  V_in = V_T - (V_T * sqrt(H_T - H_out) / sqrt(H_T))\"},\"updateAccumulated(address)\":{\"notice\":\"Keep time-weighted record of the vouch claims of each vouching address.  These will be updated asynchronously, although the total will always  have the correct value since we know the total supply.\"},\"vouch(address)\":{\"notice\":\"Given some input honor to this artifact, return the output vouch amount.  The change in vouch claim will be calculated from the difference in  square roots of the HONOR added to this artifact  (sqrt(honor_after) - sqrt(honor_before)).  The same holds true for unvouching. The question of \\\"which square root\\\" will be answered by using 2^60 as  a pivot point, given its proximity to 1e18. That is, the amount of wei  where the same value is returned will be 2^60. The virtue of this value  is that it can be renormalized by adding 30 bits to the calculated root.  (or if cube roots are used, 20 bits can be added). Essentially we are  taking sqrt(X) * sqrt(2^60) to keep the curves reasonably in line.  The formula for Delta(V) is: V_out = sqrt(H_T + H_in) * V_T / sqrt(H_T) - V_T\"}},\"version\":1}},\"settings\":{\"compilationTarget\":{\"contracts/Artifact.sol\":\"Artifact\"},\"evmVersion\":\"paris\",\"libraries\":{},\"metadata\":{\"bytecodeHash\":\"ipfs\",\"useLiteralContent\":true},\"optimizer\":{\"enabled\":true,\"runs\":200},\"remappings\":[]},\"sources\":{\"contracts/Artifact.sol\":{\"content\":\"// SPDX-License-Identifier: MIT\\npragma solidity ^0.8.13;\\n\\nimport \\\"./SafeMath.sol\\\";\\nimport \\\"../interfaces/IArtifact.sol\\\";\\nimport \\\"../interfaces/ISTT.sol\\\";\\nimport \\\"../interfaces/IRewardFlow.sol\\\";\\nimport \\\"../interfaces/IRewardFlowFactory.sol\\\";\\n\\n// This contract represents an artifact, which is a desitnation of Honor and \\n// has its own token to represent shares of: the vouch claim.\\n// A \\\"vouch\\\" is comprised of a transfer of HONOR from one artifact to another, \\n// by a holder of the first. HONOR is removed from the sender's balance for this \\n// artifact, and added to the vouchee artifact.\\n// In return, some amount of vouch claim token will be redeemed/burned to the \\n// sending artifact, and minted from the receiving one. This will be governed \\n// according to a two-way quadratic bonding curve.\\n\\n\\ncontract Artifact is IArtifact {\\n\\n    uint32 private _lastUpdated;\\n    uint private _totalSupply;\\n    mapping (address => uint) private _balances;\\n\\n    // These mappings are necessary to track the relative share of each claim.\\n    // The reward flows are time-weighted, so they need to be synced together.\\n    mapping (address => uint) private _accRewardClaims;\\n    mapping (address => uint32) private _lastUpdatedVouch;\\n\\n    string public location; \\n    address public honorAddr;\\n    address public builder;\\n    uint public honorWithin;\\n    uint public accHonorHours;\\n    bool public isValidated;\\n    address public rewardFlow;\\n\\n    // Currently unutilized but making room for future extensions.\\n    uint public antihonorWithin;\\n    int public netHonor;\\n    \\n    constructor(\\n        address builderAddr,  \\n        address honorAddress, \\n        string memory artifactLoc) {\\n        builder = builderAddr;\\n        location = artifactLoc;\\n        honorAddr = honorAddress;\\n        _balances[builderAddr] = 0;\\n        _lastUpdated = uint32(block.timestamp);\\n        _accRewardClaims[address(this)] = 0;\\n        _lastUpdatedVouch[address(this)] = uint32(block.timestamp);\\n    }\\n\\n    /* \\n     * Intended to be used only once upon initialization/validation.\\n     * We can safely take the square root since there is no other amount in this \\n     * artifact. By setting the square root baseline = 2^60 once, we don't need \\n     * it for the other ratios. Here, we could probably use fixed values for \\n     * the VALIDATE_AMT but this illustrates the bonding process.\\n     * Unfortunately, we cannot simply take the HONOR deposited to this artifact\\n     * because the honor contract will not have been constructed for the root. \\n     */\\n    function initVouch(address account, uint inputHonor)\\n    external returns(uint vouchAmt) {\\n        require(msg.sender == honorAddr && honorWithin == 0, \\n            'Initialization by HONOR only.');\\n        if (inputHonor == 0) {\\n            inputHonor = ISTT(honorAddr).balanceOf(address(this));\\n            require(inputHonor > 0, 'No HONOR transferred to init.');\\n        }\\n\\n        vouchAmt = SafeMath.floorSqrt(inputHonor) << 30;\\n        _mint(account, vouchAmt);\\n        honorWithin = inputHonor;\\n        _lastUpdatedVouch[account] = uint32(block.timestamp);\\n\\n        // netHonor += inputHonor;\\n    }\\n\\n    /** \\n      * Keep time-weighted record of the vouch claims of each vouching address. \\n      * These will be updated asynchronously, although the total will always \\n      * have the correct value since we know the total supply.\\n    */\\n    function updateAccumulated(address voucher) public override returns (uint) {\\n\\n        // We don't want an infinite loop, but we do want to include the builder\\n        // in the new total. \\n        // if (voucher != builder) { recomputeBuilderVouch(); }\\n\\n        if (uint32(block.timestamp) == _lastUpdatedVouch[voucher]) {\\n            return _accRewardClaims[voucher];\\n        }\\n\\n        _accRewardClaims[address(this)] += _totalSupply * (\\n            uint32(block.timestamp) - _lastUpdatedVouch[address(this)]);\\n        _lastUpdatedVouch[address(this)] = uint32(block.timestamp);\\n\\n        if (voucher == address(this)) { return _accRewardClaims[address(this)];}\\n        if (_lastUpdatedVouch[voucher] != 0) {\\n            if (_balances[voucher] == 0) { return _accRewardClaims[voucher]; }\\n            _accRewardClaims[voucher] += _balances[voucher] * (\\n                uint32(block.timestamp) - _lastUpdatedVouch[voucher]);\\n        }\\n        _lastUpdatedVouch[voucher] = uint32(block.timestamp);\\n        return _accRewardClaims[voucher];\\n    }\\n\\n    /**\\n      * Given some amount to redeem by the artifact's RF contract, check how  \\n      * much vouch-time the claimer has accumulated and deduct. The return value \\n      * is meant to be a ratio relative to the total available, so that the \\n      * Geras contract knows how much is redeemable by this claimer.\\n    */\\n    function redeemRewardClaim(address claimer, uint256 redeemAmt) \\n    external override {\\n        // require(msg.sender == rewardFlow, 'Only RF can redeem reward');\\n        require(_accRewardClaims[claimer] >= redeemAmt, \\n            'redeem amount exceeds accRewardClaims');\\n        _accRewardClaims[claimer] = _accRewardClaims[claimer] - redeemAmt;\\n        _accRewardClaims[address(this)] = _accRewardClaims[address(this)] - redeemAmt;\\n    }\\n\\n    function accRewardClaim(address claimer, bool activeOnly) \\n    external override view returns (uint) {\\n        if (!activeOnly) {\\n            return _accRewardClaims[claimer];\\n        }\\n        if  (claimer == address(this)) {\\n            return _accRewardClaims[claimer] - (\\n            _accRewardClaims[ISTT(honorAddr).owner()]);\\n        }\\n        return (claimer == ISTT(honorAddr).owner()) ? 0 : (\\n            _accRewardClaims[claimer]);\\n    } \\n\\n    function vouchAmtPerHonor(uint honorAmt) external override view returns (\\n        uint) {\\n        return _totalSupply - ((((\\n            SafeMath.floorSqrt(honorWithin - honorAmt)) * _totalSupply) / ( \\n            SafeMath.floorSqrt(honorWithin))));\\n    }\\n\\n    function honorAmtPerVouch(uint vouchAmt) external override view returns (\\n        uint) {\\n        return honorWithin - ((honorWithin * ((_totalSupply - vouchAmt) ** 2) /(\\n                (_totalSupply ** 2))));\\n    }\\n\\n    /** \\n      * Given some input honor to this artifact, return the output vouch amount. \\n      * The change in vouch claim will be calculated from the difference in \\n      * square roots of the HONOR added to this artifact \\n      * (sqrt(honor_after) - sqrt(honor_before)). \\n      * The same holds true for unvouching.\\n      *\\n      * The question of \\\"which square root\\\" will be answered by using 2^60 as \\n      * a pivot point, given its proximity to 1e18. That is, the amount of wei \\n      * where the same value is returned will be 2^60. The virtue of this value \\n      * is that it can be renormalized by adding 30 bits to the calculated root. \\n      * (or if cube roots are used, 20 bits can be added). Essentially we are \\n      * taking sqrt(X) * sqrt(2^60) to keep the curves reasonably in line. \\n      * The formula for Delta(V) is:\\n      * V_out = sqrt(H_T + H_in) * V_T / sqrt(H_T) - V_T\\n    */\\n    function vouch(address account) external override returns(uint vouchAmt) {\\n        uint totalHonor = ISTT(honorAddr).balanceOf(address(this));\\n        require(totalHonor > honorWithin, 'No new HONOR added to vouch');\\n        uint deposit = totalHonor - honorWithin;\\n\\n        updateAccumulated(account);\\n\\n        if (SafeMath.floorSqrt(honorWithin) > 2**10) {\\n            vouchAmt = ((((SafeMath.floorSqrt(totalHonor)) * _totalSupply) / ( \\n                SafeMath.floorSqrt(honorWithin)))) - _totalSupply;\\n        }\\n        else {\\n            vouchAmt = SafeMath.floorSqrt(totalHonor) << 30;\\n        }\\n        emit Vouch(account, address(this), deposit, vouchAmt);\\n        _mint(account, vouchAmt);\\n        if (isValidated) { recomputeBuilderVouch(); }\\n        honorWithin += deposit;\\n        // netHonor += deposit;\\n    }\\n\\n    /** \\n       Given some valid input vouching claim to this artifact, return the HONOR. \\n       Delta(H) is calculated as:\\n       H_out = H_T - (H_T * (V_T - V_in)^2) / V_T^2\\n\\n       OR \\n\\n       V_in = V_T - (V_T * sqrt(H_T - H_out) / sqrt(H_T))\\n    */\\n    function unvouch(address account, uint unvouchAmt, bool isHonor) \\n    external override returns(uint hnrAmt) {\\n        require(account == msg.sender || msg.sender == honorAddr, \\n            'Only Honor or sender can unvouch');\\n        updateAccumulated(account);\\n\\n        if (!isHonor) {\\n            require(_balances[account] >= unvouchAmt, \\n                'Artifact: Insuff. vouch bal');\\n\\n            uint vouchedPost = _totalSupply - unvouchAmt;\\n            hnrAmt = honorWithin - ((honorWithin * (vouchedPost ** 2) / (\\n                (_totalSupply ** 2))));\\n        }\\n        else {\\n            require(honorWithin >= unvouchAmt && _balances[account] > 0, \\n                'Insuff. honor vouch bal');\\n            hnrAmt = unvouchAmt;\\n            unvouchAmt = _totalSupply - ((((\\n                SafeMath.floorSqrt(honorWithin - hnrAmt)) * _totalSupply) / ( \\n                SafeMath.floorSqrt(honorWithin))));\\n            require(_balances[account] >= unvouchAmt, 'Insuff final vouch bal');\\n        }\\n\\n        emit Unvouch(account, address(this), hnrAmt, unvouchAmt);\\n\\n        if (isValidated) { recomputeBuilderVouch(); }\\n        \\n        honorWithin -= hnrAmt;\\n        _burn(account, unvouchAmt);\\n        // netHonor -= hnrAmt;\\n    }\\n\\n    /** \\n      * Given some input antihonor to this artifact, return the vouch amount. \\n    */\\n    function antivouch(address account) external override returns(uint vouchAmt) {\\n    //     uint totalHonor = ISTT(honorAddr).balanceOf(address(this));\\n    //     uint deposit = SafeMath.sub(totalHonor, honorWithin + antihonorWithin);\\n    //     emit Vouch(account, address(this), deposit, vouchAmt);\\n    //     _mint(account, vouchAmt);\\n    //     recomputeBuilderVouch();\\n    //     antihonorWithin += deposit;\\n    //     netHonor -= deposit;\\n        require(false, 'antivouch unimplemented.');\\n        return 0;\\n    }\\n\\n    /** \\n      * Given some valid input vouching claim to this artifact, return the honor. \\n    */\\n    function unantivouch(address account, uint unvouchAmt, bool isHonor) \\n    external override returns(uint hnrAmt) {\\n    //     require(_balances[account] >= unvouchAmt, \\\"Insufficient vouching balance\\\");\\n    //     // require(ISTT(honorAddr).balanceOf(to) != 0, \\\"Invalid vouching target\\\");\\n    //     uint vouchedPost = SafeMath.sub(_totalSupply, unvouchAmt);\\n    //     emit Unvouch(account, address(this), hnrAmt, unvouchAmt);\\n    //     recomputeBuilderVouch();\\n    //     antihonorWithin -= hnrAmt;\\n    //     netHonor += hnrAmt;\\n    //     _burn(account, unvouchAmt);\\n    //     _balances[account] -= unvouchAmt;\\n\\n        require(false, 'unantivouch unimplemented.');\\n        return 0;\\n    }\\n\\n    /* \\n     * The amount of the vouch claim going to the builder will increase based on \\n     * the vouched HONOR over time, which is tracked by accumulated HONOR hours. \\n     * However, below a floor of 2^30 we do not add to the builder amount, \\n     * because the cube root would be too distorted.\\n     * This means that the builder comp begins at 2^50 = 2^10 * 2^40 units.\\n     */\\n    function recomputeBuilderVouch() private returns (uint newBuilderVouchAmt) {\\n        if (ISTT(honorAddr).rootArtifact() == address(this)) { \\n            return 0; \\n        }\\n        uint newHonorQtrs = ((block.timestamp - uint(_lastUpdated)) * (\\n            honorWithin)) / 7776000;\\n        newBuilderVouchAmt = (SafeMath.floorCbrt((\\n            (accHonorHours + newHonorQtrs) >> 30) << 30) << 40) - (\\n            SafeMath.floorCbrt((accHonorHours >> 30) << 30) << 40);\\n        accHonorHours += newHonorQtrs;\\n        _lastUpdated = uint32(block.timestamp);\\n        if (newBuilderVouchAmt <= 0) {\\n            return newBuilderVouchAmt;\\n        }\\n        emit Vouch(builder, address(this), 0, newBuilderVouchAmt);\\n        _mint(builder, newBuilderVouchAmt);\\n        updateAccumulated(builder);\\n    }\\n\\n    function balanceOf(address addr) public view returns(uint) {\\n        return _balances[addr];\\n    }\\n\\n    function setRewardFlow() external override returns(address) {\\n        // require(rewardFlow == address(0), 'Artifact rewardFlow already set');\\n        require(ISTT(honorAddr).rewardFlowFactory() == IRewardFlow(\\n            msg.sender).rfFactory(), 'Invalid rewardFlowFactory');\\n        require(IRewardFlowFactory(IRewardFlow(\\n            msg.sender).rfFactory()).getArtiToRF(address(this)) == msg.sender, \\n        \\\"RF/artifact pair don't match\\\");\\n\\n        rewardFlow = msg.sender;\\n        return rewardFlow;\\n    }\\n\\n    function receiveDonation() external override returns(uint) {\\n        require(msg.sender == honorAddr, 'Only HONOR contract can donate');\\n        honorWithin += SafeMath.sub(ISTT(honorAddr).balanceOf(address(this)), \\n            honorWithin);\\n        // netHonor += SafeMath.sub(totalHonor, honorWithin);\\n        return honorWithin;\\n    }\\n\\n    function validate() external override returns(bool) {\\n        require(msg.sender == honorAddr, 'Invalid validation source');\\n        isValidated = true;\\n        return isValidated;\\n    }\\n\\n\\n    function _mint(address account, uint256 amount) internal virtual {\\n        _totalSupply += amount;\\n        _balances[account] += amount;\\n        emit Transfer(address(0), account, amount);\\n    }\\n\\n    function _burn(address account, uint256 amount) internal virtual {\\n        require(account != address(0), \\\"Artifact: burn from zero\\\");\\n\\n        uint256 accountBalance = _balances[account];\\n        require(accountBalance >= amount, \\\"Artifact: burn exceeds bal\\\");\\n        _balances[account] = accountBalance - amount;\\n        _totalSupply -= amount;\\n\\n        emit Transfer(account, address(0), amount);\\n    }\\n\\n    function totalSupply() external override view returns (uint256) {\\n        return _totalSupply;\\n    }\\n}\\n\",\"keccak256\":\"0xb55ad8eb5bf887c54e30c589b7ffb2611543612402321bfb4c146cc5e9c48b70\",\"license\":\"MIT\"},\"contracts/SafeMath.sol\":{\"content\":\"pragma solidity >=0.6.0;\\n\\nlibrary SafeMath {\\n\\n    function abs(int x) internal pure returns (int z) {\\n        if (x > 0) {\\n            z = x;\\n        } else {\\n            z = 0-x;\\n        }\\n    }\\n\\n    function max(uint x, uint y) internal pure returns (uint z) {\\n        if (x > y) {\\n            z = x;\\n        } else {\\n            z = y;\\n        }\\n    }\\n\\n    function min(uint x, uint y) internal pure returns (uint z) {\\n        if (x < y) {\\n            z = x;\\n        } else {\\n            z = y;\\n        }\\n    }\\n\\n    function add(uint x, uint y) internal pure returns (uint z) {\\n        require((z = x + y) >= x, 'ds-math-add-overflow');\\n    }\\n\\n    function sub(uint x, uint y) internal pure returns (uint z) {\\n        require((z = x - y) <= x, 'ds-math-sub-underflow');\\n    }\\n\\n    function mul(uint x, uint y) internal pure returns (uint z) {\\n        require(y == 0 || (z = x * y) / y == x, 'ds-math-mul-overflow');\\n    }\\n\\n    function addInt(int x, int y) internal pure returns (int z) {\\n        if (y >= 0) {\\n            require((z = x + y) >= x, 'ds-math-addint-overflow');\\n        }\\n        else {\\n            require((z = x + y) < x, 'ds-math-addint-overflow');\\n        }\\n    }\\n\\n    function subInt(int x, int y) internal pure returns (int z) {\\n        if (y >= 0) {\\n            require((z = x - y) <= x, 'ds-math-subint-underflow');\\n        } else {\\n            require((z = x - y) > x, 'ds-math-subint-underflow');\\n        }\\n    }\\n\\n    function mulInt(int x, int y) internal pure returns (int z) {\\n        require(y == 0 || (z = x * y) / y == x, 'ds-math-mulint-overflow');\\n    }\\n\\n    // function cubeRoot(uint x, uint tol) internal pure returns (uint z) {\\n    //     if (x > 8) {\\n    //         uint start = 0;\\n    //         uint end = x;\\n    //         while (sub(end, start) > 2 * tol) {\\n    //             z = add(start, end) / 2;\\n    //             if (z * z > x || z * z * z > x) {\\n    //                 end = z;\\n    //             }\\n    //             else {\\n    //                 start = z;\\n    //             }\\n    //         }\\n    //     }\\n    //     else if (y != 0) { \\n    //         z = 1;\\n    //     }\\n    // }\\n\\n    function floorCbrt(uint256 n) internal pure returns (uint256) { unchecked {\\n        uint256 x = 0;\\n        for (uint256 y = 1 << 255; y > 0; y >>= 3) {\\n            x <<= 1;\\n            uint256 z = 3 * x * (x + 1) + 1;\\n            if (n / y >= z) {\\n                n -= y * z;\\n                x += 1;\\n            }\\n        }\\n        return x;\\n    }}\\n\\n\\n    function floorSqrt(uint256 n) internal pure returns (uint256) { unchecked {\\n        if (n > 0) {\\n            uint256 x = n / 2 + 1;\\n            uint256 y = (x + n / x) / 2;\\n            while (x > y) {\\n                x = y;\\n                y = (x + n / x) / 2;\\n            }\\n            return x;\\n        }\\n        return 0;\\n    }}\\n\\n\\n}\",\"keccak256\":\"0x89880f152293ebe7c0ee674f0ef2e9a0c7e05c7b76db7d6304257a3595b78dce\"},\"interfaces/IArtifact.sol\":{\"content\":\"pragma solidity ^0.8.13;\\n\\ninterface IArtifact {\\n\\n    function balanceOf(address account) external view returns (uint256);\\n    function initVouch(address account, uint inputHonor) external returns(uint);\\n    function updateAccumulated(address voucher) external returns (uint); \\n    function vouch(address account) external returns (uint256);\\n    function unvouch(address account, uint256 unvouchAmt, bool isHonor) external returns(uint256);\\n    function antivouch(address account) external returns(uint);\\n    function unantivouch(address account, uint unvouchAmt, bool isHonor) external returns(uint);\\n    function isValidated() external view returns(bool);\\n    function validate() external returns(bool);\\n    function receiveDonation() external returns(uint);\\n    function honorWithin() external view returns(uint);\\n    function honorAddr() external view returns(address);\\n    function location() external view returns(string memory);\\n    function vouchAmtPerHonor(uint honorAmt) external view returns (uint);\\n    function honorAmtPerVouch(uint vouchAmt) external view returns (uint);\\n    // function getNetHonor() external view returns(uint);\\n    function builder() external view returns(address);\\n    function accHonorHours() external view returns(uint);\\n    function totalSupply() external view returns (uint256);\\n    function rewardFlow() external view returns(address);\\n    function setRewardFlow() external returns(address);\\n    function accRewardClaim(address claimer, bool activeOnly) external returns (uint);\\n    function redeemRewardClaim(address voucher, uint256 redeemAmt) external;\\n\\n    event Transfer(address indexed from, address indexed to, uint256 value);\\n    event Vouch(address indexed _vouchingAddr, address indexed _to, uint256 _honorAmt, uint256 _vouchAmt);\\n    event Unvouch(address indexed _vouchingAddr, address indexed _from, uint256 _honorAmt, uint256 _vouchAmt);\\n}\",\"keccak256\":\"0x5092ef8c59e9c2a486199b6edd7adb936d3fd108274043b43158fd04787573ac\"},\"interfaces/IRewardFlow.sol\":{\"content\":\"pragma solidity ^0.8.13;\\n\\ninterface IRewardFlow {\\n\\n    // function balanceOf(address addr) external view returns(uint);\\n    function artifactAddr() external view returns(address);\\n    function rfFactory() external view returns(address);\\n    function payForward() external returns(address, uint);\\n    function availableReward() external returns(uint);\\n    function receiveVSR() external returns(uint);\\n    function nextAllocator() external view returns (address);\\n    function totalGeras() external view returns (uint);\\n    function setArtifact() external;\\n    function setNonOwnerActive(bool active) external;\\n    function submitAllocation(address targetAddr, uint8 amt, address voucher) external returns(uint);\\n    function redeemReward(address claimer, uint redeemAmt) external returns (uint);\\n    event Allocate(address indexed from, address indexed to, uint256 value);\\n    event Distribute(address indexed from, address indexed to, uint256 value);\\n\\n}\",\"keccak256\":\"0x8d6bf942d51c4c1e6ae3607d1902a427310e8dd2745cc387c2852b7be56d9952\"},\"interfaces/IRewardFlowFactory.sol\":{\"content\":\"pragma solidity ^0.8.13;\\n\\ninterface IRewardFlowFactory {\\n\\n    function createRewardFlow(address, address, address) external returns(address);\\n    function getArtiToRF(address) external view returns(address);\\n\\n}\",\"keccak256\":\"0xe6495d3e609f626dfcfe9b340e76b54ce34b32314eb0fa78615bb5e883c56da0\"},\"interfaces/ISTT.sol\":{\"content\":\"pragma solidity ^0.8.13;\\n\\ninterface ISTT {\\n\\n    function balanceOf(address addr) external view returns(uint);\\n    function totalSupply() external view returns (uint256);\\n    event Transfer(address indexed from, address indexed to, uint256 value);\\n    event Vouch(address _account, address indexed _from, address indexed _to, uint256 _value);\\n    event ArtifactCreated(address newArtifact, address builderAddr, address honorAddr);\\n    function setOwner(address newOwner) external;\\n    function setRewardFlowFactory(address rfFactory) external;\\n    function setGeras(address gerasAddress) external;\\n    function gerasAddr() external view returns(address);\\n    function rootArtifact() external view returns(address);\\n    function getArtifactAtLoc(string memory loc) external view returns(address);\\n    function getAllArtifacts() external view returns (address[] memory);\\n    function owner() external view returns(address);\\n    function rewardFlowFactory() external view returns(address);\\n    function stakingMintPool() external view returns (uint);\\n    function mintToStakers() external returns(uint);\\n    function proposeArtifact(address _from, address builder, string memory loc, bool should_validate) external returns(address);\\n    function validateArtifact(address _from, address addr) external returns(bool);\\n    function vouch(address _from, address _to, uint amount, bool isHonor) external returns(uint);\\n\\n}\",\"keccak256\":\"0x7ce2d8663778913c2de4c9ac04bec09975f9d9e6193c654e0cd5754c5397c543\"}},\"version\":1}",
  // "bytecode": "0x60806040523480156200001157600080fd5b5060405162001f2f38038062001f2f8339810160408190526200003491620000fc565b600780546001600160a01b0319166001600160a01b03851617905560056200005d828262000285565b5050600680546001600160a01b0319166001600160a01b03928316179055166000908152600260209081526040808320839055825463ffffffff199081164263ffffffff1690811785553085526003845282852085905560049093529220805490921617905562000351565b80516001600160a01b0381168114620000e157600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b6000806000606084860312156200011257600080fd5b6200011d84620000c9565b925060206200012e818601620000c9565b60408601519093506001600160401b03808211156200014c57600080fd5b818701915087601f8301126200016157600080fd5b815181811115620001765762000176620000e6565b604051601f8201601f19908116603f01168101908382118183101715620001a157620001a1620000e6565b816040528281528a86848701011115620001ba57600080fd5b600093505b82841015620001de5784840186015181850187015292850192620001bf565b60008684830101528096505050505050509250925092565b600181811c908216806200020b57607f821691505b6020821081036200022c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200028057600081815260208120601f850160051c810160208610156200025b5750805b601f850160051c820191505b818110156200027c5782815560010162000267565b5050505b505050565b81516001600160401b03811115620002a157620002a1620000e6565b620002b981620002b28454620001f6565b8462000232565b602080601f831160018114620002f15760008415620002d85750858301515b600019600386901b1c1916600185901b1785556200027c565b600085815260208120601f198616915b82811015620003225788860151825594840194600190910190840162000301565b5085821015620003415787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b611bce80620003616000396000f3fe608060405234801561001057600080fd5b50600436106101585760003560e01c8063b7c46ab2116100c3578063d7e84fbf1161007c578063d7e84fbf146102bd578063dd66e16b146102d0578063e0455258146102e3578063e04675b8146102f6578063efecfa3a14610309578063fb7da08b1461031c57600080fd5b8063b7c46ab21461025e578063c0953ffc14610271578063c55446621461027a578063c5e338be14610282578063cfee1c5714610297578063d5c0463e146102aa57600080fd5b806345d3292b1161011557806345d3292b146101cd57806347934435146101d5578063516f279e146102055780636901f6681461021a57806370a0823114610222578063925f52bf1461024b57600080fd5b806311c50a991461015d57806318160ddd146101795780631d1be92a146101815780631f25dab21461018a578063414eb8141461019d57806342c1d1d6146101ba575b600080fd5b610166600b5481565b6040519081526020015b60405180910390f35b600154610166565b61016660085481565b61016661019836600461183d565b610325565b600a546101aa9060ff1681565b6040519015158152602001610170565b6101666101c836600461186e565b610372565b6101666103ca565b600a546101ed9061010090046001600160a01b031681565b6040516001600160a01b039091168152602001610170565b61020d6104bb565b604051610170919061188b565b6101aa610549565b61016661023036600461186e565b6001600160a01b031660009081526002602052604090205490565b6101666102593660046118ee565b6105ba565b61016661026c3660046118ee565b61060c565b610166600c5481565b6101ed6108e2565b61029561029036600461192c565b610b75565b005b6101666102a536600461186e565b610c50565b6101666102b8366004611958565b610e4b565b6007546101ed906001600160a01b031681565b6101666102de36600461186e565b61100a565b6101666102f136600461192c565b6111d1565b6006546101ed906001600160a01b031681565b61016661031736600461183d565b61134f565b61016660095481565b600061033260085461139e565b60015461034b8460085461034691906119a3565b61139e565b61035591906119b6565b61035f91906119e3565b60015461036c91906119a3565b92915050565b60405162461bcd60e51b815260206004820152601860248201527f616e7469766f75636820756e696d706c656d656e7465642e000000000000000060448201526000906064015b60405180910390fd5b506000919050565b6006546000906001600160a01b031633146104275760405162461bcd60e51b815260206004820152601e60248201527f4f6e6c7920484f4e4f5220636f6e74726163742063616e20646f6e617465000060448201526064016103b9565b6006546040516370a0823160e01b815230600482015261049d916001600160a01b0316906370a0823190602401602060405180830381865afa158015610471573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104959190611a05565b600854611413565b600860008282546104ae9190611a1e565b9091555050600854919050565b600580546104c890611a31565b80601f01602080910402602001604051908101604052809291908181526020018280546104f490611a31565b80156105415780601f1061051657610100808354040283529160200191610541565b820191906000526020600020905b81548152906001019060200180831161052457829003601f168201915b505050505081565b6006546000906001600160a01b031633146105a65760405162461bcd60e51b815260206004820152601960248201527f496e76616c69642076616c69646174696f6e20736f757263650000000000000060448201526064016103b9565b50600a805460ff1916600190811790915590565b60405162461bcd60e51b815260206004820152601a60248201527f756e616e7469766f75636820756e696d706c656d656e7465642e00000000000060448201526000906064016103b9565b9392505050565b60006001600160a01b03841633148061062f57506006546001600160a01b031633145b61067b5760405162461bcd60e51b815260206004820181905260248201527f4f6e6c7920486f6e6f72206f722073656e6465722063616e20756e766f75636860448201526064016103b9565b61068484610c50565b508161074a576001600160a01b0384166000908152600260205260409020548311156106f25760405162461bcd60e51b815260206004820152601b60248201527f41727469666163743a20496e737566662e20766f7563682062616c000000000060448201526064016103b9565b60008360015461070291906119a3565b905060026001546107139190611b4f565b61071e600283611b4f565b60085461072b91906119b6565b61073591906119e3565b60085461074291906119a3565b915050610866565b826008541015801561077357506001600160a01b03841660009081526002602052604090205415155b6107bf5760405162461bcd60e51b815260206004820152601760248201527f496e737566662e20686f6e6f7220766f7563682062616c00000000000000000060448201526064016103b9565b8290506107cd60085461139e565b6001546107e18360085461034691906119a3565b6107eb91906119b6565b6107f591906119e3565b60015461080291906119a3565b6001600160a01b0385166000908152600260205260409020549093508311156108665760405162461bcd60e51b8152602060048201526016602482015275125b9cdd599988199a5b985b081d9bdd58da0818985b60521b60448201526064016103b9565b604080518281526020810185905230916001600160a01b038716917ec88340df5e02797385529c97e3b8517f5d63197625962979dc1f3f6ac420ae910160405180910390a3600a5460ff16156108c0576108be611469565b505b80600860008282546108d291906119a3565b9091555061060590508484611627565b6000336001600160a01b031663b80ba76b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610922573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109469190611b5e565b6001600160a01b0316600660009054906101000a90046001600160a01b03166001600160a01b03166351cd045f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109c69190611b5e565b6001600160a01b031614610a1c5760405162461bcd60e51b815260206004820152601960248201527f496e76616c696420726577617264466c6f77466163746f72790000000000000060448201526064016103b9565b336001600160a01b0316336001600160a01b031663b80ba76b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a64573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a889190611b5e565b6040516301aa97af60e11b81523060048201526001600160a01b0391909116906303552f5e90602401602060405180830381865afa158015610ace573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af29190611b5e565b6001600160a01b031614610b485760405162461bcd60e51b815260206004820152601c60248201527f52462f6172746966616374207061697220646f6e2774206d617463680000000060448201526064016103b9565b50600a8054610100600160a81b0319163361010090810291909117918290556001600160a01b0391041690565b6001600160a01b038216600090815260036020526040902054811115610beb5760405162461bcd60e51b815260206004820152602560248201527f72656465656d20616d6f756e74206578636565647320616363526577617264436044820152646c61696d7360d81b60648201526084016103b9565b6001600160a01b038216600090815260036020526040902054610c0f9082906119a3565b6001600160a01b038316600090815260036020526040808220929092553081522054610c3c9082906119a3565b306000908152600360205260409020555050565b6001600160a01b03811660009081526004602052604081205463ffffffff9081164290911603610c9657506001600160a01b031660009081526003602052604090205490565b30600090815260046020526040902054610cb69063ffffffff1642611b7b565b63ffffffff16600154610cc991906119b6565b3060009081526003602052604081208054909190610ce8908490611a1e565b9091555050306000818152600460205260409020805463ffffffff19164263ffffffff161790556001600160a01b03831603610d335750503060009081526003602052604090205490565b6001600160a01b03821660009081526004602052604090205463ffffffff1615610e12576001600160a01b0382166000908152600260205260408120549003610d9257506001600160a01b031660009081526003602052604090205490565b6001600160a01b038216600090815260046020526040902054610dbb9063ffffffff1642611b7b565b6001600160a01b038316600090815260026020526040902054610de49163ffffffff16906119b6565b6001600160a01b03831660009081526003602052604081208054909190610e0c908490611a1e565b90915550505b506001600160a01b03166000908152600460209081526040808320805463ffffffff19164263ffffffff16179055600390915290205490565b600081610e7157506001600160a01b03821660009081526003602052604090205461036c565b306001600160a01b03841603610f545760036000600660009054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ed8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610efc9190611b5e565b6001600160a01b03166001600160a01b031681526020019081526020016000205460036000856001600160a01b03166001600160a01b0316815260200190815260200160002054610f4d91906119a3565b905061036c565b600660009054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fa7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fcb9190611b5e565b6001600160a01b0316836001600160a01b031614611001576001600160a01b038316600090815260036020526040902054610605565b60009392505050565b6006546040516370a0823160e01b815230600482015260009182916001600160a01b03909116906370a0823190602401602060405180830381865afa158015611057573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107b9190611a05565b905060085481116110ce5760405162461bcd60e51b815260206004820152601b60248201527f4e6f206e657720484f4e4f5220616464656420746f20766f756368000000000060448201526064016103b9565b6000600854826110de91906119a3565b90506110e984610c50565b506104006110f860085461139e565b111561113d5760015461110c60085461139e565b6001546111188561139e565b61112291906119b6565b61112c91906119e3565b61113691906119a3565b925061114d565b601e6111488361139e565b901b92505b604080518281526020810185905230916001600160a01b038716917fb2961166fad995337c1881ae794aed7faa48c8274fb9dffaef6c0526df0747b1910160405180910390a361119d8484611769565b600a5460ff16156111b2576111b0611469565b505b80600860008282546111c49190611a1e565b9091555092949350505050565b6006546000906001600160a01b0316331480156111ee5750600854155b61123a5760405162461bcd60e51b815260206004820152601d60248201527f496e697469616c697a6174696f6e20627920484f4e4f52206f6e6c792e00000060448201526064016103b9565b81600003611300576006546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa15801561128a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ae9190611a05565b9150600082116113005760405162461bcd60e51b815260206004820152601d60248201527f4e6f20484f4e4f52207472616e7366657272656420746f20696e69742e00000060448201526064016103b9565b601e61130b8361139e565b901b90506113198382611769565b6008919091556001600160a01b03919091166000908152600460205260409020805463ffffffff19164263ffffffff1617905590565b600060026001546113609190611b4f565b60028360015461137091906119a3565b61137a9190611b4f565b60085461138791906119b6565b61139191906119e3565b60085461036c91906119a3565b600081156103c2576000600283046001019050600060028285816113c4576113c46119cd565b048301816113d4576113d46119cd565b0490505b8082111561140c5780915060028285816113f4576113f46119cd565b04830181611404576114046119cd565b0490506113d8565b5092915050565b60008261142083826119a3565b915081111561036c5760405162461bcd60e51b815260206004820152601560248201527464732d6d6174682d7375622d756e646572666c6f7760581b60448201526064016103b9565b6000306001600160a01b0316600660009054906101000a90046001600160a01b03166001600160a01b031663f99ac72f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114ec9190611b5e565b6001600160a01b0316036115005750600090565b6008546000805490916276a7009161151e9063ffffffff16426119a3565b61152891906119b6565b61153291906119e3565b60095490915060289061154b90633fffffff19166117f2565b901b602861156c601e80856009546115639190611a1e565b901c901b6117f2565b61157792911b6119a3565b9150806009600082825461158b9190611a1e565b90915550506000805463ffffffff19164263ffffffff16179055816115ae575090565b60075460408051600081526020810185905230926001600160a01b0316917fb2961166fad995337c1881ae794aed7faa48c8274fb9dffaef6c0526df0747b1910160405180910390a360075461160d906001600160a01b031683611769565b600754611622906001600160a01b0316610c50565b505090565b6001600160a01b03821661167d5760405162461bcd60e51b815260206004820152601860248201527f41727469666163743a206275726e2066726f6d207a65726f000000000000000060448201526064016103b9565b6001600160a01b038216600090815260026020526040902054818110156116e65760405162461bcd60e51b815260206004820152601a60248201527f41727469666163743a206275726e20657863656564732062616c00000000000060448201526064016103b9565b6116f082826119a3565b6001600160a01b0384166000908152600260205260408120919091556001805484929061171e9084906119a3565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b806001600082825461177b9190611a1e565b90915550506001600160a01b038216600090815260026020526040812080548392906117a8908490611a1e565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600080600160ff1b5b801561140c57600191821b9182810183026003020180828681611820576118206119cd565b041061183457808202850394506001830192505b5060031c6117fb565b60006020828403121561184f57600080fd5b5035919050565b6001600160a01b038116811461186b57600080fd5b50565b60006020828403121561188057600080fd5b813561060581611856565b600060208083528351808285015260005b818110156118b85785810183015185820160400152820161189c565b506000604082860101526040601f19601f8301168501019250505092915050565b803580151581146118e957600080fd5b919050565b60008060006060848603121561190357600080fd5b833561190e81611856565b925060208401359150611923604085016118d9565b90509250925092565b6000806040838503121561193f57600080fd5b823561194a81611856565b946020939093013593505050565b6000806040838503121561196b57600080fd5b823561197681611856565b9150611984602084016118d9565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561036c5761036c61198d565b808202811582820484141761036c5761036c61198d565b634e487b7160e01b600052601260045260246000fd5b600082611a0057634e487b7160e01b600052601260045260246000fd5b500490565b600060208284031215611a1757600080fd5b5051919050565b8082018082111561036c5761036c61198d565b600181811c90821680611a4557607f821691505b602082108103611a6557634e487b7160e01b600052602260045260246000fd5b50919050565b600181815b80851115611aa6578160001904821115611a8c57611a8c61198d565b80851615611a9957918102915b93841c9390800290611a70565b509250929050565b600082611abd5750600161036c565b81611aca5750600061036c565b8160018114611ae05760028114611aea57611b06565b600191505061036c565b60ff841115611afb57611afb61198d565b50506001821b61036c565b5060208310610133831016604e8410600b8410161715611b29575081810a61036c565b611b338383611a6b565b8060001904821115611b4757611b4761198d565b029392505050565b600061060560ff841683611aae565b600060208284031215611b7057600080fd5b815161060581611856565b63ffffffff82811682821603908082111561140c5761140c61198d56fea2646970667358221220565b32fa4253325b565ec0dbf132c4e57f0b814f2232ba6e5ec742cfa74f9fce64736f6c63430008140033",
  // "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106101585760003560e01c8063b7c46ab2116100c3578063d7e84fbf1161007c578063d7e84fbf146102bd578063dd66e16b146102d0578063e0455258146102e3578063e04675b8146102f6578063efecfa3a14610309578063fb7da08b1461031c57600080fd5b8063b7c46ab21461025e578063c0953ffc14610271578063c55446621461027a578063c5e338be14610282578063cfee1c5714610297578063d5c0463e146102aa57600080fd5b806345d3292b1161011557806345d3292b146101cd57806347934435146101d5578063516f279e146102055780636901f6681461021a57806370a0823114610222578063925f52bf1461024b57600080fd5b806311c50a991461015d57806318160ddd146101795780631d1be92a146101815780631f25dab21461018a578063414eb8141461019d57806342c1d1d6146101ba575b600080fd5b610166600b5481565b6040519081526020015b60405180910390f35b600154610166565b61016660085481565b61016661019836600461183d565b610325565b600a546101aa9060ff1681565b6040519015158152602001610170565b6101666101c836600461186e565b610372565b6101666103ca565b600a546101ed9061010090046001600160a01b031681565b6040516001600160a01b039091168152602001610170565b61020d6104bb565b604051610170919061188b565b6101aa610549565b61016661023036600461186e565b6001600160a01b031660009081526002602052604090205490565b6101666102593660046118ee565b6105ba565b61016661026c3660046118ee565b61060c565b610166600c5481565b6101ed6108e2565b61029561029036600461192c565b610b75565b005b6101666102a536600461186e565b610c50565b6101666102b8366004611958565b610e4b565b6007546101ed906001600160a01b031681565b6101666102de36600461186e565b61100a565b6101666102f136600461192c565b6111d1565b6006546101ed906001600160a01b031681565b61016661031736600461183d565b61134f565b61016660095481565b600061033260085461139e565b60015461034b8460085461034691906119a3565b61139e565b61035591906119b6565b61035f91906119e3565b60015461036c91906119a3565b92915050565b60405162461bcd60e51b815260206004820152601860248201527f616e7469766f75636820756e696d706c656d656e7465642e000000000000000060448201526000906064015b60405180910390fd5b506000919050565b6006546000906001600160a01b031633146104275760405162461bcd60e51b815260206004820152601e60248201527f4f6e6c7920484f4e4f5220636f6e74726163742063616e20646f6e617465000060448201526064016103b9565b6006546040516370a0823160e01b815230600482015261049d916001600160a01b0316906370a0823190602401602060405180830381865afa158015610471573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104959190611a05565b600854611413565b600860008282546104ae9190611a1e565b9091555050600854919050565b600580546104c890611a31565b80601f01602080910402602001604051908101604052809291908181526020018280546104f490611a31565b80156105415780601f1061051657610100808354040283529160200191610541565b820191906000526020600020905b81548152906001019060200180831161052457829003601f168201915b505050505081565b6006546000906001600160a01b031633146105a65760405162461bcd60e51b815260206004820152601960248201527f496e76616c69642076616c69646174696f6e20736f757263650000000000000060448201526064016103b9565b50600a805460ff1916600190811790915590565b60405162461bcd60e51b815260206004820152601a60248201527f756e616e7469766f75636820756e696d706c656d656e7465642e00000000000060448201526000906064016103b9565b9392505050565b60006001600160a01b03841633148061062f57506006546001600160a01b031633145b61067b5760405162461bcd60e51b815260206004820181905260248201527f4f6e6c7920486f6e6f72206f722073656e6465722063616e20756e766f75636860448201526064016103b9565b61068484610c50565b508161074a576001600160a01b0384166000908152600260205260409020548311156106f25760405162461bcd60e51b815260206004820152601b60248201527f41727469666163743a20496e737566662e20766f7563682062616c000000000060448201526064016103b9565b60008360015461070291906119a3565b905060026001546107139190611b4f565b61071e600283611b4f565b60085461072b91906119b6565b61073591906119e3565b60085461074291906119a3565b915050610866565b826008541015801561077357506001600160a01b03841660009081526002602052604090205415155b6107bf5760405162461bcd60e51b815260206004820152601760248201527f496e737566662e20686f6e6f7220766f7563682062616c00000000000000000060448201526064016103b9565b8290506107cd60085461139e565b6001546107e18360085461034691906119a3565b6107eb91906119b6565b6107f591906119e3565b60015461080291906119a3565b6001600160a01b0385166000908152600260205260409020549093508311156108665760405162461bcd60e51b8152602060048201526016602482015275125b9cdd599988199a5b985b081d9bdd58da0818985b60521b60448201526064016103b9565b604080518281526020810185905230916001600160a01b038716917ec88340df5e02797385529c97e3b8517f5d63197625962979dc1f3f6ac420ae910160405180910390a3600a5460ff16156108c0576108be611469565b505b80600860008282546108d291906119a3565b9091555061060590508484611627565b6000336001600160a01b031663b80ba76b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610922573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109469190611b5e565b6001600160a01b0316600660009054906101000a90046001600160a01b03166001600160a01b03166351cd045f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156109a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109c69190611b5e565b6001600160a01b031614610a1c5760405162461bcd60e51b815260206004820152601960248201527f496e76616c696420726577617264466c6f77466163746f72790000000000000060448201526064016103b9565b336001600160a01b0316336001600160a01b031663b80ba76b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610a64573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a889190611b5e565b6040516301aa97af60e11b81523060048201526001600160a01b0391909116906303552f5e90602401602060405180830381865afa158015610ace573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af29190611b5e565b6001600160a01b031614610b485760405162461bcd60e51b815260206004820152601c60248201527f52462f6172746966616374207061697220646f6e2774206d617463680000000060448201526064016103b9565b50600a8054610100600160a81b0319163361010090810291909117918290556001600160a01b0391041690565b6001600160a01b038216600090815260036020526040902054811115610beb5760405162461bcd60e51b815260206004820152602560248201527f72656465656d20616d6f756e74206578636565647320616363526577617264436044820152646c61696d7360d81b60648201526084016103b9565b6001600160a01b038216600090815260036020526040902054610c0f9082906119a3565b6001600160a01b038316600090815260036020526040808220929092553081522054610c3c9082906119a3565b306000908152600360205260409020555050565b6001600160a01b03811660009081526004602052604081205463ffffffff9081164290911603610c9657506001600160a01b031660009081526003602052604090205490565b30600090815260046020526040902054610cb69063ffffffff1642611b7b565b63ffffffff16600154610cc991906119b6565b3060009081526003602052604081208054909190610ce8908490611a1e565b9091555050306000818152600460205260409020805463ffffffff19164263ffffffff161790556001600160a01b03831603610d335750503060009081526003602052604090205490565b6001600160a01b03821660009081526004602052604090205463ffffffff1615610e12576001600160a01b0382166000908152600260205260408120549003610d9257506001600160a01b031660009081526003602052604090205490565b6001600160a01b038216600090815260046020526040902054610dbb9063ffffffff1642611b7b565b6001600160a01b038316600090815260026020526040902054610de49163ffffffff16906119b6565b6001600160a01b03831660009081526003602052604081208054909190610e0c908490611a1e565b90915550505b506001600160a01b03166000908152600460209081526040808320805463ffffffff19164263ffffffff16179055600390915290205490565b600081610e7157506001600160a01b03821660009081526003602052604090205461036c565b306001600160a01b03841603610f545760036000600660009054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ed8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610efc9190611b5e565b6001600160a01b03166001600160a01b031681526020019081526020016000205460036000856001600160a01b03166001600160a01b0316815260200190815260200160002054610f4d91906119a3565b905061036c565b600660009054906101000a90046001600160a01b03166001600160a01b0316638da5cb5b6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610fa7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fcb9190611b5e565b6001600160a01b0316836001600160a01b031614611001576001600160a01b038316600090815260036020526040902054610605565b60009392505050565b6006546040516370a0823160e01b815230600482015260009182916001600160a01b03909116906370a0823190602401602060405180830381865afa158015611057573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107b9190611a05565b905060085481116110ce5760405162461bcd60e51b815260206004820152601b60248201527f4e6f206e657720484f4e4f5220616464656420746f20766f756368000000000060448201526064016103b9565b6000600854826110de91906119a3565b90506110e984610c50565b506104006110f860085461139e565b111561113d5760015461110c60085461139e565b6001546111188561139e565b61112291906119b6565b61112c91906119e3565b61113691906119a3565b925061114d565b601e6111488361139e565b901b92505b604080518281526020810185905230916001600160a01b038716917fb2961166fad995337c1881ae794aed7faa48c8274fb9dffaef6c0526df0747b1910160405180910390a361119d8484611769565b600a5460ff16156111b2576111b0611469565b505b80600860008282546111c49190611a1e565b9091555092949350505050565b6006546000906001600160a01b0316331480156111ee5750600854155b61123a5760405162461bcd60e51b815260206004820152601d60248201527f496e697469616c697a6174696f6e20627920484f4e4f52206f6e6c792e00000060448201526064016103b9565b81600003611300576006546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa15801561128a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112ae9190611a05565b9150600082116113005760405162461bcd60e51b815260206004820152601d60248201527f4e6f20484f4e4f52207472616e7366657272656420746f20696e69742e00000060448201526064016103b9565b601e61130b8361139e565b901b90506113198382611769565b6008919091556001600160a01b03919091166000908152600460205260409020805463ffffffff19164263ffffffff1617905590565b600060026001546113609190611b4f565b60028360015461137091906119a3565b61137a9190611b4f565b60085461138791906119b6565b61139191906119e3565b60085461036c91906119a3565b600081156103c2576000600283046001019050600060028285816113c4576113c46119cd565b048301816113d4576113d46119cd565b0490505b8082111561140c5780915060028285816113f4576113f46119cd565b04830181611404576114046119cd565b0490506113d8565b5092915050565b60008261142083826119a3565b915081111561036c5760405162461bcd60e51b815260206004820152601560248201527464732d6d6174682d7375622d756e646572666c6f7760581b60448201526064016103b9565b6000306001600160a01b0316600660009054906101000a90046001600160a01b03166001600160a01b031663f99ac72f6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156114c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114ec9190611b5e565b6001600160a01b0316036115005750600090565b6008546000805490916276a7009161151e9063ffffffff16426119a3565b61152891906119b6565b61153291906119e3565b60095490915060289061154b90633fffffff19166117f2565b901b602861156c601e80856009546115639190611a1e565b901c901b6117f2565b61157792911b6119a3565b9150806009600082825461158b9190611a1e565b90915550506000805463ffffffff19164263ffffffff16179055816115ae575090565b60075460408051600081526020810185905230926001600160a01b0316917fb2961166fad995337c1881ae794aed7faa48c8274fb9dffaef6c0526df0747b1910160405180910390a360075461160d906001600160a01b031683611769565b600754611622906001600160a01b0316610c50565b505090565b6001600160a01b03821661167d5760405162461bcd60e51b815260206004820152601860248201527f41727469666163743a206275726e2066726f6d207a65726f000000000000000060448201526064016103b9565b6001600160a01b038216600090815260026020526040902054818110156116e65760405162461bcd60e51b815260206004820152601a60248201527f41727469666163743a206275726e20657863656564732062616c00000000000060448201526064016103b9565b6116f082826119a3565b6001600160a01b0384166000908152600260205260408120919091556001805484929061171e9084906119a3565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b806001600082825461177b9190611a1e565b90915550506001600160a01b038216600090815260026020526040812080548392906117a8908490611a1e565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b600080600160ff1b5b801561140c57600191821b9182810183026003020180828681611820576118206119cd565b041061183457808202850394506001830192505b5060031c6117fb565b60006020828403121561184f57600080fd5b5035919050565b6001600160a01b038116811461186b57600080fd5b50565b60006020828403121561188057600080fd5b813561060581611856565b600060208083528351808285015260005b818110156118b85785810183015185820160400152820161189c565b506000604082860101526040601f19601f8301168501019250505092915050565b803580151581146118e957600080fd5b919050565b60008060006060848603121561190357600080fd5b833561190e81611856565b925060208401359150611923604085016118d9565b90509250925092565b6000806040838503121561193f57600080fd5b823561194a81611856565b946020939093013593505050565b6000806040838503121561196b57600080fd5b823561197681611856565b9150611984602084016118d9565b90509250929050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561036c5761036c61198d565b808202811582820484141761036c5761036c61198d565b634e487b7160e01b600052601260045260246000fd5b600082611a0057634e487b7160e01b600052601260045260246000fd5b500490565b600060208284031215611a1757600080fd5b5051919050565b8082018082111561036c5761036c61198d565b600181811c90821680611a4557607f821691505b602082108103611a6557634e487b7160e01b600052602260045260246000fd5b50919050565b600181815b80851115611aa6578160001904821115611a8c57611a8c61198d565b80851615611a9957918102915b93841c9390800290611a70565b509250929050565b600082611abd5750600161036c565b81611aca5750600061036c565b8160018114611ae05760028114611aea57611b06565b600191505061036c565b60ff841115611afb57611afb61198d565b50506001821b61036c565b5060208310610133831016604e8410600b8410161715611b29575081810a61036c565b611b338383611a6b565b8060001904821115611b4757611b4761198d565b029392505050565b600061060560ff841683611aae565b600060208284031215611b7057600080fd5b815161060581611856565b63ffffffff82811682821603908082111561140c5761140c61198d56fea2646970667358221220565b32fa4253325b565ec0dbf132c4e57f0b814f2232ba6e5ec742cfa74f9fce64736f6c63430008140033",
  // "devdoc": {
  //   "kind": "dev",
  //   "methods": {},
  //   "version": 1
  // },
  // "userdoc": {
  //   "kind": "user",
  //   "methods": {
  //     "antivouch(address)": {
  //       "notice": "Given some input antihonor to this artifact, return the vouch amount. "
  //     },
  //     "redeemRewardClaim(address,uint256)": {
  //       "notice": "Given some amount to redeem by the artifact's RF contract, check how   much vouch-time the claimer has accumulated and deduct. The return value  is meant to be a ratio relative to the total available, so that the  Geras contract knows how much is redeemable by this claimer."
  //     },
  //     "unantivouch(address,uint256,bool)": {
  //       "notice": "Given some valid input vouching claim to this artifact, return the honor. "
  //     },
  //     "unvouch(address,uint256,bool)": {
  //       "notice": "Given some valid input vouching claim to this artifact, return the HONOR.  Delta(H) is calculated as: H_out = H_T - (H_T * (V_T - V_in)^2) / V_T^2 OR  V_in = V_T - (V_T * sqrt(H_T - H_out) / sqrt(H_T))"
  //     },
  //     "updateAccumulated(address)": {
  //       "notice": "Keep time-weighted record of the vouch claims of each vouching address.  These will be updated asynchronously, although the total will always  have the correct value since we know the total supply."
  //     },
  //     "vouch(address)": {
  //       "notice": "Given some input honor to this artifact, return the output vouch amount.  The change in vouch claim will be calculated from the difference in  square roots of the HONOR added to this artifact  (sqrt(honor_after) - sqrt(honor_before)).  The same holds true for unvouching. The question of \"which square root\" will be answered by using 2^60 as  a pivot point, given its proximity to 1e18. That is, the amount of wei  where the same value is returned will be 2^60. The virtue of this value  is that it can be renormalized by adding 30 bits to the calculated root.  (or if cube roots are used, 20 bits can be added). Essentially we are  taking sqrt(X) * sqrt(2^60) to keep the curves reasonably in line.  The formula for Delta(V) is: V_out = sqrt(H_T + H_in) * V_T / sqrt(H_T) - V_T"
  //     }
  //   },
  //   "version": 1
  // },
  // "storageLayout": {
  //   "storage": [
  //     {
  //       "astId": 900,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "_lastUpdated",
  //       "offset": 0,
  //       "slot": "0",
  //       "type": "t_uint32"
  //     },
  //     {
  //       "astId": 902,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "_totalSupply",
  //       "offset": 0,
  //       "slot": "1",
  //       "type": "t_uint256"
  //     },
  //     {
  //       "astId": 906,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "_balances",
  //       "offset": 0,
  //       "slot": "2",
  //       "type": "t_mapping(t_address,t_uint256)"
  //     },
  //     {
  //       "astId": 910,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "_accRewardClaims",
  //       "offset": 0,
  //       "slot": "3",
  //       "type": "t_mapping(t_address,t_uint256)"
  //     },
  //     {
  //       "astId": 914,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "_lastUpdatedVouch",
  //       "offset": 0,
  //       "slot": "4",
  //       "type": "t_mapping(t_address,t_uint32)"
  //     },
  //     {
  //       "astId": 916,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "location",
  //       "offset": 0,
  //       "slot": "5",
  //       "type": "t_string_storage"
  //     },
  //     {
  //       "astId": 918,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "honorAddr",
  //       "offset": 0,
  //       "slot": "6",
  //       "type": "t_address"
  //     },
  //     {
  //       "astId": 920,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "builder",
  //       "offset": 0,
  //       "slot": "7",
  //       "type": "t_address"
  //     },
  //     {
  //       "astId": 922,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "honorWithin",
  //       "offset": 0,
  //       "slot": "8",
  //       "type": "t_uint256"
  //     },
  //     {
  //       "astId": 924,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "accHonorHours",
  //       "offset": 0,
  //       "slot": "9",
  //       "type": "t_uint256"
  //     },
  //     {
  //       "astId": 926,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "isValidated",
  //       "offset": 0,
  //       "slot": "10",
  //       "type": "t_bool"
  //     },
  //     {
  //       "astId": 928,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "rewardFlow",
  //       "offset": 1,
  //       "slot": "10",
  //       "type": "t_address"
  //     },
  //     {
  //       "astId": 930,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "antihonorWithin",
  //       "offset": 0,
  //       "slot": "11",
  //       "type": "t_uint256"
  //     },
  //     {
  //       "astId": 932,
  //       "contract": "contracts/Artifact.sol:Artifact",
  //       "label": "netHonor",
  //       "offset": 0,
  //       "slot": "12",
  //       "type": "t_int256"
  //     }
  //   ],
  //   "types": {
  //     "t_address": {
  //       "encoding": "inplace",
  //       "label": "address",
  //       "numberOfBytes": "20"
  //     },
  //     "t_bool": {
  //       "encoding": "inplace",
  //       "label": "bool",
  //       "numberOfBytes": "1"
  //     },
  //     "t_int256": {
  //       "encoding": "inplace",
  //       "label": "int256",
  //       "numberOfBytes": "32"
  //     },
  //     "t_mapping(t_address,t_uint256)": {
  //       "encoding": "mapping",
  //       "key": "t_address",
  //       "label": "mapping(address => uint256)",
  //       "numberOfBytes": "32",
  //       "value": "t_uint256"
  //     },
  //     "t_mapping(t_address,t_uint32)": {
  //       "encoding": "mapping",
  //       "key": "t_address",
  //       "label": "mapping(address => uint32)",
  //       "numberOfBytes": "32",
  //       "value": "t_uint32"
  //     },
  //     "t_string_storage": {
  //       "encoding": "bytes",
  //       "label": "string",
  //       "numberOfBytes": "32"
  //     },
  //     "t_uint256": {
  //       "encoding": "inplace",
  //       "label": "uint256",
  //       "numberOfBytes": "32"
  //     },
  //     "t_uint32": {
  //       "encoding": "inplace",
  //       "label": "uint32",
  //       "numberOfBytes": "4"
  //     }
  //   }
  // }
  // ];