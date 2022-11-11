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


    constructor( string memory _name,
        string memory _symbol,
        string memory _supply,
        string memory _initBaseURI,
        string memory _initNotRevealedUri, uint[] tiers, address[] coins, uint256[] amounts) ERC721(_name, _symbol) Ownable() {
        require(tiers.length == coins.length == amounts.length, 'INVALID_DATA');
        rewards[0] = RewardInfo(address(0),0,0,0); // Tier 0 reward = loser
        for(uint i=0; i < tiers.length; i++){
            rewards.push(RewardInfo(coin: coins[i], amount: amounts[i]));
        }
        total_supply = _supply;
        setBaseURI(_initBaseURI);
        setNotRevealedURI(_initNotRevealedUri);
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

    function reveal() public onlyOwner {
        revealed = true;
    }

    function airdrop(address[] calldata users, uint256 numNFT)
        external
        onlyOwner
    {
        uint256 supply = totalSupply();
        require(numNFT > 0, "Mint amount should be greater than 0");
        require(users.length > 0, "No address specified");
        require(
            supply + (numNFT * users.length) < maxSupply + 1,
            "Max supply overflow"
        );

        for (uint256 i; i < users.length; i++) {
            for (uint256 j; j < numNFT; j++) {
                supply += 1;
                _safeMint(users[i], supply);
            }
        }
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
        uint256 tot = addressWhitePublicBalance[msg.sender];
        require(
            tot + _mintAmount <= maxNftPerAddress,
            "You can only mint 3 nft."
        );
        uint256 pub = addressPublicMint[msg.sender];
        require(
            pub + _mintAmount <= publicNftPerAddress,
            "In Public you can mint only 3 ntf."
        );

        for (uint256 i = 1; i <= _mintAmount; i++) {
            addressWhitePublicBalance[msg.sender]++;
            addressPublicMint[msg.sender]++;
            _safeMint(msg.sender, supply + i)
        }
    }

    function whiteListMint(uint256 _mintAmount, bytes32[] calldata proof)
        public
        payable
        nonReentrant
    {
        require(whiteListOpen, "The whiteList mint is not opened");
        require(isWhiteListed(proof), "You are not in the whitelist");
        uint256 supply = totalSupply();
        require(supply + _mintAmount <= maxSupply, "Max Supply Reached");
        require(_mintAmount > 0, "need to mint at least 1 NFT");
        require(
            supply + _mintAmount <= whiteListPublicMaxSupply,
            "Max Whitelist supply reached"
        );
        uint256 price = whiteListPrice * _mintAmount;
        require(msg.value >= price, "You must provide more ethers");
        uint256 tot = addressWhitePublicBalance[msg.sender];
        require(
            tot + _mintAmount <= maxNftPerAddress,
            "You can only mint 3 nft."
        );

        uint256 whitelist = addressWhitelistMint[msg.sender];
        require(
            whitelist + _mintAmount <= whitelistNftPerAddress,
            "In whitelist you can mint only 2 ntf"
        );

        for (uint256 i = 1; i <= _mintAmount; i++) {
            addressWhitePublicBalance[msg.sender]++;
            addressWhitelistMint[msg.sender]++;
            _safeMint(msg.sender, supply + i);
        }
    }

    function setWhiteListMerkleRoot(bytes32 _root) external onlyOwner {
        whiteListRoot = _root;
    }

    function isWhiteListed(bytes32[] memory _proof) public view returns (bool) {
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        return MerkleProof.verify(_proof, whiteListRoot, leaf);
    }

    function privateMint(
        uint256 _mintAmount,
        uint256 _addressReservedTokens,
        bytes32[] calldata proof
    ) public payable nonReentrant {
        require(privateOpen, "The private mint is not opened");
        require(
            isPrivateListed(_addressReservedTokens, proof),
            "you are not in the private list"
        );
        uint256 supply = totalSupply();
        require(supply + _mintAmount <= maxSupply, "max NFT limit exceeded");

        uint256 owned = addressPrivateMintedBalance[msg.sender];
        require(
            owned + _mintAmount <= _addressReservedTokens,
            "You have less nft reserved"
        );

        for (uint256 i = 1; i <= _mintAmount; i++) {
            addressPrivateMintedBalance[msg.sender]++;
            _safeMint(msg.sender, supply + i);
        }
    }



    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setWhiteListOpen(bool _open) public onlyOwner {
        whiteListOpen = _open;
    }

    function setPublicOpen(bool _open) public onlyOwner {
        publicOpen = _open;
    }

    function setPrivateOpen(bool _open) public onlyOwner {
        privateOpen = _open;
    }

    function setPublicCost(uint256 _newCost) public onlyOwner {
        publicPrice = _newCost;
    }

    function setWhitelistCost(uint256 _newCost) public onlyOwner {
        whiteListPrice = _newCost;
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