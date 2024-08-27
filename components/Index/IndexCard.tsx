import React from "react";
import Link from "next/link";

export type TIndexItemProps = {
  name: string;
  description: string;
  sector: string;
  id: string;
};

export function IndexItem({ name, description, sector, id }: TIndexItemProps) {
  return(
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
  <div className="index-card lg:card-side border-[2px] border-[#ff00b8] rounded-2xl bg-gradient-2-0 w-full max-w-full mx-6 lg:mx-8 p-6">
    <p className="text-xl font-semibold"> Name: {name} </p>
    <p className="text-lg"> Description: {description} </p>
    <p className="text-lg"> Category: {sector} </p>
    <Link href={{pathname: '/index-page', query: { id }}} legacyBehavior>
      <a className="inline-block bg-gradient2 text-white py-2 px-4 rounded border-2 border-white cursor-pointer mt-4 transition duration-300 ease-in-out hover:bg-white hover:text-black">
        Invest
      </a>
    </Link>
  </div>
</div>
  );
}

export function IndexItemEmptyState() {
  return (
    <div className="flex justify-center  pt-14 pb-5  ">
      <h1 className="text-3xl font-light"> - no Indecies yet - </h1>
    </div>
  );
}

export function IndexItemLoadingState() {
  return (
    <div className="flex flex-row  justify-between  pt-14 pb-5  border-b-4 bg-[#00022C]">
      <div className=" flex flex-col w-10/12">
        <div className="py-4 bg-gray-400 animate-pulse w-3/4  h-10" />
        <div className=" flex space-x-32  pt-4 mr-4">
          <div className="bg-gray-400 animate-pulse w-1/2  h-7" />
          <div className="bg-gray-400 animate-pulse w-1/2  h-7" />
        </div>
      </div>
      <div className="flex justify-center w-2/12 items-end">
        <div className=" w-full rounded bg-gray-400 animate-pulse  h-14" />
      </div>
    </div>
  );
}
