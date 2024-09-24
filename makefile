start:
	@docker compose up -d --build 

init_web:
	@docker compose run --rm web bash -c 'yarn install'

migrate: 
	@docker compose exec python bash -c 'alembic upgrade head'