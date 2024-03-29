import type { NextPage } from "next";
import React from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Link from 'next/link'

const Test: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>this is a test page</div>
        <Link href='/'>Home</Link>
      </main>
    </div>
  );
};

export default Test;
