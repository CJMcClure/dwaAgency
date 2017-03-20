# Deployment of DWA-GAME-API

Four Step Deployment Pipeline,

1. Github [https://github.com/criticalfault/dwaAgency.git]
1. Testing Server (CodeShip)
1. Staging Server (Droplet on Digital Ocean) [45.55.207.227]
1. Production Server (Droplet on Digital Ocean) [104.236.195.240]

![pipeline diagram](http://i.imgur.com/U9MDFyd.png)

## Github

* Our Github Repository has been configured to push automatically to CodeShip for tests whenever any branch is pushed up to it.
* CodeShip is linked and reports to Github any successes or passes

## CodeShip

* When prerelease is merged, pushed, etc it will go to the Staging Server upon successful Test
* When Master is merged, pushed, etc it will go to the Production Server upon successful Test
* Testing is done on each Route file to ensure its intregedy of the code in the repo as code continues to be merged and added!

## Staging Server

* This is a complete replication of the Production Server. It's primary use case is to ensure that when code hits the actual server environment, nothing unforseen takes the project down.
* Server has the full setup of the

## Production Server

* Final Stop on Deployment Pipeline. This is where the customer can reach out and finally touch the project.

## Versioning with Gulp
If you would like to use Gulp to speed up versioning in your deployment pipeline you can follow the 2 quick steps below.

* From the root of your local project run the command below to install all the neccesary packages to run the tasks in the included `gulpfile.js` file. You need to install these locally because they are specifically dev dependencies.

```shell
npm install gulp gulp-git git-rev yargs --save-dev
```

* Now you will be able to quickly semantically version your repo with the command below

```shell
gulp version --i [arg]
``` 

* You can fill in `[arg]` with one of 3 arguments:
	* p - reserved for _patch_ fixes. These should be quick fixes that dont 	  effect other parts of the project.
	* m - reserved for _minor_ fixes. These should be limited to fixes, 	  updates, and new features that don't interfere with the other features of 	  the project. 
	* M - reserved for _major_ fixes. This should only be used for major project 	  releases that interfere with or completely change the way that old 	  features function.


You've successfully deployed your feature!
