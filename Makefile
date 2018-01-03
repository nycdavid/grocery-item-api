db:
	docker run \
	-d \
	-p 27017:27017 \
	--rm \
	--name grocery-item-api-db mongo:3.6.1
