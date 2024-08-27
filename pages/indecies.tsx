import { useEffect, useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { ActiveIndecies } from "~~/components/Index";
import { getAllIndecies } from "~~/utils/Firebase/getIndecies";
import { GetIndecies } from "~~/utils/Firebase/types";

const Indecies: NextPage = () => {
  const [indecies, setIndecies] = useState<GetIndecies[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllIndecies().then(data => {
      setLoading(false);
      setIndecies(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>XanFi | explore</title>
        <meta name="description" content="cross-chain asset management" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <ActiveIndecies indecies={indecies} loading={loading} />
    </>
  );
};

export default Indecies;
