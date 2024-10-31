COMPOSE = docker compose
CONTAINER = docker container
C_BACK = w3hetic-express-1
C_FRONT = w3hetic-react-1
C_BDD = w3hetic-database-1
EXEC = docker exec -it


#####################
#	Base Docker cmd	#
#####################

stop:
	${COMPOSE} stop

up:
	${COMPOSE} up -d
	echo "Express on port 8090 \n React on port 3001"

build:
	${COMPOSE} up --build -d

down:
	${COMPOSE} down

ps:
	${COMPOSE} ps

prune:
	docker compose down --rmi all --volumes
	docker volume prune -f
	docker system prune -a

co_back:
	${EXEC} $(C_BACK) bash

co_front:
	${EXEC} $(C_FRONT) bash

co_bdd:
	${EXEC} $(C_BDD) bash

#################
#	Docker logs	#
#################

blogs:
	${CONTAINER} logs -f ${C_BACK}

flogs:
	${CONTAINER} logs -f ${C_FRONT}

bdlogs:
	${CONTAINER} logs -f ${C_BDD}