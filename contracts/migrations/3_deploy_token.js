const Token = artifacts.require("Token");

module.exports = async (deployer, network, [defaultAccount]) => {
    await deployer.deploy(Token);
    token = await Token.deployed();  

    console.log(
      `Token deployed at ${token.address} in network: ${network}.`
    );
}
