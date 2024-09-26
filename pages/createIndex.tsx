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
import { IndexDetails } from "~~/components/Index/IndexDetails";
import { createIndex } from "~~/utils/app";
import {
  buildMultichainReadonlyClient,
  buildRpcInfo,
  initKlaster,
  klasterNodeHost,
  loadBicoV2Account,
} from "klaster-sdk";
import { createWalletClient, custom, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia, sepolia } from "viem/chains";

const CreateIndex: NextPage = () => {
  interface TokenInfo {
    name: string;
    address: string;
    chain: number;
  }

  const [currentStep, setCurrentStep] = useState(1);
  const [indexName, setIndexName] = useState("");
  const [IndexDescription, setIndexDescription] = useState("");
  const [indexCategory, setIndexCategory] = useState("");
  const [assets, setAssets] = useState<TokenInfo[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const { address, isConnected, chain, chainId } = useAccount();
  const signer = useEthersSigner();

  const signerAddress = signer?.address;
 
  async function initializeKlaster(signerAddress: string): Promise<any> {
    // Ensure that the signerAddress is in the correct format '0x${string}'
    if (!/^0x[0-9a-fA-F]{40}$/.test(signerAddress)) {
      throw new Error('Invalid Ethereum address format. Expected 0x-prefixed string.');
    }
  
    const klaster = await initKlaster({
      accountInitData: loadBicoV2Account({
        owner: signerAddress as `0x${string}`, // Cast to the expected template literal type
      }),
      nodeUrl: klasterNodeHost.default,
    });
  
    return klaster;
  }

  const mcClient = buildMultichainReadonlyClient([
    buildRpcInfo(sepolia.id, "<sep-rpc-url>"),
    buildRpcInfo(arbitrumSepolia.id, "<arbsep-rpc-url>"),
  ]);

  const handleNext = () => {
    
    setCurrentStep(prevStep => prevStep + 1);
    if (currentStep + 1 === 3) setIsFinished(true);
  };

  const handlePrevious = () => {
    if (currentStep + 1 >= 3) setIsFinished(false);
    setCurrentStep(prevStep => prevStep - 1);
  };

  const handleFinish = async() => {
    try {
      console.log(indexName, IndexDescription, indexCategory, assets, chain?.name, address);
      await createIndex(indexName, IndexDescription, indexCategory, assets, chain?.name, chainId, signer);
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
        {currentStep === 3 && <IndexAssets onChange={handleIndexAssets} />}

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
