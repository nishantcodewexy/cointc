// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Coin {
    address public minter;
    uint256 totalSupply = 1000000000000;
    mapping(address => uint256) public balances;

    // Events
    event Sent(address _from, address _to, uint256 _amount);

    constructor() {
        minter = msg.sender;
        balances[minter] = totalSupply;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function mint(address _to, uint256 _amount) public {
        require(msg.sender == minter);
        balances[_to] += _amount;
    }

    error InsufficientBalance(uint256 requested, uint256 available);

    function transfer(address _to, uint256 _amount) public {
        // require(balances[msg.sender] > _amount);
        if (_amount > balances[msg.sender])
            revert InsufficientBalance({
                requested: _amount,
                available: balances[msg.sender]
            });
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
        emit Sent(msg.sender, _to, _amount);
    }
}
