// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

//implement intercefe ierc20


contract MintingoCollection is ERC721, IERC20, ERC721Enumerable, Ownable, ReentrancyGuard {
    using Strings for uint256;

    string public baseURI;
    string public notRevealedUri;
    string public baseExtension = ".json";

    bool public paused = false;
    bool public revealed = false;

    uint256 start_block;
    Ticket price_info;
    uint256 expiration;
    
    uint256 public max_Supply;

// token_id -> reward
    mapping(uint256 => RewardInfo) reward_by_token;

// the one that is in 0 position is Tier 0, the 1st one Tier 1, etc etc
    RewardInfo[] rewards;

    address master;

 // Struct per definire Ticker e RewardInfo
    struct Ticket {
    address[] coins;
    address[] nfts;
    mapping(address => uint) coin_to_price;
    }

    struct RewardInfo {
    address coin;
    uint256 amount ;
    uint256 total_claimable ;
    uint256 total_claimed;
    }   


// Make a require to check if the user is in the winning array
    modifier onlyWinner() {
        if (revealed == true) {
            bool legit = false;
            for (uint256 i = 0; i < winners.length; i++) {
                if (msg.sender == winners[i]) {
                    legit = true;
                    break;
                }
            }
            require(legit == true, "NOT_AUTHORIZED");
            _;
        }
    }

  
// Modifier per Master Contract
    modifier onlyMaster() {
        require(msg.sender == this.master, 'NOT_AUTHORIZED');
        _;
    }

// Constructor 
    constructor( string memory _name,
        string memory _symbol,
        string memory _supply,
        string memory _initNotRevealedUri, uint256[] totalClaimable, uint[] tiers, address[] coins, uint256[] amounts, Ticket priceValue, address _master) ERC721(_name, _symbol) Ownable() {
        require(tiers.length == coins.length == amounts.length, 'INVALID_DATA');
        rewards[0] = RewardInfo(address(0),0,0,0); // Tier 0 reward = loser
        for(uint i=0; i < tiers.length; i++){
            rewards.push(RewardInfo(coins[i], amounts[i]));
        }
        this.max_Supply = _supply;
        this.notRevealedUri = _initNotRevealedUri;
        this.price_info = priceValue;
        this.master = _master;
        setNotRevealedURI(_initNotRevealedUri);
    }

// Funzione per ottenere il balance della collezione
   function  balanceOf(address collection) public returns(uint256[]){
        uint256[] amounts = [];
        for(uint i=0; i < this.price_info.coins.length; i++){
            amounts.push(IERC20(this.price_info.coins[i]).balanceOf(address(this)));
        }
        return amounts;
    }

// Funzione per sapere se utente può claimare premio
    function  claim(uint256 token_id) public onlyWinner() {
        // il master puo claimare dopo la scandenza di expiration
       
        require (this.expiration > block.timestamp, 'EXPIRED');
        require(balanceOf(msg.sender, token_id) > 0, 'NOT_HOLDER');
        require(this.winners.length > 0, 'NO_WINNERS');
        bool legit = false;
        for(uint i=0;i<this.winners.length; i++){
            if(this.winners[i] == token_id){
                legit = true;
                break;
            }
        }
        for(uint i=0; i < this.price_info.nfts.length; i++){
            require(IERC721(this.price_info.nfts[i]).balanceOf(msg.sender) > 0, 'NOT_TICKET_HOLDER');
        }

        require(legit == true, 'NOT_AUTHORIZED');
        // Transfer the reward to the winner
        RewardInfo reward = this.reward_by_token[token_id];
        require(reward.total_claimed < reward.total_claimable, 'NO_MORE_CLAIMS');
        reward.total_claimed += 1;
        // Transfer the reward to the winner from the contract
        IERC20(reward.coin).transfer(msg.sender, reward.amount);
    // Transfer the user ticket to the master contract
        IERC721(this).transferFrom(msg.sender, this.master, token_id);

       
    }

// Funzione per fare il reveal dei premi
    function  reveal(uint256[] winners, uint256[] tiers, string revealed_uri) public onlyMaster() {
        require(winners.length == tiers.length, 'INVALID_DATA_FORMAT');
        // update winners and rewards claimable
        for(uint i=0; i < winners.length; i++){
            uint256 tier = tiers[i];
            RewardInfo reward = rewards[tier];
            reward_by_token[winners[i]] = reward;
        }

        this.expiration = block.timestamp + 30 days;
        // rest of stuff here
        setBaseURI(revealed_uri);
        this.revealed = true;

    }


    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function mint(uint256 _mintAmount, address coin, address collection_address) public payable nonReentrant {
        require(paused, "The public mint is not opened"); // cambiare con _
        uint256 supply = totalSupply();
        require(supply + _mintAmount <= max_Supply, "Max Supply Reached");
        require(_mintAmount > 0, "need to mint at least 1 NFT");
       

         for(uint i=0; i < price_info.coins.length; i++){
            if(coin != price_info.coins[i])
                continue;
            require(
                IERC20(coin).balanceOf(msg.sender) > price_info.coin_to_price[coin],
                'INSUFFICENT_BALANCE'
            );
            require(
                IERC20(coin).transferFrom(msg.sender, collection_address, price_info.coin_to_price[coin]) * _mintAmount,
                'TRANSFER_FAILED'
            );
        }

        // same loop per nft only balanceOf
        for(uint i=0; i < price_info.nfts.length; i++){
            require(
                IERC721(price_info.nfts[i]).balanceOf(msg.sender) > 0,
                'NOT_TICKET_HOLDER'
            );
        }

          for (uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
    }


    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }


    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }


//For erc721 enumerable
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


    
// funzione withdraw per il master
    function withdraw(address coin, uint256 amount) public onlyMaster()  {
        require(coin != address(0), 'INVALID_COIN');
        require(amount > 0, 'INVALID_AMOUNT');
        require(IERC20(coin).balanceOf(address(this)) >= amount, 'INSUFFICENT_BALANCE');
        require(IERC20(coin).transfer(msg.sender, amount), 'TRANSFER_FAILED');
    }

   
}