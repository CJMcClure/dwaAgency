# API Documentation

## Table of Contents
* [GET User](#one)
* [POST User](#two)
* [GET User with Character](#three)
* [POST Match data](#four)

<a name="one"></a>
## GET User

Returns json data about a single user and its stats.

* **URL**

	/v1/user/:id

* **Method**

	`GET`

* **URL Params**
	
	**Required:**<br>
	`id=[integer]`

* **Data Params**

	None

* **Success Response**
	* **Content**: <br>
	
	```shell
	({
		id: 2,
		username: "EmilyPrime",
		healing: 1256,
		damage: 7354,
		wins: 20,
		losses: 16
	})
	```	

<a name="two"></a>
## POST User

Adds a new user to the database and returns json of new user. 

* **URL**

	/v1/user

* **Method**

	`POST`

* **URL Params**
	
	none

* **Data Params**

	`name= [STRING]`

* **Success Response**
	* **Content**: <br>
	
	```shell
	({
		id: 2,
		username: "EmilyPrime"
	})
	```	
	
<a name="three"></a>
## GET User Stats for a Character

Returns json of 

* **URL**

	/v1/character/:uid/:cid
	
	>uid = userId, cid = characterId

* **Method**

	`GET`

* **URL Params**
	
	**Required:**<br>
	`uid=[integer]`<br>
	`cid=[integer]`

* **Data Params**

	none

* **Success Response**
	* **Content**: <br>
	
	```shell
	({
		"UserId":"1",
		"Username":"Bailey",
		"CharacterId":"1",
		"CharacterName":"Reinhardt",
		"damage":2000,
		"healing":1000,
		"wins":2,
		"losses":0
	})
	```		

<a name="four"></a>
## POST Stats

Adds match data to 

* **URL**

	/v1/stats

* **Method**

	`POST`

* **URL Params**
	
	none

* **Data Params**

	```shell
	'character': characterId [integer],
	'user': userId [integer],
	'result': 0 [loss] or 1 [win], 
	'damage': [integer], 
	'healing': [integer], 
	'secret': [string]
	```

* **Success Response**
	* **Content**: <br>
	
	```shell
	({
		"msg":"Match Added Successfully"
	})
	```	
