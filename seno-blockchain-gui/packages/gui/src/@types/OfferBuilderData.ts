type OfferBuilderData = {
  offered: {
    xse: {
      amount: string;
    }[];
    tokens: {
      amount: string;
      assetId: string;
    }[];
    nfts: {
      nftId: string;
    }[];
    fee: {
      amount: string;
    }[];
  };
  requested: {
    xse: {
      amount: string;
    }[];
    tokens: {
      amount: string;
      assetId: string;
    }[];
    nfts: {
      nftId: string;
    }[];
    fee: {
      amount: string;
    }[];
  };
};

export default OfferBuilderData;
