const Encrypt = artifacts.require("./levels/Encrypt.sol")
const EncryptFactory = artifacts.require("./levels/EncryptFactory.sol")

const Ethernaut = artifacts.require("./Ethernaut.sol")

import * as utils from "../utils/TestUtils"
import expectThrow from "zeppelin-solidity/test/helpers/expectThrow"
import toPromise from "zeppelin-solidity/test/helpers/toPromise"

contract("Encrypt", function(accounts) {

  let ethernaut
  let level
  let instance
  let player = accounts[0]

  before(async function() {
    ethernaut = await Ethernaut.new()
    level = await EncryptFactory.new()
    await ethernaut.registerLevel(level.address)
    instance = await utils.createLevelInstance(
      ethernaut, level.address, player, Encrypt,
      { from : player}
    )
  })

  it("initial complete status should be false", async function() {
    assert.equal(false, await instance.complete())
  })

  it("should be able to get their data by calling pass function", async function() {
    assert.equal(false, await instance.pass())
  })

  it("should be able to solve the level", async function() {
    await instance.guess(0, {from: player})
    assert.equal(true, await instance.complete())
    assert.equal(true, await instance.pass())
  })
})