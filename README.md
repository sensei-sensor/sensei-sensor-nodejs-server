# Sensei Sensor Server (Node.js)

Sensei Sensor のサーバー

## 構成

- Ubuntu Server 20.04
- Node.js 14.15.1
- Maria DB 10.5

## セットアップ

- リポジトリのセットアップ

```sh
$ git clone https://github.com/sensei-sensor/sensei-sensor-server.git
$ cd sensei-sensor-server
$ npm install
```

- `./.env`ファイルの追加

```env
DB_USER=
DB_PASSWORD=
DB_HOST=
```

## 開始

- 通常

```
$ npm start
```

- デーモン化

```
$ forever ./bin/www
```
