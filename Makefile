# Makefile for docker-compose commands

# ビルド
build:
	docker-compose build

# localhost:8080 が起動しているか確認して待つ
wait-for-it:
	@echo "Waiting for localhost:8080 to be ready..."
	@while ! curl -s http://localhost:8080 > /dev/null; do sleep 1; done

# 起動と初期データの流し込み
up:
	docker-compose up -d
	make wait-for-it
	npm run hasura:deploy

# 初期データの流し込み
seed:
	npm run hasura:deploy

# 停止
down:
	docker-compose down

# 再ビルドと初期データの流し込み
rebuild: down build up

# 全てのDockerコンテナとボリュームを削除
clean: down
	docker system prune -a --volumes
