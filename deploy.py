#!/usr/bin/env python3
"""
LNL Groups — VPS Deploy Script
Usage: python deploy.py [--dry-run]

Builds the lnlgroups site locally, ships dist/ to the VPS, and restarts PM2.
Requires: npm, node, OpenSSH (Windows path set below)
"""

import subprocess, sys, os, tarfile, tempfile, shutil

# ── Config ────────────────────────────────────────────────────────────────────
VPS_HOST    = "root@72.62.170.65"
VPS_APP_DIR = "/root/lnlgroups"
PM2_APP     = "lnlgroups"
LOCAL_APP   = os.path.join(os.path.dirname(__file__), "lnlgroups")
SSH_BIN     = r"C:\Windows\System32\OpenSSH\ssh.exe"
SCP_BIN     = r"C:\Windows\System32\OpenSSH\scp.exe"
SSH_OPTS    = ["-o", "StrictHostKeyChecking=no", "-o", "ConnectTimeout=15"]
# ──────────────────────────────────────────────────────────────────────────────

DRY_RUN = "--dry-run" in sys.argv

def run(cmd, cwd=None, check=True):
    label = " ".join(str(c) for c in cmd)
    print(f"  $ {label}")
    if DRY_RUN:
        return
    result = subprocess.run(cmd, cwd=cwd, check=check, text=True)
    return result

def ssh(remote_cmd):
    return run([SSH_BIN] + SSH_OPTS + [VPS_HOST, remote_cmd])

def step(msg):
    print(f"\n{'-'*60}\n{msg}\n{'-'*60}")


def main():
    if DRY_RUN:
        print("DRY RUN — no changes will be made\n")

    # 1. Build
    step("1/4  Build")
    run(["npm", "run", "build"], cwd=LOCAL_APP)

    dist_dir = os.path.join(LOCAL_APP, "dist")
    if not os.path.exists(dist_dir):
        print("ERROR: dist/ not found after build. Aborting.")
        sys.exit(1)

    # 2. Package
    step("2/4  Package dist/")
    tmp = tempfile.mkdtemp()
    tarball = os.path.join(tmp, "dist.tar.gz")
    try:
        if not DRY_RUN:
            with tarfile.open(tarball, "w:gz") as tar:
                tar.add(dist_dir, arcname="dist")
            size_kb = os.path.getsize(tarball) // 1024
            print(f"  Packed: {tarball}  ({size_kb} KB)")
        else:
            print(f"  Would pack {dist_dir} -> dist.tar.gz")

        # 3. Upload
        step("3/4  Upload to VPS")
        run([SCP_BIN] + SSH_OPTS + [tarball, f"{VPS_HOST}:/tmp/dist.tar.gz"])

        # 4. Extract + restart
        step("4/4  Extract + restart PM2")
        ssh(
            f"cd {VPS_APP_DIR} && "
            f"rm -rf dist.bak && "
            f"cp -r dist dist.bak && "           # quick rollback backup
            f"tar -xzf /tmp/dist.tar.gz && "
            f"rm /tmp/dist.tar.gz && "
            f"pm2 restart {PM2_APP} --update-env && "
            f"pm2 save && "
            f"echo 'Deploy complete. App status:' && "
            f"pm2 show {PM2_APP} | grep -E 'status|uptime|restart'"
        )

        print("\nDone.\n")

    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
