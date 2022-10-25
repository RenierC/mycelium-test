import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import erc20abi from "../config/erc20abi.json";

// arb usdc 0xff970a61a04b1ca14834a43f5de4533ebddb5cc8

const Home: NextPage = () => {
  const [formData, setFormData] = useState({
    walletAddress: "",
    erc20ContractAddress: "",
  });

  const [tokenEvents, setTokenEvents] = useState([
    { to: "", from: "", amount: "" },
  ]);

  useEffect(() => {
    if (formData.walletAddress && formData.erc20ContractAddress) {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://rpc.ankr.com/arbitrum"
      );

      const contract = new ethers.Contract(
        formData.erc20ContractAddress,
        erc20abi,
        provider
      );

      if (contract.filters.Transfer) {
        const toMeFilter = contract.filters.Transfer(
          null,
          formData.walletAddress
        );
        const fromMeFilter = contract.filters.Transfer(formData.walletAddress);

        contract.on(toMeFilter, (from, to, amount) => {
          console.log("transfer to me");
          const parsedAmount = amount.toNumber();
          console.log({ from, to, amount: parsedAmount });
          setTokenEvents((prev) => [
            ...prev,
            { from, to, amount: parsedAmount },
          ]);
        });

        contract.on(fromMeFilter, (from, to, amount) => {
          console.log("transfer from me");
          const parsedAmount = amount.toNumber();
          console.log({ from, to, amount: parsedAmount });
          setTokenEvents((prev) => [
            ...prev,
            { from, to, amount: parsedAmount },
          ]);
        });
      }
      return () => {
        contract.removeAllListeners();
      };
    }
  }, [formData]);

  return (
    <>
      <Head>
        <title>Mycelium Test</title>
        <link rel="icon" href="/myc-favicon.svg" />
      </Head>

      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#003000] p-4">
        <Image
          src="/myc-logo.svg"
          alt="mycelium logo"
          width={300}
          height={300}
        />
        <p className="my-4 text-white">Network: Arbitrum One</p>
        <p className="mb-4 text-white">
          Tested with the USDC contract
          0xff970a61a04b1ca14834a43f5de4533ebddb5cc8
        </p>
        <form className="flex flex-col items-center justify-center gap-8">
          <input
            className="w-96 rounded-md border-2 border-gray-300 p-2"
            type="text"
            placeholder="Wallet Address"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                walletAddress: e.target.value,
              }))
            }
          />
          <input
            className="w-96 rounded-md border-2 border-gray-300 p-2"
            type="text"
            placeholder="ERC20 Contract Address"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                erc20ContractAddress: e.target.value,
              }))
            }
          />
        </form>
        {tokenEvents.length > 1 && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            {tokenEvents.slice(1).map((event, index) => (
              <div
                key={index}
                className={`w-96 rounded-md border-2 border-gray-300 p-2 text-white ${
                  index % 2 === 0 ? "bg-[#002000]" : "bg-[#001000]"
                }`}
              >
                <p>From: {event.from}</p>
                <p>To: {event.to}</p>
                <p>Amount: {event.amount}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
