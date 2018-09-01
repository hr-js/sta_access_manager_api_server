# sta_access_manager_api_server

Raspberry Pi × node.js × IC カードリーダーで入退室管理システム開発 の API サーバ

## 開発時

1. 以下のコマンドを実行し、elastcisearch を docker コンテナで起動する。

```shell
docker-compose -f docker-compose.dev.yml up
```

2. 以下のコマンドを実行し、SAM を起動する

```shell
yarn dev:http
```

## 本番用

1. 以下のコマンドを実行し、SAM + elasticsearch を docker コンテナで起動する。

```shell
docker-compose up  
```