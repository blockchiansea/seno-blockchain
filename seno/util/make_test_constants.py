from __future__ import annotations

from typing import Dict

from seno.consensus.constants import ConsensusConstants
from seno.consensus.default_constants import DEFAULT_CONSTANTS


def make_test_constants(test_constants_overrides: Dict) -> ConsensusConstants:
    return DEFAULT_CONSTANTS.replace(**test_constants_overrides)
