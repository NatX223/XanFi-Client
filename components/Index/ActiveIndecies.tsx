import React from "react";
import { IndexItem, IndexItemEmptyState, IndexItemLoadingState } from "./index";
import { GetIndecies } from "~~/utils/Firebase/types";

export function ActiveIndecies({
  indecies,
  loading,
}: {
  indecies: GetIndecies[];
  loading: boolean;
}) {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-semibold"> Explore Indecies </h1>
      <div className="flex flex-col w-4/5 item-center justify-center m-auto  ">
        <ActiveIndeciesContent indecies={indecies} loading={loading} />
      </div>
    </div>
  );
}

function ActiveIndeciesContent({
    indecies,
  loading,
}: {
    indecies: GetIndecies[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <>
        <IndexItemLoadingState />
        <IndexItemLoadingState />
        <IndexItemLoadingState />
      </>
    );
  }

  if (indecies.length === 0) {
    return (
      <>
        <IndexItemEmptyState />
      </>
    );
  }

  return (
    <>
      {indecies.map(({ name, description, sector, key }, i) => (
        <IndexItem
          key={i}
          name={name}
          description={description}
          sector={sector}
          id={key}
        />
      ))}
    </>
  );
}