import hre from "hardhat";

async function main() {
	const factory = await hre.viem.deployContract('contracts/0.Create2.sol:Create2')
  console.log("Factory deployed to:", factory.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
