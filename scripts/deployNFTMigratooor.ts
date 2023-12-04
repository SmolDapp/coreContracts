import hre from "hardhat";
import {Client, Hex, WalletClient, encodeDeployData, hexToBigInt, toHex} from "viem";
import { privateKeyToAccount } from "viem/accounts";

const FACTORY_ADDRESS = "0x9a86494ba45ee1f9eeed9cfc0894f6c5d13a1f0b";
const SMOL = `0x${'10001192576E8079f12d6695b0948C2F41320040'}`;

async function deployNFTMigratooor(smolWalletClient: WalletClient) {
	const publicClient = await hre.viem.getPublicClient();
	const contract = await hre.viem.getContractAt('contracts/0.Create2.sol:Create2', FACTORY_ADDRESS);
	const {result, request} = await publicClient.simulateContract({
		abi: contract.abi,
		address: FACTORY_ADDRESS,
		functionName: "deploy",
		args: [
			require("../artifacts/contracts/2.nftMigratooor.sol/NFTMigratooor.json").bytecode,
			hexToBigInt(toHex('smol-nftmigratooor-02'))
		],
		account: smolWalletClient.account
	});

	await smolWalletClient.writeContract(request);
	console.log(`NFTMigratooor deployed to: ${result}`);
}

async function main() {
	try {
		const [smolWalletClient] = await hre.viem.getWalletClients({
			account: privateKeyToAccount(process.env.PRIVATE_KEY as Hex)
		});
		await deployNFTMigratooor(smolWalletClient);
	} catch (e) {
		console.error(e);
		process.exitCode = 1;
	}
}

main()