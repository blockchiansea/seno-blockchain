import { WalletType } from '@seno/api';
import type { Wallet } from '@seno/api';

export default function getWalletPrimaryTitle(wallet: Wallet): string {
  switch (wallet.type) {
    case WalletType.STANDARD_WALLET:
      return 'Seno';
    default:
      return wallet.meta?.name ?? wallet.name;
  }
}
