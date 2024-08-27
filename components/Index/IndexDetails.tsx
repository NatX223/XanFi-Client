import React, { useEffect, useState } from "react";
import { DetailsProps } from "~~/types/SelectProp";

export function IndexDetails(props: DetailsProps) {
  const [IndexName, setIndexName] = useState(
    'Index Name'
  );
  const [IndexDescription, setIndexDescription] = useState(
    'Index Description'
  );

  const handleIndexNameValueChange = (value: string) => {
    setIndexName(value);
  };

  const handleIndexDescriptionValueChange = (value: string) => {
    setIndexDescription(value);
  };

  useEffect(() => {
    props.onChange(IndexName, IndexDescription);
  }, [IndexName, IndexDescription]);

  return (
    <div>
      <h1 className="text-sm font-medium mb-4">Create an Index</h1>
      <h2 className="text-3xl font-medium mb-12">Index details</h2>
        <div className="card lg:card-side border-[2px] border-[#ff00b8] ml-12 mr-12 rounded-2xl bg-gradient-2-0">
            <div className='card-body px-12 py-8'>
                <form className='relative mx-12 my-8'>
                    <div className='relative grid grid-rows-2 gap-4'>
                        <div className='grid grid-rows-3 gap-2'>
                            <label className='text-lg text-[#b423fd7a]'>
                                Index Name
                            </label>
                            <input
                            className="border border-bg-gradient rounded p-1 bg-gray-400 text-white"
                            type="text"
                            value={IndexName}
                            onChange={(e) => handleIndexNameValueChange(e.target.value)}
                            />
                        </div>
                        <div className='grid grid-rows-3 gap-2'>
                            <label className='text-lg text-[#b423fd7a]'>
                                Index Description
                            </label>
                            <input
                            className="border border-bg-gradient rounded p-1 bg-gray-400 text-white"
                            type="text"
                            value={IndexDescription}
                            onChange={(e) => handleIndexDescriptionValueChange(e.target.value)}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
  );
}
