import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface NFT {
  'owner' : Principal,
  'metadata' : string,
  'price' : bigint,
}
export interface _SERVICE {
  'getListedNFTs' : ActorMethod<[], Array<[bigint, NFT]>>,
  'listNFT' : ActorMethod<[bigint, bigint], boolean>,
  'mintNFT' : ActorMethod<[string], bigint>,
  'purchaseNFT' : ActorMethod<[bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
