# Sensei Sensor Server
Sensei Sensorのサーバー

## Setup

### 環境

- Windows 10

- VMware Workstation 16 Player

	- Ubuntu Server 20.04.1 LTS

	- CPU:  2Core

	- MEM:  4GB

	- Disk: 20GB

- Node.js 14.15.1

- yarn 1.22.5



### インストール

1. [Ubuntuの公式サイト](https://ubuntu.com/download/server)からisoをダウンロードする

1. VMwareで 2コア、4GB、ディスク20GB の仮想マシンを作る

1. isoはダウンロードしたものを選択

1. 仮想マシンを起動して、次へを押していく

	1. ネットワークはとりあえずDHCPで大丈夫

### 初期設定

1. とりあえずアップデート

```
$ sudo apt update
$ sudo apt upgrade
```

2. Node.jsのインストール

[参考](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions)

```
$ sudo apt-get install gcc g++ make
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

3. yarnのインストール

```
$ curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt-get update && sudo apt-get install yarn
```