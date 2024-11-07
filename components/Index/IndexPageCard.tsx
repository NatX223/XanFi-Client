import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../../utils/connection/adapter";
import { getUnifiedBalance, InvestFund, ReplaceToken } from "../../utils/app";
import { ToastContainer, toast } from "react-toastify";
import { AssetsChart, PerformanceChart } from "./IndexChart";
import { ASSET_TOKENS, TokenInfo } from "~~/utils/Artifacts/tokens";
import { sepolia, arbitrumSepolia } from "viem/chains";

type assets = {
    chainArray: number[];
    nameArray: string[];
    addressArray: string[];
    ratioArray: number[];
};

type TIndexItemProps = {
    name: string;
    description: string;
    docId: string;
    sector: string;
    creator: string;
    chain: string;
    chainId: number;
    assets: assets;
    holders: number;
  };

export function IndexDetails({ name, description, sector, creator, chain, chainId, holders, assets, docId }: TIndexItemProps) {
    const { address } = useAccount();
	const signer = useEthersSigner();

    const [uBal, setUBal] = useState(0);
    const [investAmount, setInvestAmount] = useState('');
    const [redeemAmount, setRedeemAmount] = useState('');
    const [oldAsset, setOldAsset] = useState('');
    const [newAsset, setNewAsset] = useState('');

    useEffect(() => {
        const fetchBalance = async() => {
            const uBalance = await getUnifiedBalance(address);
            const _balance = Number(uBalance.balance) / (10 ** uBalance.decimals);
            const balance = Number(_balance).toFixed(2);
            setUBal(Number(balance));
        };

        fetchBalance();
    })

    const handleInvestAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = e.target.value;

        // Regular expression to check for positive numbers (integers or decimals)
        const isValid = /^[+]?\d*\.?\d*$/.test(inputValue);

        // Ensure value is valid and not 0 or negative
        if (isValid && parseFloat(inputValue) > 0) {
            setInvestAmount(inputValue);
        } else if (inputValue === '') {
            // Allow clearing the input
            setInvestAmount('');
        }
    };

    const handleRedeemAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = e.target.value;

        // Regular expression to check for positive numbers (integers or decimals)
        const isValid = /^[+]?\d*\.?\d*$/.test(inputValue);

        // Ensure value is valid and not 0 or negative
        if (isValid && parseFloat(inputValue) > 0) {
            setRedeemAmount(inputValue);
        } else if (inputValue === '') {
            // Allow clearing the input
            setRedeemAmount('');
        }
    };


    const handleInvestClick = async () => {
        const success = await InvestFund(investAmount, docId, chainId, signer);
        if (success) {
            toast.success("Index Investment succesfull!");
        } else {
            toast.success("Index Investment unsuccesfull!");
        }
    }

    const handleRedeemClick = async () => {
        const success = await InvestFund(redeemAmount, docId, chainId, signer);
        if (success) {
            toast.success("Token sale succesfull!");
        } else {
            toast.success("Token sale unsuccesfull!");
        }
    }

    const handleReplaceClick = async () => {
        const success = await ReplaceToken(oldAsset, newAsset, docId, chainId, signer);
        if (success) {
            toast.success("Token replacement succesfull!");
        } else {
            toast.success("Token replacement unsuccesfull!");
        }
    }

    const newAssets: TokenInfo[] = Object.values(ASSET_TOKENS);

  return (
    <div>
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className="card-body px-12 py-8">
                <div className="relative grid grid-rows-2 gap-2">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold">Unified Balance</h1>
                        <span>${uBal}</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                    <div>
                        <h1 className="text-2xl font-semibold"> Details </h1>
                    </div>
                    <div className='relative grid grid-rows-2 gap-2'>
                        <h3> Name: {name} </h3>
                        <h3> Description: {description} </h3>
                        <h3> Category: {sector} </h3>
                        <h3> Created By: {creator} </h3>
                        <h3> Chain: {chain} </h3>
                        <h3> Holders: {holders} </h3>
                        {/* <h3> price: ... </h3> */}
                    </div>
            </div>
        </div>
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                        <div>
                            <h1 className="text-2xl font-semibold"> Tokens </h1>
                        </div>
                        <AssetsChart ratio={assets.ratioArray} assets={assets.nameArray}/>
            </div>
        </div>
        {/* <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                        <div>
                            <h1 className="text-2xl font-semibold"> Performance </h1>
                        </div>
                        <PerformanceChart ratios={assets.ratioArray} symbols={assets.nameArray}/>
            </div>
        </div> */}
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                    <div className='relative grid grid-rows-2 gap-2'>
                        <div>
                        <h1 className="text-2xl font-semibold"> Invest </h1>
                        </div>
                        <div>
                            <div>
                                <div className="relative grid grid-cols-3 gap-2">
                                    <input className="border border-bg-gradient rounded p-1 bg-gray-400 text-white" type="string" 
                                    value={investAmount}
                                    onChange={handleInvestAmountChange}/>
                                    {/* <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="usdt">USDC</option>
                                    </select> */}
                                    <button className="bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer"
                                    onClick={handleInvestClick}>
                                        Invest
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                    <div className='relative grid grid-rows-2 gap-2'>
                        <div>
                        <h1 className="text-2xl font-semibold"> Redeem </h1>
                        </div>
                        <div>
                            <div>
                                <div className="relative grid grid-cols-3 gap-2">
                                    <input className="border border-bg-gradient rounded p-1 bg-gray-400 text-white" type="string" 
                                    value={investAmount}
                                    onChange={handleRedeemAmountChange}/>
                                    {/* <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="usdt">USDC</option>
                                    </select> */}
                                    <button className="bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer"
                                    onClick={handleRedeemClick}>
                                        Redeem
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                    <div className='relative grid grid-rows-2 gap-2'>
                        <div>
                            <h1 className="text-2xl font-semibold"> Replace </h1>
                        </div>
                        <div>
                            <div>
                                <div className="relative grid grid-cols-3 gap-2">
                                    {/* asset tokens */}
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black"
                                    value={oldAsset}
                                    onChange={(e) => setOldAsset(e.target.value)}>
                                    {assets.addressArray.map((address, index) => (
                                        <option key={address} value={address}>
                                            {assets.nameArray[index]}
                                        </option>
                                    ))}   
                                    </select>
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black"
                                    value={newAsset}
                                    onChange={(e) => setNewAsset(e.target.value)}>
                                    {newAssets.map((asset, index) => (
                                        <option key={index} value={chainId === sepolia.id ? asset.sepoliaAddress : chainId === arbitrumSepolia.id ? asset.arbitrumAddress : ''}>
                                            {asset.name}
                                        </option>
                                    ))}
                                    </select>
                                    <button className="bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer"
                                    onClick={handleReplaceClick}
                                    >
                                        Replace
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <ToastContainer />
        </div>
  );
}
