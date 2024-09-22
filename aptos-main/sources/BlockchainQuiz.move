module Diploma::NFTDiploma {

    use std::signer;

    /// Struct to represent the diploma NFT
    struct DiplomaNFT has key {
        creator: address,
        graduate_name: vector<u8>,
        issue_date: u64,
    }

    /// Mint a new diploma NFT for a graduate
    public fun mint_diploma(
        account: &signer,
        graduate_name: vector<u8>,
        issue_date: u64
    ) {
        let owner_address = signer::address_of(account);
        let diploma_nft = DiplomaNFT {
            creator: owner_address,
            graduate_name,
            issue_date,
        };

        // Store the diploma NFT in the account
        move_to(account, diploma_nft);
    }

    /// Transfer a diploma NFT to another address
    public fun transfer_diploma(account: &signer, _recipient: address) acquires DiplomaNFT {
        let owner_address = signer::address_of(account);
        let diploma_nft = move_from<DiplomaNFT>(owner_address);

        // Transfer the diploma NFT to the recipient
        move_to(account, diploma_nft);
    }
}
