const Nft = artifacts.require("SimpleNft");

module.exports = async (deployer, network, [defaultAccount]) => {
    await deployer.deploy(Nft);
    token = await Nft.deployed();  

    console.log(
      `SimpleNFT deployed at ${token.address} in network: ${network}.`
    );
}
