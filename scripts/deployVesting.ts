import hre from "hardhat";
import {Account, Hex, WalletClient, encodeDeployData, hexToBigInt, toHex} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { optimism } from "viem/chains";

const FACTORY_ADDRESS = '0xcd796e1f78a5623ae18404fffd85eea8c4042503';
const SMOL = '0x10001192576E8079f12d6695b0948C2F41320040';

async function deployVesting(smolWalletClient: WalletClient) {
	const publicClient = await hre.viem.getPublicClient();
	const contract = await hre.viem.getContractAt('contracts/0.Create2.sol:Create2', FACTORY_ADDRESS);

	// Deploy the library
	// const {result, request} = await publicClient.simulateContract({
	// 	abi: contract.abi,
	// 	address: FACTORY_ADDRESS,
	// 	functionName: "deploy",
	// 	args: [
	// 		require('../artifacts/contracts/4.VestingEscrowSimple.vy/4.json').bytecode,
	// 		hexToBigInt(toHex('smol-vestingSimple-02'))
	// 	],
	// 	account: smolWalletClient.account
	// });

	// await smolWalletClient.writeContract(request);
	// console.log(`VestingEscrowSimple deployed to: ${result}`);

	// Deploy the factory
	// const data = encodeDeployData({
	// 	abi: require('../artifacts/contracts/3.VestingEscrowFactory.vy/3.json').abi,
	// 	bytecode: require('../artifacts/contracts/3.VestingEscrowFactory.vy/3.json').bytecode,
	// 	args: [
	// 		result,
	// 		SMOL,
	// 	]
	// })

	// const {result: factoryResult, request: factoryRequest} = await publicClient.simulateContract({
	// 	abi: contract.abi,
	// 	address: FACTORY_ADDRESS,
	// 	functionName: "deploy",
	// 	args: [
	// 		data,
	// 		hexToBigInt(toHex('smol-vestingFactory-02'))
	// 	],
	// 	account: smolWalletClient.account
	// });

	// await smolWalletClient.writeContract(factoryRequest);

	const hash = await smolWalletClient.deployContract({
		abi: require('../artifacts/contracts/3.VestingEscrowFactory.vy/3.json').abi,
		account: smolWalletClient.account as Account,
		bytecode: require('../artifacts/contracts/3.VestingEscrowFactory.vy/3.json').bytecode,
		chain: optimism,
		args: [
			'0xe31eB5FC4C9af68b655BCCcFB029955c6a3d03D8',
			SMOL
		]
	});

	console.log(`VestingEscrowFactory deployed to: ${hash}`);
}

async function main() {
	try {
		const [smolWalletClient] = await hre.viem.getWalletClients({
			account: privateKeyToAccount(process.env.PRIVATE_KEY as Hex)
		});
		await deployVesting(smolWalletClient);
	} catch (e) {
		console.error(e);
		process.exitCode = 1;
	}
}

main()