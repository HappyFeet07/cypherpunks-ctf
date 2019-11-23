const University = artifacts.require("./levels/University.sol")
const UniversityFactory = artifacts.require("./levels/UniversityFactory.sol")

const Ethernaut = artifacts.require("./Ethernaut.sol")

import * as utils from "../utils/TestUtils"
import expectThrow from "zeppelin-solidity/test/helpers/expectThrow"
import toPromise from "zeppelin-solidity/test/helpers/toPromise"

contract("University", function(accounts) {
    
  let ethernaut
  let level
  let instance
  let player = accounts[0]
  let transferTo = accounts[1]

  beforeEach(async function() {
    ethernaut = await Ethernaut.new()
    level = await UniversityFactory.new()
    await ethernaut.registerLevel(level.address)
    instance = await utils.createLevelInstance(
      ethernaut, level.address, player, University,
      { from : player }
    )
  })

  it("should be able to solve this level", async function() {
    //check player's balance
    await instance.combine("National Yang Ming University")
    assert.equal(true, await instance.combined())
  })
})