pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BCTVendor is Ownable{

  IERC20 bct;
  //it says eth, but it's matic or celo or whatever network we're on
  //right now, 1 bct is 2.94 matic. we'll sell them for 4, buy them for 2
  uint256 public maticPerBCTBuy = 4;
  uint256 public maticPerBCTSell = 2;
  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
  event SellTokens(address seller, uint256 amountOfETH, uint256 amountOfTokens);

  constructor(address tokenAddress) {
    bct = IERC20(tokenAddress);
  }

  function setPrice(uint256 _newSellPrice, uint256 _newBuyPrice) public onlyOwner{
    maticPerBCTBuy = _newSellPrice;
    maticPerBCTSell = _newBuyPrice;
  }

  function buyTokens() public payable {
    require(msg.value > 0, "Can't buy 0 tokens.");
    require(bct.balanceOf(address(this)) >= msg.value / maticPerBCTBuy, "Vendor doesn't have enough tokens to sell.");
    bct.transfer(msg.sender, msg.value / maticPerBCTBuy);
    emit BuyTokens(msg.sender, msg.value, msg.value / maticPerBCTBuy);
  }

  function withdraw() public onlyOwner {
    (bool success, ) = msg.sender.call{value: address(this).balance}("");
    require(success, "Failed to send Ether");
  }
  
  function sellTokens(uint256 amount) public {
    require(amount > 0, "Can't sell 0 tokens.");
    require(bct.balanceOf(address(msg.sender)) >= amount, "You don't have enough tokens to sell.");
    require(address(this).balance >= amount * maticPerBCTSell, "Vendor ran out of MATIC to buy tokens.");
    (bool success, ) = msg.sender.call{value: amount * maticPerBCTSell}("");
    require(success, "Failed to send MATIC");
    bct.transferFrom(msg.sender, address(this), amount);
    emit SellTokens(msg.sender, amount * maticPerBCTSell, amount);
  }
}
