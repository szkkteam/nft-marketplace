const Nft = artifacts.require("SimpleNft");

module.exports = async function (callback) {
    const [pub1, pub2, pub3, ...accounts] = await web3.eth.getAccounts()

    const instance = await Nft.deployed();
    console.log(`Contract: ${instance.address}`)
    const balanceBefore = await instance.totalSupply();
    console.log(`
        balanceBefore: ${balanceBefore}
    `)
    await instance.publicMint(web3.utils.toBN(2), {from: pub1, value: web3.utils.toWei('0.16', 'ether')});
    await instance.publicMint(web3.utils.toBN(2), {from: pub2, value: web3.utils.toWei('0.16', 'ether')});
    await instance.publicMint(web3.utils.toBN(2), {from: pub3, value: web3.utils.toWei('0.16', 'ether')});

    const balanceAfter = await instance.totalSupply();
    console.log(`
    balanceAfter: ${balanceAfter}
    `)

    callback();
}