import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import List "mo:base/List";
import Text "mo:base/Text";

import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Nat "mo:base/Nat";

actor NFTMarketplace {
    private stable var nextTokenId : Nat = 0;

    private type NFT = {
        owner: Principal;
        metadata: Text;
        price: Nat;
    };

    private var nfts = HashMap.HashMap<Nat, NFT>(0, Nat.equal, Hash.hash);

    public shared(msg) func mintNFT(metadata: Text) : async Nat {
        let owner = msg.caller;
        let tokenId = nextTokenId;
        let nft : NFT = {
            owner = owner;
            metadata = metadata;
            price = 0; // Not listed initially
        };
        nfts.put(tokenId, nft);
        nextTokenId += 1;
        tokenId
    };

    public shared(msg) func listNFT(tokenId: Nat, price: Nat) : async Bool {
        switch (nfts.get(tokenId)) {
            case (null) {
                return false; // NFT doesn't exist
            };
            case (?nft) {
                if (nft.owner != msg.caller) {
                    return false; // Not the owner
                };
                let updatedNFT : NFT = {
                    owner = nft.owner;
                    metadata = nft.metadata;
                    price = price;
                };
                nfts.put(tokenId, updatedNFT);
                return true;
            };
        };
    };

    public shared(msg) func purchaseNFT(tokenId: Nat) : async Bool {
        switch (nfts.get(tokenId)) {
            case (null) {
                return false; // NFT doesn't exist
            };
            case (?nft) {
                if (nft.price == 0) {
                    return false; // Not listed for sale
                };
                let updatedNFT : NFT = {
                    owner = msg.caller;
                    metadata = nft.metadata;
                    price = 0; // Remove from listing
                };
                nfts.put(tokenId, updatedNFT);
                return true;
            };
        };
    };

    public query func getListedNFTs() : async [(Nat, NFT)] {
        let listedNFTs = Array.filter<(Nat, NFT)>(Iter.toArray(nfts.entries()), func(item) {
            item.1.price > 0
        });
        listedNFTs
    };
}
