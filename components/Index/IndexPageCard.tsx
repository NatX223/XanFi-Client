import React, { useState } from "react";
import Image from "next/image";
import { SUPPORTED_ACTIONS } from "~~/networkHelpers";
import { SelectProps } from "~~/types/SelectProp";
import { AssetsChart, PerformanceChart } from "./IndexChart";

type AssetRatio = {
    assetsArray: string[];
    ratioArray: number[];
};

type TIndexItemProps = {
    name: string;
    description: string;
    docId: string;
    sector: string;
    creator: string;
    chain: number;
    assets: AssetRatio;
    holders: number;
  };

export function IndexDetails({ name, description, sector, creator, chain, holders, assets, docId }: TIndexItemProps) {

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
                        <AssetsChart ratio={assets.ratioArray} assets={assets.assetsArray}/>
            </div>
        </div>
        <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                        <div>
                            <h1 className="text-2xl font-semibold"> Performance </h1>
                        </div>
                        <PerformanceChart/>
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
                                    <input className="border border-bg-gradient rounded p-1 bg-gray-400 text-white" type="number" />
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="usdt">USDT</option>
                                    </select>
                                    <button className="bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer">
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
                                    <input className="border border-bg-gradient rounded p-1 bg-gray-400 text-white" type="number" />
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="Celo">Celo</option>
                                        <option value="BSC">BSC</option>
                                        <option value="MNB">MNB</option>
                                    </select>
                                    <button className="bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer">
                                        Port
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
        {/* <div className="index-page-card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                    <div className='relative grid grid-rows-2 gap-2'>
                        <div>
                            <h1 className="text-2xl font-semibold"> Replace </h1>
                        </div>
                        <div>
                            <form>
                                <div className="relative grid grid-cols-3 gap-2">
                                    // asset tokens
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="Celo">Celo</option>
                                        <option value="BSC">BSC</option>
                                        <option value="MNB">MNB</option>
                                    </select>
                                    // chain tokens
                                    <select
                                    className="border rounded border-gray-300 px-2 py-2 text-black">
                                        <option value="Celo">Celo</option>
                                        <option value="BSC">BSC</option>
                                        <option value="MNB">MNB</option>
                                    </select>
                                    <button className="bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer">
                                        Replace
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        </div> */}
        </div>
  );
}
