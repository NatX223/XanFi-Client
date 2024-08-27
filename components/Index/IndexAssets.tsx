import React, { useState, useEffect } from "react";
import { SUPPORTED_TOKENS } from "~~/networkHelpers";
import { AssetsProps } from "~~/types/SelectProp";
import { checkArrayOperation } from "~~/utils/functionHelper";

export function IndexAssets(prop: AssetsProps) {
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const handleConditionClick = (asset: string) => {
    const op = checkArrayOperation(asset, selectedAssets);
    const ind = op.ind;
    const op_ = op.op;
    console.log("initial selected assets", selectedAssets);

    if (op_ === true) {
      setSelectedAssets([...selectedAssets, asset]);
      prop.onChange([...selectedAssets, asset]);
      console.log("added to selected assets", [...selectedAssets, asset]);
    } else {
      const updatedAssets = selectedAssets.filter((_, i) => i !== ind);
      setSelectedAssets(updatedAssets);
      prop.onChange(updatedAssets);
      console.log("removed selected assets", updatedAssets);
    }
  };

  const isAssetSelected = (asset: string) => {
    return selectedAssets.includes(asset);
  };

  const assets: string[] = Object.keys(SUPPORTED_TOKENS);

  return (
    <div>
      <h1 className="text-sm font-medium mb-2">Create an Index</h1>
      <h2 className="text-2xl font-bold mb-4">Select Assets</h2>

      <div className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 w-3/4 py-6 mx-auto">
          {assets.slice(0, 4).map((asset, index) => (
            <div
              className={`bg-[#00022C] p-1 cursor-pointer ${isAssetSelected(asset) ? "bg-gradient" : ""}`}
              key={index}
              onClick={() => handleConditionClick(asset)}
            >
              <div className="p-2 bg-[#00022C]">
                <p className="font-medium text-center">{asset}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-4/5 mx-auto">
          {assets.slice(4, 8).map((asset, index) => (
            <div
              className={`bg-[#00022C] p-1 cursor-pointer ${isAssetSelected(asset) ? "bg-gradient" : ""}`}
              key={index}
              onClick={() => handleConditionClick(asset)}
            >
              <div className="p-2 bg-[#00022C]">
                <p className="font-medium text-center">{asset}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
