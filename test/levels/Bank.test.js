const Bank = artifacts.require("./levels/Bank.sol")
const BankFactory = artifacts.require("./levels/BankFactory.sol")

const Ethernaut = artifacts.require("./Ethernaut.sol")

import * as utils from "../utils/TestUtils"
import expectThrow from "zeppelin-solidity/test/helpers/expectThrow"
import toPromise from "zeppelin-solidity/test/helpers/toPromise"

contract("Bank", function(accounts) {
    
  let ethernaut
  let level
  let instance
  let player = accounts[0]
  let transferTo = accounts[1]

  beforeEach(async function() {
    ethernaut = await Ethernaut.new()
    level = await BankFactory.new()
    await ethernaut.registerLevel(level.address)
    instance = await utils.createLevelInstance(
      ethernaut, level.address, player, Bank,
      { from: player }
    )
  })

  it("Player initail balance should be 29", async function() {
    //check player's balance
    assert.equal(29, await instance.balanceOf(player))
  })

  it("Player should be able to transfer to other account", async function() {
    await instance.transfer(transferTo, 10, {from: player})
    assert.equal(10, await instance.balanceOf(transferTo))
  })

  it("Player should able to solve the level", async function() {
    await instance.transfer(transferTo, 30, {from: player})
    assert.equal(true, await instance.balanceOf(player) > 29)
  })
})