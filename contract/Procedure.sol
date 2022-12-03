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

// This is an ERC721 with some extra features plus a vault capability.
contract MintingoCollection is ERC721, Ownable {

    uint256 start_block;
    Ticket price_info;
    uint256 expiration;
    uint256[] winners;
    // token_id -> reward
    mapping(uint256 => RewardInfo) reward_by_token;
    // the one that is in 0 position is Tier 0, the 1st one Tier 1, etc etc
    RewardInfo[] rewards;
    address master;

    modifier onlyMaster() {
        require(msg.sender == this.master, 'NOT_AUTHORIZED');
        _;
    }

    constructor(..., uint[] tiers, address[] coins, uint256[] amounts) ERC721(name, symbol, supply) Ownable() {
        require(tiers.length == coins.length == amounts.length, 'INVALID_DATA');
        rewards[0] = RewardInfo(address(0),0,0,0); // Tier 0 reward = loser
        for(uint i=0; i < tiers.length; i++){
            rewards.push(RewardInfo(coin: coins[i], amount: amounts[i]));
        }
    }

    public balanceOf(address collection) returns(uint256[]){
        uint256[] amounts = [];
        for(uint i=0; i < this.price_info.coins.length; i++){
            amounts.push(IERC20(this.price_info.coins[i]).balanceOf(address(this)));
        }
        return amounts;
    }

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

        // TRANSFER CLAIM
        
    }

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
    }
}

// Mintingo Master Contract
contract Master is Ownable {

    mapping(uint256 => address) collections;
    mapping(address => uint256[]) winners_by_collection;
    mapping(address => uint256) players_wins;
    mapping(address => uint256) players_attempts;
    uint[] collections_ids; // the last one (tail) is the current collection

    address admin;

    constructor(){}

    // create a new collection deploying a new Collection(ERC721) contract
    public create_collection(
        string name,
        Ticket price_info,
        uint256 supply,
        uint256 start_block,
        string baseuri,
        ...
    ) onlyOwner() {
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

    private get_collection(uint256 collection_id) returns(IERC721){
        require(this.collections[collection_id] != address(0), 'COLLECTION_DNE');
        return /*import interface di mintingo */ MintingoCollection(this.collections[collection_id]);
        // check ierc20 interfect per vedere come farlo
    }

    public buy_ticket(uint256 collection_id, address coin) {
        /// TODO: if users lose X times in a row, then he has the right to get a free ticket.
        require(this.collections[collection_id] != address(0), 'COLLECTION_DNE');
        address collection_address = this.collections[collection_id];
        MintingoCollection collection = MintingoCollection(collection_address);
        Ticket ticket = collection.get_ticket();

        // merkle proof 


        // HERE IT MUST SENDS 10% TO ADMIN & 10% TO REFERRALS

        // CHECK for ticket.nfts sender holdings

        collection.mint(...)

    }

    ...

    event CollectionCreated(address indexed addr, uint256 indexed id, uint256 supply);
    event CollectionRevealed(address indexed addr, uint256 indexed id );

}