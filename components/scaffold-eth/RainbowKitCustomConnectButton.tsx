import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { ArrowLeftOnRectangleIcon, ArrowsRightLeftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { BlockieAvatar } from "~~/components/scaffold-eth";
// import { getUser, saveUser } from "~~/firebase/firestore";
import { useAutoConnect, useNetworkColor } from "~~/hooks/scaffold-eth";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const RainbowKitCustomConnectButton = () => {
  useAutoConnect();

  const networkColor = useNetworkColor();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { address, isConnected } = useAccount();
  const chains = [mainnet, polygon, optimism, arbitrum, base];

  // useEffect(() => {
  //   (async () => {
  //     const user = await getUser(address);
  //     if (user == null) {
  //       saveUser(address);
  //     }
  //   })();
  // }, [isConnected]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openConnectModal, openChainModal, mounted }) => {
        const connected = mounted && account && chain;

        return (
          <>
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="btn btn-primary btn-sm capitalize rounded border-2 border-white"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn btn-error btn-sm dropdown-toggle">
                      <span>Wrong network</span>
                      <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu p-2 mt-1 shadow-lg bg-base-100 rounded-box">
                      <li>
                        <button
                          className="menu-item"
                          type="button"
                          onClick={() => switchChain({ chainId: mainnet.id })}
                        >
                          <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <span className="whitespace-nowrap">
                            {/* Switch to <span style={{ color: networkColor }}>{configuredNetwork.name}</span> */}
                            Switch to <span>{mainnet.name}</span>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button
                          className="menu-item"
                          type="button"
                          onClick={() => switchChain({ chainId: polygon.id })}
                        >
                          <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
                          <span className="whitespace-nowrap">
                            {/* Switch to <span style={{ color: networkColor }}>{configuredNetwork.name}</span> */}
                            Switch to <span>{polygon.name}</span>
                          </span>
                        </button>
                      </li>
                      <li>
                        <button className="menu-item text-error" type="button" onClick={() => disconnect()}>
                          <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                );
              }

              return (
                <div className="px-2 flex justify-end items-center">
                  <div className="flex justify-center items-center border-1 rounded-lg">
                    <div className="flex flex-col items-center mr-1">
                      {/* <Balance address={account.address} className="min-h-0 h-auto" /> */}
                      <span className="text-xs" style={{ color: networkColor }}>
                        {chain.name}
                      </span>
                    </div>
                    <button
                      onClick={openAccountModal}
                      // onClick={openChainModal}
                      type="button"
                      className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md"
                    >
                      <BlockieAvatar address={account.address} size={24} ensImage={account.ensAvatar} />
                      <span className="ml-2 mr-1">{account.displayName}</span>
                      <span>
                        <ChevronDownIcon className="h-6 w-4" />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </>
        );
      }}
    </ConnectButton.Custom>
  );
};
