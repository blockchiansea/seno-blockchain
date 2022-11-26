from typing import KeysView, Generator

SERVICES_FOR_GROUP = {
    "all": (
        "seno_harvester seno_timelord_launcher seno_timelord seno_farmer "
        "seno_full_node seno_wallet seno_data_layer seno_data_layer_http"
    ).split(),
    # TODO: should this be `data_layer`?
    "data": "seno_wallet seno_data_layer".split(),
    "data_layer_http": "seno_data_layer_http".split(),
    "node": "seno_full_node".split(),
    "harvester": "seno_harvester".split(),
    "farmer": "seno_harvester seno_farmer seno_full_node seno_wallet".split(),
    "farmer-no-wallet": "seno_harvester seno_farmer seno_full_node".split(),
    "farmer-only": "seno_farmer".split(),
    "timelord": "seno_timelord_launcher seno_timelord seno_full_node".split(),
    "timelord-only": "seno_timelord".split(),
    "timelord-launcher-only": "seno_timelord_launcher".split(),
    "wallet": "seno_wallet".split(),
    "introducer": "seno_introducer".split(),
    "simulator": "seno_full_node_simulator".split(),
    "crawler": "seno_crawler".split(),
    "seeder": "seno_crawler seno_seeder".split(),
    "seeder-only": "seno_seeder".split(),
}


def all_groups() -> KeysView[str]:
    return SERVICES_FOR_GROUP.keys()


def services_for_groups(groups) -> Generator[str, None, None]:
    for group in groups:
        for service in SERVICES_FOR_GROUP[group]:
            yield service


def validate_service(service: str) -> bool:
    return any(service in _ for _ in SERVICES_FOR_GROUP.values())
