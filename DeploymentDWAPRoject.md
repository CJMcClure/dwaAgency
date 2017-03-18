#Deployment of DWA-GAME-API

Four Step Deployment Pipeline, 

1. Github [https://github.com/criticalfault/dwaAgency.git]
1. Testing Server (CodeShip)
1. Staging Server (Droplet on Digital Ocean) [45.55.207.227]
1. Production Server (Droplet on Digital Ocean) [104.236.195.240]

```
		[Local Development] -> [Github]
					              |
							  [CodeShip]
							  /        \
			     Release Branch        Master Branch
				      / 					\
		   [Staging Server]          [Production Server]
```

##Github
* Our Github Repository has been configured to push automatically to CodeShip for tests whenever any branch is pushed up to it.
* CodeShip is linked and reports to Github any successes or passes

##CodeShip
* When prerelease is merged, pushed, etc it will go to the Staging Server upon successful Test
* When Master is merged, pushed, etc it will go to the Production Server upon successful Test
* Testing is done on each Route file to ensure its intregedy of the code in the repo as code continues to be merged and added!

##Staging Server

* This is a complete replication of the Production Server. It's primary use case is to ensure that when code hits the actual server environment, nothing unforseen takes the project down.
* Server has the full setup of the 

##Production Server
* Final Stop on Deployment Pipeline. This is where the customer can reach out and finally touch the project.
