const hre = require("hardhat");

async function main() {
    // const token = await hre.ethers.getContractFactory("DOSToken");
    // const dost = await token.deploy();
    // const dos = await dost.waitForDeployment();
    // console.log("DOST: ", dos.target);

    // const timelock = await hre.ethers.getContractFactory("DOSDAOTimeLock");
    // const time = await timelock.deploy(
    //     0,
    //     [hre.ethers.getAddress("0x27A4906Aa1F27Fb6968fB21f81d4c0B185642a00")],
    //     [hre.ethers.getAddress("0x27A4906Aa1F27Fb6968fB21f81d4c0B185642a00")]
    // );
    // const tim = await time.waitForDeployment();
    // console.log("DOSDAOTimeLock: ", tim.target);

    // const treasury = await hre.ethers.getContractFactory("Treasury");
    // const treas = await treasury.deploy({
    //     value: hre.ethers.parseEther("0.2"),
    // });
    // const tre = await treas.waitForDeployment();
    // console.log("Treasury: ", tre.target);

    const dosdao = await hre.ethers.getContractFactory("ResearcherContract");
    const dao = await dosdao.deploy(
        hre.ethers.getAddress("0x762A6968081944893093BD8632531ADab0E16dC8"),
        hre.ethers.getAddress("0x10EE6508d02742485c804B278321Cbec150bC23E")
    );
    const contract = await dao.waitForDeployment();
    console.log("DAO: ", contract.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
