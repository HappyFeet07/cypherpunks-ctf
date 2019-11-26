const Freeshop = artifacts.require("./Freeshop.sol")
const FreeshopFactory = artifacts.require("./FreeshopFactory.sol")
const FreeshopAttack = artifacts.require("./FreeshopAttack.sol")


const Ethernaut = artifacts.require("./Ethernaut.sol")

const truffleAssert = require("truffle-assertions")
import * as utils from "../utils/TestUtils"
import expectThrow from "zeppelin-solidity/test/helpers/expectThrow"
import toPromise from "zeppelin-solidity/test/helpers/toPromise"

contract("Freeshop", function(accounts) {

  let ethernaut
  let level
  let instance
  let player = accounts[0]
  let owner = accounts[1]

  before(async function() {
    ethernaut = await Ethernaut.new()
    level = await FreeshopFactory.new()
    await ethernaut.registerLevel(level.address)
  })

  it("should not be able to deposit funds", async function() {
    instance = await utils.createLevelInstance(
      ethernaut, level.address, player, Freeshop,
      { from : player , value: web3.toWei(1, "ether")}
    )
    assert.equal(0, await instance.balances(player))
    await instance.depositFunds({ from : player, value : 100 })
    assert.equal(100, await instance.balances(player))
  })

  it("should be able to solve the level", async function() {
    instance = await utils.createLevelInstance(
      ethernaut, level.address, player, Freeshop,
      { from : player , value: web3.toWei(1, "ether")}
    )
    const attacker = await FreeshopAttack.new( instance.address,{
      from: player,
    })
    await attacker.attack({ from : player, value: web3.toWei(0.1, "ether")})
    assert.equal(0, await instance.getBalance())
  })
})