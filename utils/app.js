import { db } from "./Firebase/firebaseConfig";
const { ethers } = require("ethers");
import { collection, addDoc } from 'firebase/firestore';
import { factoryAbi } from "./Artifacts/FactoryABI";
import { factoryAddresses } from "./Artifacts/Addresses";

export const createIndex = async(name, description, sector, assets, assetChains, chain, signer) => {
    try {
        const ratio = 100 / assets.length;

        // Create an array filled with the division result
        const ratioArray = new Array(assets.length).fill(ratio);
    
        // Create the object with the original array and the result array
        const result = {
            assetsArray: assets,
            ratioArray: ratioArray,
        };

        const symbol = abbreviateName(name);
        const factoryAddress = factoryAddresses[chain]; 
        const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, signer);
        const createTX = await factoryContract.createIndex(name, symbol, signer.address, assets, ratioArray, assetChains);
        const receipt = await createTX.wait();

        if (receipt.status === 1) {
            // call function to deploy on another chain here
            const docRef = await addDoc(collection(db, 'Indecies'), {
                name: name,
                description: description,
                sector: sector,
                assets: result,
                holders: 0,
                chain: chain,
                creator: signer.address
              });
              console.log('Index recorded', docRef.id);
        } else {
            console.error("Transaction failed!");
        }

    } catch (error) {
        console.error('Error adding document: ', error);
    }
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