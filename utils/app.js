import { db } from "./Firebase/firebaseConfig";
const { ethers } = require("ethers");
import { collection, addDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { factoryAbi } from "./Artifacts/FactoryABI";
import { indexAbi } from "./Artifacts/IndexABI";
import { tokenAbi } from "./Artifacts/TokenABI";
import { factoryAddresses, USDTAddresses } from "./Artifacts/Addresses";
import { providers } from "./Artifacts/providers";

export const createIndex = async(name, description, sector, assets, chain, chainId, signer) => {
    try {
        const ratio = 100 / assets.length;

        // Create an array filled with the division result
        const ratioArray = new Array(assets.length).fill(ratio);
        
        const assetNames = assets.map(asset => asset.name);
        const assetAddresses = assets.map(asset => asset.address);
        const assetChains = assets.map(asset => asset.chain);

        const result = {
            chainArray: assetChains,
            nameArray: assetNames,
            addressArray: assetAddresses,
            ratioArray: ratioArray,
        };

        const symbol = abbreviateName(name);
        const factoryAddress = factoryAddresses[chainId]; 
        const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, signer);
        const createTX = await factoryContract.createIndex(name, symbol, signer.address, assetAddresses, ratioArray, assetChains);
        const receipt = await createTX.wait();

        if (receipt.status === 1) {
            const indeciesCollection = collection(db, 'Indecies');

            const snapshot = await getDocs(indeciesCollection);
            const docCount = snapshot.size;

            // call function to deploy on another chain here
            const docRef = await addDoc(collection(db, 'Indecies'), {
                name: name,
                description: description,
                sector: sector,
                assets: result,
                holders: 0,
                chain: chain,
                creator: signer.address,
                id: docCount
              });
              console.log('Index recorded', docRef.id);
              return true;
        } else {
            console.error("Transaction failed!");
            return false;
        }

    } catch (error) {
        console.error('Error adding document: ', error);
        return false;
    }
}

export const InvestFund = async(amount, docId, chain, signer) => {
    try {
        const docRef = doc(db, 'Indecies', docId);

        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const indexId = docSnap.data().id;
          const provider = providers[chain];

          const factoryAddress = factoryAddresses[chain]; 
          const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
          const indexAddress = await factoryContract.indicies(indexId);
          const indexContract = new ethers.Contract(indexAddress, indexAbi, signer);

          const indexAddresses = await getIndexAddresses(indexId);
          const purchaseAmount = ethers.parseEther(amount);

          const usdtAddress = USDTAddresses[chain];
          const usdt = new ethers.Contract(usdtAddress, tokenAbi, signer);
          await usdt.approve(indexAddress, purchaseAmount);
          
          const investTx = await indexContract.InvestFund(purchaseAmount, indexAddresses);
          const receipt = await investTx.wait();

          if (receipt.status === 1) {
            return true
          } else {
            console.log("error");
            return false;
          }

        } else {
          console.log("No such Index!");
        }
      } catch (e) {
        console.error("Error Investing in Index", e);
        throw e;
      }
}

export const PortTokens = async(docId, amount, chainId, chain, signer) => {
  try {
    const docRef = doc(db, 'Indecies', docId);
    const chainIds = [44787, 43113];

    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const indexId = docSnap.data().id;
      const provider = providers[chain];

      var targetFactoryAddress;
      var targetProvider;

      for (const id of chainIds) {
        if (factoryAddresses[id] == factoryAddresses[chain]) {
          continue;
        }
        else{
          targetFactoryAddress = factoryAddresses[id];
          targetProvider = providers[id];
        }
      }

      const factoryAddress = factoryAddresses[chain];
      const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
      const indexAddress = await factoryContract.indicies(indexId);
      const targetFactoryContract = new ethers.Contract(targetFactoryAddress, factoryAbi, targetProvider);
      const targetIndexAddress = await targetFactoryContract.indicies(indexId);
      const indexContract = new ethers.Contract(indexAddress, indexAbi, signer);

      const portAmount = ethers.parseEther(amount);
      
      const portTx = await indexContract.migrateTokens(portAmount, chainId, targetIndexAddress);
      const receipt = await portTx.wait();

      if (receipt.status === 1) {
        return true
      } else {
        console.log("error");
        return false;
      }

    } else {
      console.log("No such Index!");
    }
  } catch (e) {
    console.error("Error Investing in Index", e);
    throw e;
  }
}

async function getIndexAddresses(indexId) {
    const indexAddresses = [];

    // Iterate through the providers
    for (const [chainId, provider] of Object.entries(providers)) {
        const factoryAddress = factoryAddresses[chainId];

        // Initialize the contract instance with the provider
        const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);

        // Fetch the index address for the given indexId
        const indexAddress = await factoryContract.indicies(indexId);

        // Convert the address to a string and add to the array
        indexAddresses.push(indexAddress.toString());
    }

    return indexAddresses;
}

function abbreviateName(name) {
    let symbol = "";
    let words = name.split(" ");

    for (let i = 0; i < words.length; i++) {
        if (symbol.length < 3 && words[i].length > 0) { // Limit the symbol to 3 characters
            symbol += words[i][0].toUpperCase();
        }
    }

    return symbol;
}