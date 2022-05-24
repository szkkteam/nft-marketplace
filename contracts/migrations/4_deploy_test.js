const Token = artifacts.require("Test");

module.exports = async (deployer, network, [defaultAccount]) => {
    await deployer.deploy(Token);
    token = await Token.deployed();  

    console.log(
      `Test deployed at ${token.address} in network: ${network}.`
    );
}
