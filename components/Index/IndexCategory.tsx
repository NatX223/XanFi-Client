import { useEffect, useState } from "react";
import Head from "next/head";
import { CategoryProps } from "~~/types/SelectProp";

export function IndexCategory(props: CategoryProps) {
  const [boxCategory, setBoxCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [indexCategory, setIndexCategory] = useState("");

  const boxes = [
    { label: "DeFi", value: "DeFi" },
    { label: "GameFi", value: "GameFi" },
    { label: "Memes", value: "Memes" },
    { label: "DAOs", value: "DAOs" },
  ];

  const handleCustomCategoryValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(event.target.value);
    setIndexCategory(event.target.value);
    props.onChange(event.target.value);
  };

  const handleBoxClick = (value: string) => {
    console.log(value);
    setBoxCategory(value);
    setIndexCategory(value);
    props.onChange(value);
  };

  useEffect(() => {
    if (boxCategory == "" && customCategory != "") {
        setIndexCategory(customCategory);
    } else {
        setIndexCategory(boxCategory);
    }
    props.onChange(indexCategory);
  }, [boxCategory, customCategory]);

  const isActiveBox = (value: string) => {
    return boxCategory === value;
  };

  return (
    <>
      <Head>
        <title>Index Category</title>
      </Head>

      <div>
        <h2 className="text mb-4">Create an Index</h2>
        <h1 className="text-3xl font-bold mb-4">Index Category</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-32 w-3/4 mx-auto">
          {boxes.map(box => (
            <div
              key={box.value}
              className={`bg-[#00022C] p-1 text-center cursor-pointer ${isActiveBox(box.value) ? "bg-gradient" : ""}`}
              onClick={() => handleBoxClick(box.value)}
            >
              <div className="p-2 bg-[#00022C]">{box.label}</div>
            </div>
          ))}
        </div>

        <div className="flex mt-4 align-middle justify-center">
          <div className="mr-2">
            <span className="text-xl mr-6">Custom category</span>
            <input
              type="text"
              className="border text-black border-gray-300 px-2 py-2 ml-2 text-center"
              value={customCategory}
              onChange={handleCustomCategoryValueChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}
