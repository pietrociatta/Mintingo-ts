// Mintingo Master Contract
contract Master is Ownable {

    mapping(uint256 => address) collections;
    mapping(address => uint256[]) winners_by_collection;
    mapping(address => uint256) players_wins;
    mapping(address => uint256) players_attempts;
    uint[] collections_ids; // the last one (tail) is the current collection

  
    // create a new collection deploying a new Collection(ERC721) contract
    function  create_collection(
        string name,
        Ticket price_info,
        uint256 supply,
        uint256 start_block,
        string baseuri
    ) public onlyOwner() {
        MintingoCollection collection = new MintingoCollection(name, price_info, supply, start_block, baseuri, ...);
        address collection_address = address(collection);
        this.collections_ids.push(collection);
        this.collections[this.collections_ids.length - 1] = collection_address;
    }

    public reveal_by_id(
        uint256 collection_id,
        uint256[] winners,
        uint256[] tiers,
        string revealed_uri
    ) onlyOwner() {
        IERC721 collection = get_collection(collection_id);
        this.winners_by_collection[address(collection)] = winners;
        collection.reveal(winners, tiers, revealed_uri);
    }

    private get_collection_address(uint256 collection_id) returns(IERC721){
        require(this.collections[collection_id] != address(0), 'COLLECTION_DNE');
        return /*import interface di mintingo */ IMintingoCollection(this.collections[collection_id]);
        // check ierc20 interfect per vedere come farlo
    }

    public buy_ticket(uint256 collection_id, address coin) {
        /// TODO: if users lose X times in a row, then he has the right to get a free ticket.
        require(this.collections[collection_id] != address(0), 'COLLECTION_DNE');
        address collection_address = this.collections[collection_id];
        MintingoCollection collection = IMintingoCollection(collection_address);
      

        // merkle proof 


        // HERE IT MUST SENDS 10% TO ADMIN & 10% TO REFERRALS

        // CHECK for ticket.nfts sender holdings

        collection.mint(...)

    }

    ...

    event CollectionCreated(address indexed addr, uint256 indexed id, uint256 supply);
    event CollectionRevealed(address indexed addr, uint256 indexed id );

}