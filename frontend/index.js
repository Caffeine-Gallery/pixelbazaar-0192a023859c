import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const mintForm = document.getElementById('mint-form');
    const listForm = document.getElementById('list-form');
    const nftList = document.getElementById('nft-list');

    mintForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const metadata = document.getElementById('nft-metadata').value;
        try {
            const tokenId = await backend.mintNFT(metadata);
            alert(`NFT minted with ID: ${tokenId}`);
        } catch (error) {
            console.error('Error minting NFT:', error);
        }
    });

    listForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tokenId = parseInt(document.getElementById('nft-id').value);
        const price = parseInt(document.getElementById('nft-price').value);
        try {
            const result = await backend.listNFT(tokenId, price);
            if (result) {
                alert('NFT listed successfully');
                updateNFTList();
            } else {
                alert('Failed to list NFT');
            }
        } catch (error) {
            console.error('Error listing NFT:', error);
        }
    });

    async function updateNFTList() {
        try {
            const listedNFTs = await backend.getListedNFTs();
            nftList.innerHTML = '';
            listedNFTs.forEach(([id, nft]) => {
                const nftElement = document.createElement('div');
                nftElement.className = 'nft-item';
                nftElement.innerHTML = `
                    <p>ID: ${id}</p>
                    <p>Metadata: ${nft.metadata}</p>
                    <p>Price: ${nft.price}</p>
                    <button onclick="purchaseNFT(${id})">Purchase</button>
                `;
                nftList.appendChild(nftElement);
            });
        } catch (error) {
            console.error('Error updating NFT list:', error);
        }
    }

    window.purchaseNFT = async (tokenId) => {
        try {
            const result = await backend.purchaseNFT(tokenId);
            if (result) {
                alert('NFT purchased successfully');
                updateNFTList();
            } else {
                alert('Failed to purchase NFT');
            }
        } catch (error) {
            console.error('Error purchasing NFT:', error);
        }
    };

    updateNFTList();
});
