import { useEffect, useState } from "react";
import Head from "next/head";
import { TimeProps } from "~~/types/SelectProp";

export function SubscriptionTimeBasedSubscription(props: TimeProps) {
  const [customTimeValue, setCustomTimeValue] = useState("");
  const [customTimeUnit, setCustomTimeUnit] = useState("hour");
  const [selectedCustomTime, setSelectedCustomTime] = useState("");

  const boxes = [
    { label: "DeFi", value: "DeFi" },
    { label: "GameFi", value: "GameFi" },
    { label: "Memes", value: "Memes" },
    { label: "DAOs", value: "DAOs" },
  ];

  const handleCustomTimeValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomTimeValue(event.target.value);
  };

  const handleBoxClick = (value: string) => {
    setCustomTimeUnit(value);
  };

  useEffect(() => {
    const getCustomTime = () => {
      const timeValue = customTimeValue;
      setSelectedCustomTime(`${timeValue} ${customTimeUnit}`);
    };

    getCustomTime();
    props.onChange(customTimeValue, customTimeUnit);
  }, [customTimeValue, customTimeUnit]);

  const isActiveBox = (value: string) => {
    return customTimeUnit === value;
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
              value={customTimeValue}
              onChange={handleCustomTimeValueChange}
            />

            {/* <select
              className="border border-gray-300 px-2 py-2 text-black"
              value={customTimeUnit}
              onChange={e => setCustomTimeUnit(e.target.value)}
            >
              <option value="hour">hour(s)</option>
              <option value="day">day(s)</option>
              <option value="week">week(s)</option>
              <option value="month">month(s)</option>
            </select> */}
          </div>
        </div>

        {/* ---For development purpose ---- */}
        {/* <div className="mt-4">Selected custom time: {selectedCustomTime}</div> */}
      </div>
    </>
  );
}
