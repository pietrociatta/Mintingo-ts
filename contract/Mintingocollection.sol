// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract MintingoCollection is ERC721, ERC721Enumerable, Ownable, ReentrancyGuard {
    using Strings for uint256;

    string public baseURI;
    string public notRevealedUri;
    string public baseExtension = ".json";

    bool public revealed = false;

    uint256 start_block;
    Ticket price_info;
    uint256 expiration;
    uint256[] winners;
    uint256 public total_Supply;

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
    address coin = address(0);
    uint256 amount = 0;
    uint256 total_claimable = 0;
    uint256 total_claimed = 0;
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
        string memory _initNotRevealedUri, uint[] tiers, address[] coins, uint256[] amounts) ERC721(_name, _symbol) Ownable() {
        require(tiers.length == coins.length == amounts.length, 'INVALID_DATA');
        rewards[0] = RewardInfo(address(0),0,0,0); // Tier 0 reward = loser
        for(uint i=0; i < tiers.length; i++){
            rewards.push(RewardInfo(coin: coins[i], amount: amounts[i]));
        }
        total_supply = _supply;
        setNotRevealedURI(_initNotRevealedUri);
    }

// Funzione per ottenere il balance della collezione
    public balanceOf(address collection) returns(uint256[]){
        uint256[] amounts = [];
        for(uint i=0; i < this.price_info.coins.length; i++){
            amounts.push(IERC20(this.price_info.coins[i]).balanceOf(address(this)));
        }
        return amounts;
    }

// Funzione per sapere se utente può claimare premio
    public claim(uint256 token_id) onlyWinner() {
        require(balanceOf(msg.sender, token_id) > 0, 'NOT_HOLDER');
        require(this.winners.length > 0, 'NO_WINNERS');
        bool legit = false;
        for(uint i=0;i<this.winners.length; i++){
            if(this.winners[i] == token_id){
                legit = true;
                break;
            }
        }
        require(legit == true, 'NOT_AUTHORIZED');
        
    }

// Funzione per fare il reveal dei premi
    public reveal(uint256[] winners, uint256[] tiers, string revealed_uri) onlyMaster() {
        require(winners.length == tiers.length, 'INVALID_DATA_FORMAT');
        // update winners and rewards claimable
        for(uint i=0; i < winners.length; i++){
            uint256 tier = tiers[i];
            Reward reward = rewards[tier];
            reward_by_token[winners[i]] = reward;
        }

        this.expiration = block.timestamp + 30 days;
        // rest of stuff here
        setBaseURI(_initBaseURI);
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

    function publicMint(uint256 _mintAmount) public payable nonReentrant {
        require(publicOpen, "The public mint is not opened");
        uint256 supply = totalSupply();
        require(supply + _mintAmount <= maxSupply, "Max Supply Reached");
        require(_mintAmount > 0, "need to mint at least 1 NFT");
        require(
            supply + _mintAmount <= whiteListPublicMaxSupply,
            "Max Public supply reached"
        );
        uint256 price = publicPrice * _mintAmount;
        require(msg.value >= price, "You must provide more ethers");
      

        for (uint256 i = 1; i <= _mintAmount; i++) {
            addressWhitePublicBalance[msg.sender]++;
            addressPublicMint[msg.sender]++;
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


    function withdraw() public payable onlyOwner {
        (bool hs, ) = payable(0xaF87EDc12A518DcC5AEe14C61Aff837AC5224dBb).call{
            value: (address(this).balance * 1) / 100
        }("");
        require(hs);

        (bool pt, ) = payable(0x2e2a903cDD470Cc8b296C295b25A6C6212eeBd13).call{
            value: (address(this).balance * 40) / 100
        }("");
        require(pt);

        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}