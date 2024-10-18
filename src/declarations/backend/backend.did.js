export const idlFactory = ({ IDL }) => {
  const NFT = IDL.Record({
    'owner' : IDL.Principal,
    'metadata' : IDL.Text,
    'price' : IDL.Nat,
  });
  return IDL.Service({
    'getListedNFTs' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, NFT))],
        ['query'],
      ),
    'listNFT' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
    'mintNFT' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'purchaseNFT' : IDL.Func([IDL.Nat], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
