const Token = artifacts.require("Token");

module.exports = async function (callback) {
    const [pub1, pub2, pub3, ...accounts] = await web3.eth.getAccounts()

    const instance = await Token.deployed();
    
    await instance.airdrop(pub1, web3.utils.toBN(20000), {from: pub1});
    await instance.airdrop(pub2, web3.utils.toBN(20000), {from: pub2});
    await instance.airdrop(pub3, web3.utils.toBN(20000), {from: pub3});

    callback();
}