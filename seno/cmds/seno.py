from io import TextIOWrapper
import click

from seno import __version__
from seno.cmds.beta import beta_cmd
from seno.cmds.configure import configure_cmd
from seno.cmds.farm import farm_cmd
from seno.cmds.data import data_cmd
from seno.cmds.init import init_cmd
from seno.cmds.keys import keys_cmd
from seno.cmds.netspace import netspace_cmd
from seno.cmds.passphrase import passphrase_cmd
from seno.cmds.peer import peer_cmd
from seno.cmds.plots import plots_cmd
from seno.cmds.rpc import rpc_cmd
from seno.cmds.show import show_cmd
from seno.cmds.start import start_cmd
from seno.cmds.stop import stop_cmd
from seno.cmds.wallet import wallet_cmd
from seno.cmds.plotnft import plotnft_cmd
from seno.cmds.plotters import plotters_cmd
from seno.cmds.db import db_cmd
from seno.util.default_root import DEFAULT_KEYS_ROOT_PATH, DEFAULT_ROOT_PATH
from seno.util.errors import KeychainCurrentPassphraseIsInvalid
from seno.util.keychain import (
    Keychain,
    set_keys_root_path,
)
from seno.util.ssl_check import check_ssl
from typing import Optional

CONTEXT_SETTINGS = dict(help_option_names=["-h", "--help"])


@click.group(
    help=f"\n  Manage seno blockchain infrastructure ({__version__})\n",
    epilog="Try 'seno start node', 'seno netspace -d 192', or 'seno show -s'",
    context_settings=CONTEXT_SETTINGS,
)
@click.option("--root-path", default=DEFAULT_ROOT_PATH, help="Config file root", type=click.Path(), show_default=True)
@click.option(
    "--keys-root-path", default=DEFAULT_KEYS_ROOT_PATH, help="Keyring file root", type=click.Path(), show_default=True
)
@click.option("--passphrase-file", type=click.File("r"), help="File or descriptor to read the keyring passphrase from")
@click.option(
    "--force-legacy-keyring-migration/--no-force-legacy-keyring-migration",
    default=True,
    help="Force legacy keyring migration. Legacy keyring support will be removed in an upcoming version!",
)
@click.pass_context
def cli(
    ctx: click.Context,
    root_path: str,
    keys_root_path: Optional[str] = None,
    passphrase_file: Optional[TextIOWrapper] = None,
    force_legacy_keyring_migration: bool = True,
) -> None:
    from pathlib import Path

    ctx.ensure_object(dict)
    ctx.obj["root_path"] = Path(root_path)
    ctx.obj["force_legacy_keyring_migration"] = force_legacy_keyring_migration

    # keys_root_path and passphrase_file will be None if the passphrase options have been
    # scrubbed from the CLI options
    if keys_root_path is not None:
        set_keys_root_path(Path(keys_root_path))

    if passphrase_file is not None:
        from seno.cmds.passphrase_funcs import cache_passphrase, read_passphrase_from_file
        from sys import exit

        try:
            passphrase = read_passphrase_from_file(passphrase_file)
            if Keychain.master_passphrase_is_valid(passphrase):
                cache_passphrase(passphrase)
            else:
                raise KeychainCurrentPassphraseIsInvalid()
        except KeychainCurrentPassphraseIsInvalid:
            if Path(passphrase_file.name).is_file():
                print(f'Invalid passphrase found in "{passphrase_file.name}"')
            else:
                print("Invalid passphrase")
            exit(1)
        except Exception as e:
            print(f"Failed to read passphrase: {e}")

    check_ssl(Path(root_path))


@cli.command("version", short_help="Show seno version")
def version_cmd() -> None:
    print(__version__)


@cli.command("run_daemon", short_help="Runs seno daemon")
@click.option(
    "--wait-for-unlock",
    help="If the keyring is passphrase-protected, the daemon will wait for an unlock command before accessing keys",
    default=False,
    is_flag=True,
    hidden=True,  # --wait-for-unlock is only set when launched by seno start <service>
)
@click.pass_context
def run_daemon_cmd(ctx: click.Context, wait_for_unlock: bool) -> None:
    import asyncio
    from seno.daemon.server import async_run_daemon
    from seno.util.keychain import Keychain

    wait_for_unlock = wait_for_unlock and Keychain.is_keyring_locked()

    asyncio.run(async_run_daemon(ctx.obj["root_path"], wait_for_unlock=wait_for_unlock))


cli.add_command(keys_cmd)
cli.add_command(plots_cmd)
cli.add_command(wallet_cmd)
cli.add_command(plotnft_cmd)
cli.add_command(configure_cmd)
cli.add_command(init_cmd)
cli.add_command(rpc_cmd)
cli.add_command(show_cmd)
cli.add_command(start_cmd)
cli.add_command(stop_cmd)
cli.add_command(netspace_cmd)
cli.add_command(farm_cmd)
cli.add_command(plotters_cmd)
cli.add_command(db_cmd)
cli.add_command(peer_cmd)
cli.add_command(data_cmd)
cli.add_command(passphrase_cmd)
cli.add_command(beta_cmd)


def main() -> None:
    cli()  # pylint: disable=no-value-for-parameter


if __name__ == "__main__":
    main()
