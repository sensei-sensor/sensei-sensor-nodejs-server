# Sensei Sensor Server

Sensei Sensor のサーバー

## Setup

### 環境

- Windows 10

- VMware Workstation 16 Player

  - Ubuntu 20.04.1 LTS

  - CPU: 2 コア

  - メモリー: 4GB

  - ハードディスク: 20GB

- Node.js 14.15.1

## VMへUbuntuのインストール

[参考](https://www.gsenjyounoai.com/2020/04/vmware-ubuntu-2004-lts.html)

1. [Ubuntu の公式サイト](https://jp.ubuntu.com/download)から iso をダウンロードする

1. VMware で 2 コア、4GB、ハードディスク 20GB の仮想マシンを作る

1. iso はダウンロードしたものを選択

1. 仮想マシンを起動する

1. Ubuntu の初期設定で日本語を選択

1. キーボードレイアウトは日本語で

1. 最小のインストールを選択

   1. アップデートの他にグラフィックスと Wi-Fi…にもチェックを入れる

1. ディスクを削除して Ubuntu をインストールを選択

1. どこに住んでいますか？ -> Tokyo

1. あなたの情報

   - あなたの名前: フルネーム

   - コンピュータの名前: vm

   - ユーザー名: 自由

   - パスワード: 自由

## 初期設定

1. プロキシの設定

- ブラウザを使う用

  設定 →

- apt とかのプロキシ

  [Proxy-Switcher-for-Ubuntu](https://github.com/nemuki-nok/Proxy-Switcher-for-Ubuntu)を使う

2. アップデート

```shell
$ sudo apt update
$ sudo apt upgrade
```

3. Node.js のインストール

[参考サイト](https://qiita.com/seibe/items/36cef7df85fe2cefa3ea)

```shell
$ sudo apt install -y nodejs npm
$ sudo npm install n -g
$ sudo n stable
$ sudo apt purge -y nodejs npm
$ exec $SHELL -l
```

4. MariaDB のインストール

```shell
$ curl -LsS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash
$ sudo apt-get install mariadb-server
```