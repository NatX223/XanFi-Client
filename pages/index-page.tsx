import { useEffect, useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { IndexDetails } from "~~/components/Index/IndexPageCard";
import { DocumentData } from "@firebase/firestore-types";
import { getIndex } from "~~/utils/Firebase/getIndecies";

const Subscriptions: NextPage = () => {
  const router = useRouter();
  const id: string | string[] | undefined = router.query.id;
  const idString: string = Array.isArray(id) ? id[0] : id ?? '';

  const [index, setIndex] = useState<DocumentData | null>();
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getIndex(id).then(data => {
      // setLoading(false);
      setIndex(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>XanFi | Index</title>
        <meta name="description" content="cross-chain asset management" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      {index && <IndexDetails name={index.name} description={index.description} sector={index.sector} creator={index.creator} chain={index.chain} holders={index.holders} assets={index.assets} docId={idString}/>}
    </>
  );
};

export default Subscriptions;
