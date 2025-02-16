import { WalletType } from '@seno/api';

type Coin = {
  confirmed_block_index: number;
  spent_block_index: number;
  spent: boolean;
  coinbase: boolean;
  wallet_type: WalletType;
  wallet_id: number;
  parent_coin_info: string;
};

export default Coin;
