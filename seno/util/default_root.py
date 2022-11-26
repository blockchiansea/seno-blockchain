from __future__ import annotations

import os
from pathlib import Path

DEFAULT_ROOT_PATH = Path(os.path.expanduser(os.getenv("SENO_ROOT", "~/.seno/mainnet"))).resolve()

DEFAULT_KEYS_ROOT_PATH = Path(os.path.expanduser(os.getenv("SENO_KEYS_ROOT", "~/.seno_keys"))).resolve()
