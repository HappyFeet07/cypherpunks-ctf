const truffleAssert = require("truffle-assertions")

const MorganStark = artifacts.require("./MorganStark.sol")
const MorganStarkFactory = artifacts.require("./MorganStarkFactory.sol")
const MorganStarkAttack = artifacts.require("./MorganStarkAttack.sol")


const Ethernaut = artifacts.require("./Ethernaut.sol")

import * as utils from "../utils/TestUtils"
import expectThrow from "zeppelin-solidity/test/helpers/expectThrow"
import toPromise from "zeppelin-solidity/test/helpers/toPromise"

contract("MorganStark", function(accounts) {

  let ethernaut
  let level
  let instance
  let player = accounts[0]

  before(async function() {
    ethernaut = await Ethernaut.new()
    level = await MorganStarkFactory.new()
    await ethernaut.registerLevel(level.address)
    instance = await utils.createLevelInstance(
      ethernaut, level.address, player, MorganStark,
      { from : player }
    )
  })

  it("shouldn't be able to use collegeFund", async function() {
    // console.log(await instance.collegeFund({from : player}))
    await truffleAssert.reverts(
      instance.collegeFund({ from : player, value : web3.toWei(1, "ether")})
    )
  })

  it("should be able to solve the level", async function() {
    const attacker = await MorganStarkAttack.new({
      from: player,
      value: web3.toWei(0.01, "ether")
    })
    await attacker.pwn(instance.address)
    assert.equal(true, await instance.checkBalance() > 0)
  })
})