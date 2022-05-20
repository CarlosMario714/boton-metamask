let provider, 
    signer,
    contract,
    valEth,
    total

window.addEventListener("load", async function(event) {
  const address = "0x893D50aeEaB7EA14c0c9FF4d85B3Ae2302399DB4";

  const abi = [
      {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "available",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "required",
                  "type": "uint256"
              }
          ],
          "name": "IncorrectPayment",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "available",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "required",
                  "type": "uint256"
              }
          ],
          "name": "NftLimitAddress",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
              }
          ],
          "name": "NftSoldOut",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              }
          ],
          "name": "NotFondsToTranfer",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
              }
          ],
          "name": "NotStarSale",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "TokenDoesNotExist",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              }
          ],
          "name": "UnsuccessfulPayout",
          "type": "error"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "approved",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "Approval",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "ApprovalForAll",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "MintLifeOutGenesis",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "user",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "Received",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "value",
                  "type": "bool"
              }
          ],
          "name": "SetStartSale",
          "type": "event"
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
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "tokenId",
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
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "balance",
                  "type": "uint256"
              }
          ],
          "name": "WithdrawProceeds",
          "type": "event"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
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
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "getApproved",
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
          "name": "getAvailabeSupply",
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
          "name": "getBaseURI",
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
          "name": "getCurrentTokenId",
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
          "name": "getLimitNftByAddress",
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
          "name": "getMintCost",
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
                  "name": "owner",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              }
          ],
          "name": "isApprovedForAll",
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
          "name": "isStartSale",
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
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_amountNft",
                  "type": "uint256"
              }
          ],
          "name": "mintLifeOutGenesis",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "name",
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
          "name": "owner",
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
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "ownerOf",
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
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes",
                  "name": "_data",
                  "type": "bytes"
              }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "_setBaseUri",
                  "type": "string"
              }
          ],
          "name": "setBaseURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_value",
                  "type": "uint256"
              }
          ],
          "name": "setLimitNftByAddress",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "_mintCost",
                  "type": "uint256"
              }
          ],
          "name": "setMintCost",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "bool",
                  "name": "_value",
                  "type": "bool"
              }
          ],
          "name": "setRevelate",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "bool",
                  "name": "_value",
                  "type": "bool"
              }
          ],
          "name": "setStartSale",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
              }
          ],
          "name": "supportsInterface",
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
          "name": "symbol",
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
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "tokenURI",
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
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "withdrawProceeds",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "stateMutability": "payable",
          "type": "receive"
      }
  ]
  
  //Conectar al contrato//
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(address, abi, signer)

  //costo en hex//
  const costoMint = await contract.getMintCost()

  //costo x # de NFTs//
  total = costoMint.mul(cantidad)
  //console.log(total)

  //costo en formato wei//
  const valueWei = total.toNumber()

  //costo en formato ether//
  valEth = ethers.utils.formatEther(valueWei) 
  costoTotal.innerHTML += valEth + " ETH"
})

const linkHash = document.querySelector(".hash")
const costoTotal = document.querySelector(".costoTotal")
const BtnConect = document.getElementById("conectwallet")
const acounts = document.querySelector(".showAccount") 
let nmroMintear = document.getElementById("numeroMintear")
let btnMenos = document.querySelector(".btnMenos")
let btnMas = document.querySelector(".btnMas")
const BtnMint = document.querySelector(".mint")
const max5 = document.querySelector(".alerta")
const disconectedBttn = document.getElementById("disconectwallet")
var cantidad = Number(nmroMintear.innerHTML)
  

//Boton conectarse a la wallet//
BtnConect.addEventListener("click", async (e) => {
//verificar si esta instalado metamask//
  if (window.ethereum) {
    await window.ethereum
      .request({ method: 'wallet_requestPermissions',
          params: [
              {
              eth_accounts: {}
              }
            ]
            })
            acounts.innerHTML = ethereum.selectedAddress
  } else if (ethereum.chainId !== "0x4") {
    window.alert("please connect to rynkeby network")
  } else if (!window.ethereum){
    window.alert("please install Metamask")
  }
  



})

  

//funcion para Mintiar//              
async function mint() {
  console.log(contract)
   let transferencia = await contract.mintLifeOutGenesis(cantidad, {value: total})
        .then((tx) => {
        linkHash.innerHTML = tx.hash
        linkHash.href += tx.hash
        })
        .catch((x) => {
        console.log(x.error.message)
        })
}

//Boton restar cantidad//
function btnRestar(){
  if (cantidad > 0){
    cantidad --
    nmroMintear.innerHTML = cantidad
    costoTotal.innerHTML = valEth * cantidad
    } else {
      cantidad = 0
    } 
}

//Boton sumar cantidad//
function btnSumar(){
  if (cantidad < 5) {
    cantidad ++
    nmroMintear.innerHTML = cantidad
    costoTotal.innerHTML = valEth * cantidad
    } else {
      cantidad = 5
      max5. innerHTML = "max 5 NFTs"
    }
} 
  
//Boton llama a la funcion mint//
BtnMint.onclick = mint

  
    
    
    
  // try {
  //   const balance = await contract.balanceOf("0x0000000000000000000000000000000000000000")   
  // } catch(error){
  //   console.log(error.error.message)
  //  }
    

    







//   ethereum.on("chainChanged", () => window.location.reload())

  //   ethereum.on("accountsChanged", (accounts) => {
  //     if (accounts.length > 0) {
  //         console.log(`Using account ${accounts[0]}`);
  //     }  else {
  //       console.log("0 accounts")
  //     }
  //     });

  //     ethereum.on("message", (message) => console.log(message));

  //     ethereum.on("connect", (info) => {
  //       console.log(`Connected to network ${info}`)
  //     });

  //     ethereum.on("disconnect", (error) => {
  //       console.log(`disconected form network ${error}`)
  //     });