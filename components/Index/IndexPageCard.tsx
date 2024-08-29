import React, { useState } from "react";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../../utils/connection/adapter";
import { InvestFund } from "../../utils/app";
import { ToastContainer, toast } from "react-toastify";
import { AssetsChart, PerformanceChart } from "./IndexChart";

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
    chain: number;
    assets: assets;
    holders: number;
  };

export function IndexDetails({ name, description, sector, creator, chain, holders, assets, docId }: TIndexItemProps) {
    const { chainId } = useAccount();
	const signer = useEthersSigner();

    const [investAmount, setInvestAmount] = useState('');
    const [portAmount, setPortAmount] = useState('');

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

    const handlePortAmountChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const inputValue = e.target.value;

        // Regular expression to check for positive numbers (integers or decimals)
        const isValid = /^[+]?\d*\.?\d*$/.test(inputValue);

        // Ensure value is valid and not 0 or negative
        if (isValid && parseFloat(inputValue) > 0) {
            setPortAmount(inputValue);
        } else if (inputValue === '') {
            // Allow clearing the input
            setPortAmount('');
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

  return (
    <div>
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
                        <h3> Primary Chain: {chain} </h3>
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
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                        <div>
                            <h1 className="text-2xl font-semibold"> Performance </h1>
                        </div>
                        <PerformanceChart ratios={assets.ratioArray} symbols={assets.nameArray}/>
            </div>
        </div>
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                    <div className='relative grid grid-rows-2 gap-2'>
                        <div>
                        <h1 className="text-2xl font-semibold"> Invest </h1>
                        </div>
                        <div>
                            <form>
                                <div className="relative grid grid-cols-3 gap-2">
                                    <input className="border border-bg-gradient rounded p-1 bg-gray-400 text-white" type="string" 
                                    value={investAmount}
                                    onChange={handleInvestAmountChange}/>
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="usdt">USDT</option>
                                    </select>
                                    <button className="bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer"
                                    onClick={handleInvestClick}>
                                        Invest
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                    <div className='relative grid grid-rows-2 gap-2'>
                        <div>
                            <h1 className="text-2xl font-semibold"> Port </h1>
                        </div>
                        <div>
                            <form>
                                <div className="relative grid grid-cols-3 gap-2">
                                    <input className="border border-bg-gradient rounded p-1 bg-gray-400 text-white" type="string" 
                                    value={portAmount}
                                    onChange={handlePortAmountChange}/>
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="Celo">Celo</option>
                                        <option value="BSC">BSC</option>
                                        <option value="MNB">MNB</option>
                                    </select>
                                    <button className="bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer"
                                    // onClick={handlePortClick}
                                    >
                                        Port
                                    </button>
                                </div>
                            </form>
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
                            <form>
                                <div className="relative grid grid-cols-3 gap-2">
                                    {/* asset tokens */}
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="Celo">Celo</option>
                                        <option value="BSC">BSC</option>
                                        <option value="MNB">MNB</option>
                                    </select>
                                    {/* chain tokens */}
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="Celo">Celo</option>
                                        <option value="BSC">BSC</option>
                                        <option value="MNB">MNB</option>
                                    </select>
                                    <button className="bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer"
                                    // onClick={handlereplaceClick}
                                    >
                                        Replace
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
        <ToastContainer />
        </div>
  );
}
