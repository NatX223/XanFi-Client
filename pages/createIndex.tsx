import React, { useState } from "react";
import Head from "next/head";
import ActionButtons from "../components/ActionButtons";
import type { NextPage } from "next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";
import { useEthersSigner } from "../utils/connection/adapter";
import { IndexAssets } from "~~/components/Index/IndexAssets";
import { IndexCategory } from "~~/components/Index/IndexCategory";
import { IndexChain } from "~~/components/Index/IndexChain";
import { IndexDetails } from "~~/components/Index/IndexDetails";
import { createIndex } from "~~/utils/app";
import { TokenInfo } from "~~/utils/Artifacts/tokens";
import { sepolia } from "viem/chains";

import { Chain } from "viem";

// import {
//   buildMultichainReadonlyClient,
//   buildRpcInfo,
//   initKlaster,
//   klasterNodeHost,
//   loadBicoV2Account,
//   rawTx
// } from "klaster-sdk";
// import { createWalletClient, custom, http } from "viem";
// import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
// import { arbitrumSepolia, sepolia } from "viem/chains";
// import { ethers } from "ethers";

const CreateIndex: NextPage = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [indexName, setIndexName] = useState("");
  const [IndexDescription, setIndexDescription] = useState("");
  const [indexCategory, setIndexCategory] = useState("");
  const [indexChain, setIndexChain] = useState<Chain>(sepolia);
  const [indexFee, setIndexFee] = useState("");
  const [assets, setAssets] = useState<TokenInfo[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const { address, isConnected, chain, chainId } = useAccount();
  const signer = useEthersSigner();

  const handleNext = () => {
    setCurrentStep(prevStep => prevStep + 1);
    if (currentStep + 1 === 4) setIsFinished(true);
  };

  const handlePrevious = () => {
    if (currentStep + 1 >= 4) setIsFinished(false);
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleFinish = async() => {
    try {
      console.log(indexName, IndexDescription, indexCategory, assets, indexChain.name, address);
      await createIndex(indexName, IndexDescription, indexCategory, assets, indexChain, indexFee, signer);
      setCurrentStep(1);
      setIsFinished(false);
      toast.success("Index Created succesfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleIndexDetails = (indexName: string, indexDescription: string) => {
    setIndexName(indexName);
    setIndexDescription(indexDescription);
  };

  const handleIndexCategory = (category: string) => setIndexCategory(category);

  const handleIndexChain = (chain: Chain) => setIndexChain(chain);
  const handleIndexFee = (fee: string) => setIndexFee(fee);

  const handleIndexAssets = (assets: TokenInfo[]) => setAssets(assets);

  return (
    <>
      <Head>
        <title>XanFi | Create</title>
        <meta
          name="description"
          content="Cross-chain asset management"
        />
      </Head>
      <section className="container mx-auto p-8">
        {currentStep === 1 && <IndexDetails onChange={handleIndexDetails} />}
        {currentStep === 2 && <IndexCategory onChange={handleIndexCategory} />}
        {currentStep === 3 && <IndexChain onChange={handleIndexChain} onMount={handleIndexFee} />}
        {currentStep === 4 && <IndexAssets onChange={handleIndexAssets} />}

        <ActionButtons
          onFinish={handleFinish}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastStep={isFinished}
          index={currentStep}
          disabled={isConnected}
        />
        <ToastContainer />
      </section>
    </>
  );
};

export default CreateIndex;
