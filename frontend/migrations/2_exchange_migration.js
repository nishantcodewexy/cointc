const Exchange = artifacts.require('Exchange');
const Coin = artifacts.require('Coin');

module.exports = async function (deployer, network){
  await deployer.deploy(Coin);
  await deployer.deploy(Exchange);
  // const coin = Coin.deployed();
  // const exchange = Coin.deployed();
}