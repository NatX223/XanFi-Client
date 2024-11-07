import { db } from "./Firebase/firebaseConfig";
const { ethers } = require("ethers");
import { collection, addDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { factoryAbi } from "./Artifacts/FactoryABI";
import { indexAbi } from "./Artifacts/IndexABI";
import { factoryAddresses, USDCAddresses } from "./Artifacts/Addresses";
import { providers } from "./Artifacts/providers";
import { encodeFunctionData } from "viem";
import { acrossBridgePlugin } from "./acrossBridgePlugin";
mcClient
import {
  buildItx,
  buildMultichainReadonlyClient,
  buildRpcInfo,
  initKlaster,
  klasterNodeHost,
  loadBicoV2Account,
  rawTx,
  singleTx,
  batchTx
} from "klaster-sdk";
import { arbitrumSepolia, sepolia } from "viem/chains";
import { mcClient, mUSDC } from "./unifiedBalanceParams";

export const createIndex = async(name, description, sector, assets, chain, indexFee, signer) => {
    try {
        const ratio = Math.floor(100 / assets.length);

        // Create an array filled with the division result
        const ratioArray = new Array(assets.length).fill(ratio);
        
        const assetNames = assets.map(asset => asset.name);
        var assetAddresses;

        if (chain.id === 421_614) {
          assetAddresses = assets.map(asset => asset.arbitrumAddress);
        } else {
          assetAddresses = assets.map(asset => asset.sepoliaAddress);
        }

        const result = {
            nameArray: assetNames,
            addressArray: assetAddresses,
            ratioArray: ratioArray,
        };

        const symbol = abbreviateName(name);
        const factoryAddress = factoryAddresses[chain.id];
        // const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, signer);
        // const createTX = await factoryContract.createIndex(name, symbol, signer.address, assetAddresses, ratioArray, assetChains);
        // const receipt = await createTX.wait();

        const klaster = await initKlaster({
          accountInitData: loadBicoV2Account({
            owner: signer.address,
          }),
          nodeUrl: klasterNodeHost.default,
        });

        const createOp = rawTx({
          gasLimit: 3000000n,
          to: factoryAddress,
          data: encodeFunctionData({
            abi: factoryAbi,
            functionName: "createIndex",
            args: [name, symbol, assetAddresses, ratioArray]
          })
        });

        const feeChain = await getFeeChain(signer.address);

        const createTx = buildItx({
          steps: [singleTx(chain.id, createOp)],
          feeTx: klaster.encodePaymentFee(feeChain, indexFee)
        });

        const quote = await klaster.getQuote(createTx);
        const arrayifiedHash = ethers.getBytes(quote.itxHash);
        console.log(arrayifiedHash, quote.itxHash);
        const signed = await signer.signMessage(arrayifiedHash);

        const _result = await klaster.execute(quote, signed);
        console.log(_result.itxHash);

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
          chain: chain.name,
          chainId: chain.id,
          creator: signer.address,
          id: docCount
        });
        console.log('Index recorded', docRef.id);
        return true;
    } catch (error) {
        console.error('Error adding document: ', error);
        return false;
    }
}

export const InvestFund = async(amount, docId, chain, signer) => {
    try {
        const docRef = doc(db, 'Indecies', docId);
        const docSnap = await getDoc(docRef);

        const uBalance = await getUnifiedBalance(signer.address);

        const klaster = await initKlaster({
          accountInitData: loadBicoV2Account({
            owner: signer.address,
          }),
          nodeUrl: klasterNodeHost.default,
        });
        
        if (docSnap.exists()) {
          const indexId = docSnap.data().id;
          const chainId = docSnap.data().chainId;
          const provider = providers[chain];

          const recipient = klaster.account.getAddress(chainId);

          const factoryAddress = factoryAddresses[chain]; 
          const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
          const indexAddress = await factoryContract.indicies(indexId);

          const purchaseAmount = amount * (10 ** uBalance.decimals);

          const chainBreakdown = uBalance.breakdown.find(b => b.chainId === chainId);
          const chainBalance = chainBreakdown.balance;

          if (purchaseAmount >= chainBalance) {
            const bridgeAmount = purchaseAmount - chainBalance;

            const bridgingOps = await encodeBridgingOps({
              tokenMapping: mUSDC,
              account: klaster.account,
              amount: bridgeAmount,
              bridgePlugin: acrossBridgePlugin,
              client: mcClient,
              destinationChainId: base.id,
              unifiedBalance: uBalance,
            });

            const sendERC20Op = rawTx({
              gasLimit: 2000000n,
              to: destChainTokenAddress,
              data: encodeFunctionData({
                abi: erc20Abi,
                functionName: "transfer",
                args: [recipient, bridgingOps.totalReceivedOnDestination],
              }),
            });

            const approveOp = encodeApproveTx({
              tokenAddress: USDCAddresses[chainId],
              amount: purchaseAmount,
              recipient: indexAddress
            });

            const investOp = rawTx({
              gasLimit: 2000000n,
              to: indexAddress,
              data: encodeFunctionData({
                abi: indexAbi,
                functionName: "investFund",
                args: [purchaseAmount],
              }),
            });

            const investTx = batchTx(chainId, sendERC20Op, approveOp, investOp);

            const feeChain = await getFeeChain(signer.address);

            const iTx = buildItx({
              steps: bridgingOps.steps.concat(investTx),
              feeTx: klaster.encodePaymentFee(feeChain, "USDC"),
            });

            const quote = await klaster.getQuote(iTx);
            const arrayifiedHash = ethers.getBytes(quote.itxHash);
            console.log(arrayifiedHash, quote.itxHash);
            const signed = await signer.signMessage(arrayifiedHash);
    
            const _result = await klaster.execute(quote, signed);
            console.log(_result.itxHash);

            return true
          } else {
            const approveOp = encodeApproveTx({
              tokenAddress: USDCAddresses[chainId],
              amount: purchaseAmount,
              recipient: indexAddress
            });

            const investOp = rawTx({
              gasLimit: 2000000n,
              to: indexAddress,
              data: encodeFunctionData({
                abi: indexAbi,
                functionName: "investFund",
                args: [purchaseAmount],
              }),
            });

            const investTx = batchTx(chainId, sendERC20Op, approveOp, investOp)

            const iTx = buildItx({
              steps: [investTx],
              feeTx: klaster.encodePaymentFee(arbitrumSepolia.id, "USDC"),
            });

            const quote = await klaster.getQuote(iTx);
            const arrayifiedHash = ethers.getBytes(quote.itxHash);
            console.log(arrayifiedHash, quote.itxHash);
            const signed = await signer.signMessage(arrayifiedHash);
    
            const _result = await klaster.execute(quote, signed);
            console.log(_result.itxHash);
            return true
          }
        } else {
          console.log("No such Index!");
          return false;
        }
      } catch (e) {
        console.error("Error Investing in Index", e);
        throw e;
      }
}

