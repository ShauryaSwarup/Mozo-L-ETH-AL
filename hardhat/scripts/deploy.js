const hre = require("hardhat");

async function main() {
    // const token = await hre.ethers.getContractFactory("DOSToken");
    // const dost = await token.deploy();
    // const dos = await dost.waitForDeployment();
    // console.log("DOST: ",dos.target);

    // const timelock = await hre.ethers.getContractFactory("DOSDAOTimeLock");
    // const time = await timelock.deploy(
    //     0,
    //     [hre.ethers.getAddress("0xF6dD638C931f944F064368B916Bd16D4BaFB96a4")],
    //     [hre.ethers.getAddress("0xF6dD638C931f944F064368B916Bd16D4BaFB96a4")],
    // );
    // const tim = await time.waitForDeployment();
    // console.log("DOSDAOTimeLock: ",tim.target);

    // const treasury = await hre.ethers.getContractFactory("Treasury");
    // const treas = await treasury.deploy({value: hre.ethers.parseEther("0.2")});
    // const tre = await treas.waitForDeployment();
    // console.log("Treasury: ",tre.target);

    const dosdao = await hre.ethers.getContractFactory("ResearcherContract");
    const dao = await dosdao.deploy(
        hre.ethers.getAddress("0x8ade558198584f398Ba0d86578E6a2687b665341"),
        hre.ethers.getAddress("0xC40F21E89e01899570Ac9d1421bDFFEc9D6eDD6b"),
    );
    const contract = await dao.waitForDeployment();
    console.log("DAO: ",contract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });