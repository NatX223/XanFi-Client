import React, { useState, useEffect } from "react";
import { ChainProps, FeeProps } from "~~/types/SelectProp";
import { Chain } from "viem";
import { baseSepolia, sepolia } from "viem/chains";


export function IndexChain(prop: ChainProps, feeProp: FeeProps) {
  const [selectedChain, setselectedChain] = useState<Chain>(sepolia);
  const [selectedFee, setselectedFee] = useState<string>("");

  const handleChainClick = (chain: Chain) => {
    setselectedChain(chain);
    prop.onChange(chain);
  };

  const handleFeeClick = (fee: string) => {
    setselectedFee(fee);
    feeProp.onChange(fee);
  };

  const chains: Chain[] = [sepolia, baseSepolia];
  const feeTokens: string[] = ["USDC", "WETH", "LINK"];

  const isSelectedChain = (chain: Chain) => {
    return chain.id === selectedChain.id;
  }

  const isSelectedFeeToken = (token: string) => {
    return token === selectedFee;
  }

  return (
    <div>
      <h1 className="text-sm font-medium mb-2">Create an Index</h1>
      <h2 className="text-2xl font-bold mb-4">Select Deployment Chain</h2>

      <div className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-3/4 py-6 mx-auto">
          {chains.slice(0, 4).map((chain, index) => (
            <div
              className={`bg-[#00022C] p-1 cursor-pointer ${isSelectedChain(chain) ? "bg-gradient" : ""}`}
              key={index}
              onClick={() => handleChainClick(chain)}
            >
              <div className="p-2 bg-[#00022C]">
                <p className="font-medium text-center">{chain.name}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Select Fee Token</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-4/5 mx-auto">
          {feeTokens.slice(0, 3).map((feeToken, index) => (
            <div
              className={`bg-[#00022C] p-1 cursor-pointer ${isSelectedFeeToken(feeToken) ? "bg-gradient" : ""}`}
              key={index}
              onClick={() => handleFeeClick(feeToken)}
            >
              <div className="p-2 bg-[#00022C]">
                <p className="font-medium text-center">{feeToken}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}