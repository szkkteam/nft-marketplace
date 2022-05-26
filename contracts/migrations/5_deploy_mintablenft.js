const Nft = artifacts.require("MintableNft");

module.exports = async (deployer, network, [defaultAccount]) => {
    await deployer.deploy(Nft);
    token = await Nft.deployed();  

    console.log(
      `MintableNFT deployed at ${token.address} in network: ${network}.`
    );
}