export const Redeem = async(amount, docId, chain, signer) => {
  try {
      const docRef = doc(db, 'Indecies', docId);
      const docSnap = await getDoc(docRef);

      const klaster = await initKlaster({
        accountInitData: loadBicoV2Account({
          owner: signer.address,
        }),
        nodeUrl: klasterNodeHost.default,
      });
      
      if (docSnap.exists()) {
        const indexId = docSnap.data().id;
        const chainId = docSnap.data().chainId;
        const provider = providers[chain];

        const factoryAddress = factoryAddresses[chain]; 
        const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
        const indexAddress = await factoryContract.indicies(indexId);

        const redeemAmount = amount * (10 ** 18);

          const redeemOp = rawTx({
            gasLimit: 2000000n,
            to: indexAddress,
            data: encodeFunctionData({
              abi: indexAbi,
              functionName: "Redeem",
              args: [redeemAmount],
            }),
          });

          const redeemTx = singleTx(chainId, redeemOp);

          const feeChain = await getFeeChain(signer.address);

          const iTx = buildItx({
            steps: [redeemTx],
            feeTx: klaster.encodePaymentFee(feeChain, "USDC"),
          });

          const quote = await klaster.getQuote(iTx);
          const arrayifiedHash = ethers.getBytes(quote.itxHash);
          console.log(arrayifiedHash, quote.itxHash);
          const signed = await signer.signMessage(arrayifiedHash);
  
          const _result = await klaster.execute(quote, signed);
          console.log(_result.itxHash);

          return true;

      } else {
        console.log("No such Index!");
        return false;
      }
    } catch (e) {
      console.error("Error Investing in Index", e);
      throw e;
    }
}

export const ReplaceToken = async(oldToken, newToken, docId, chain, signer) => {
  try {
      const docRef = doc(db, 'Indecies', docId);
      const docSnap = await getDoc(docRef);

      const klaster = await initKlaster({
        accountInitData: loadBicoV2Account({
          owner: signer.address,
        }),
        nodeUrl: klasterNodeHost.default,
      });
      
      if (docSnap.exists()) {
        const indexId = docSnap.data().id;
        const chainId = docSnap.data().chainId;
        const provider = providers[chain];

        const factoryAddress = factoryAddresses[chain]; 
        const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
        const indexAddress = await factoryContract.indicies(indexId);

          const replaceOp = rawTx({
            gasLimit: 2000000n,
            to: indexAddress,
            data: encodeFunctionData({
              abi: indexAbi,
              functionName: "replaceAsset",
              args: [oldToken, newToken],
            }),
          });

          const replaceTx = singleTx(chainId, replaceOp);

          const feeChain = await getFeeChain(signer.address);

          const iTx = buildItx({
            steps: [replaceTx],
            feeTx: klaster.encodePaymentFee(feeChain, "USDC"),
          });

          const quote = await klaster.getQuote(iTx);
          const arrayifiedHash = ethers.getBytes(quote.itxHash);
          console.log(arrayifiedHash, quote.itxHash);
          const signed = await signer.signMessage(arrayifiedHash);
  
          const _result = await klaster.execute(quote, signed);
          console.log(_result.itxHash);

          return true;

      } else {
        console.log("No such Index!");
        return false;
      }
    } catch (e) {
      console.error("Error Investing in Index", e);
      throw e;
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

export const getUnifiedBalance = async(address) => {
  const klaster = await initKlaster({
    accountInitData: loadBicoV2Account({
      owner: address,
    }),
    nodeUrl: klasterNodeHost.default,
  });

  const uBalance = await mcClient.getUnifiedErc20Balance({
    tokenMapping: mUSDC,
    account: klaster.account,
  });
  
  return uBalance;
}

export const getFeeChain = async(address) => {
  const klaster = await initKlaster({
    accountInitData: loadBicoV2Account({
      owner: address,
    }),
    nodeUrl: klasterNodeHost.default,
  });

  const uBalance = await mcClient.getUnifiedErc20Balance({
    tokenMapping: mUSDC,
    account: klaster.account,
  });

  const sepoliaBreakdown = uBalance.breakdown.find(b => b.chainId === sepolia.id);
  const sepoliaBalance = sepoliaBreakdown.balance;
  const arbitrumBreakdown = uBalance.breakdown.find(b => b.chainId === arbitrumSepolia.id);
  const arbitrumBalance = arbitrumBreakdown.balance;
  if(sepoliaBalance > arbitrumBalance) {
    return sepolia.id;
  } else {
    return arbitrumSepolia.id
  }
}