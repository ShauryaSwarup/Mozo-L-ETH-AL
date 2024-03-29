const hre = require("hardhat");

async function main() {
  const [executor, proposer, voter1, voter2, voter3, voter4, voter5] = await hre.ethers.getSigners();

  const supply = hre.ethers.parseEther('1000'); // 1000 Tokens

  // Deploy token
  console.log("Deploying Token with a supply of", supply.toString());
  const token = await hre.ethers.deployContract("Token", [supply]);
  await token.waitForDeployment();
  console.log("Token deployed to:", token.target);

  const amount = hre.ethers.parseEther('50');
  await token.transfer(voter1.address, amount);
  await token.transfer(voter2.address, amount);
  await token.transfer(voter3.address, amount);
  await token.transfer(voter4.address, amount);
  await token.transfer(voter5.address, amount);

  // Deploy timelock
  const minDelay = 0;

  console.log("Deploying Timelock with minDelay of", minDelay.toString());
  const timelock = await ethers.deployContract("Timelock", [minDelay, [proposer.address], [executor.address]]);
  await timelock.waitForDeployment();
  console.log("Timelock deployed to:", timelock.target);

  console.log()
  // Deploy governance
  const quorum = 5; // 5% of total supply
  const votingDelay = 0;
  const votingPeriod = 5;

  console.log("Deploying Governance with quorum of", quorum.toString(), "votingDelay of", votingDelay.toString(), "and votingPeriod of", votingPeriod.toString());
  const governance = await ethers.deployContract("Governance", [token.address, timelock.address, quorum, votingDelay, votingPeriod]);
  await governance.waitForDeployment();
  console.log("Governance deployed to:", governance.target);

  console.log()

  // Deploy Treasury
  const funds = hre.ethers.parseEther('25');

  console.log("Deploying Treasury with funds of", funds.toString());
  const treasury = await ethers.deployContract("Treasury", [executor.address], { value: funds });
  await treasury.waitForDeployment();
  console.log("Treasury deployed to:", treasury.target);
  await treasury.transferOwnership(timelock.address);
  console.log("Treasury ownership transferred to Timelock");

  console.log()

  // Assign roles
  const proposerRole = await timelock.PROPOSER_ROLE();
  const executorRole = await timelock.EXECUTOR_ROLE();

  await timelock.grantRole(proposerRole, governance.address);
  console.log("Governance granted PROPOSER_ROLE in Timelock");
  await timelock.grantRole(executorRole, governance.address);
  console.log("Governance granted EXECUTOR_ROLE in Timelock");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.parseEther("0.001");

//   const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
