## MongoDB commands

```sql

	show dbs
	/* shows installed databases */
	
	db
	/* current database */

	use database_name
	/* create a database */

```

**CREATING DATA FOR THE DATABASE**

```javascript

	/* database_name > */ daniel = {
		"name": "Daniel",
		"position": "Programmer",
		"email": "daniel.hoksza@gmail.com",
		"hiredate": new Date()
	}
```

**INSERTING DATA INTO DATABASE CALLED database_name**

```sql

	/* database_name > */ db.database_name.insert(daniel)
```

**FINDING DATA IN THE DATABASE**

```sql

	/* these print out existing data into the console */
	db.database_name.find()
	db.database_name.find().pretty() /* nicer */
	db.database_name.find({"name": "Daniel"})

	/* what values I want to return based on my query; use 0 to exclude from search */
	db.database_name.find({"state": "WA", "sex": "M"}, {"name": 1, "dob":1}).pretty()

	/* greater than & less than */
	db.database_name.find({"gpa": {"$gte": 3.0, "$lte": 3.5}}, {"name": 1, "gpa": 1, "_id": 0})

	/* finding a query based on date */
	year1969 = new Date("01/01/1969")
	db.testdb.find({"dob": {"$gte": year1969}}, {"name": 1, "dob": 1, "_id": 0}).pretty()

	/* find things not equal to; use $not for does not meet the condition */
	db.database_name.find({"sex": {"$ne": "M"}, "status": "student"}, {"name": 1, "_id": 0})

	/* looking for equivalents; use "$nin" for except for */
	db.database_name.find({"gpa": {"$in": [3.4, 3.5, 3.6, 3.7]}}, {"name": 1, "gpa": 1, "_id": 0})

	/* or searches */
	db.testdb.find({"$or": [{"status": "dropout"}, {"gpa": {"lt": 3.0}}]}, {"name": 1, "gpa": 1, "_id": 0})

	/* REGEX */
	db.testdb.find({"name": /^D.*$/}).pretty()

	/* an array that contains required values */
	db.testdb.find({"tests": {$all: [0, 10]}}, {"name": 1, "_id": 0})

	/* who got result 10 on their first test */
	db.testdb.find({"tests.0": 10}, {"name": 1, "_id": 0})

	/* search based on the size of an array/ number of tests taken */
	db.testdb.find({"tests": {"$size": 4}})

	/* we want to get results just from the first two tests; use -2 to see last 2 tests; use [1,2] to get second and third */
	db.testdb.find({"name": "Dale Cooper"}, {"tests": {"$slice": 2}}, {"tests": 1, "name": 1, "_id": 0})

	/* serching for nested info like contacts */
	db.testdb.find({"name": "Dale Cooper"}, {"name": 1, "contact info.email": 1, "_id: 0"})
```



**UPDATING DATA IN THE DATABASE**

```sql

	daniel.references = [] /* this adds an array called references */
	db.database_name.update({"name": "Daniel"}, daniel)
	db.database_name.update({"name": "Daniel"}, {"$set": {"name": "LeDaniel", "surname": "Zedani"}})

	/* updating multiple values at once */
	db.database_name.update({"name": "Daniel"}, {"$set": {"name": "LeDaniel", "surname": "Zedani", "age": 28}}, {multi:true})

	/* incrementing value */
	db.database_name.update({"name": "LeDaniel"}, {"$inc": {"age": 1}}) 
	/* use -1 to decrement */
	/* use $mul for multiplication */

	/* use $push for additional information */
	db.database_name.update({"name": "Daniel"}, {"$push": {"Records": {"goals 1 season": 10, "goals all seasons": 30}}})
	db.database_name.update({"name": "Daniel"}, {"$push": {"Assists years": {"$each": [20, 39, 23, 33, 22], "$slice": -5}}})

	/* adding value if it does not exists */
	db.database_name.update({"name": "Daniel"}, {"$addToSet": {"Assists years": 33}})

	/* remove from the end of the array */
	db.database_name.update({"name": "Daniel"}, {"$pop": {"Assists years": 1}})	/* to remove from the begining use -1 */ 
	/* use $pull to remove particular item by adding specific existing value to the key */

	/* pushing new result to tests array */
	db.testdb.update({"name": "Dale Cooper"}, {"$push": {"tests": 9}})
```

**UPDATING MULTIPLE DOCUMENTS**

```sql

	
```

**DELETING INFORMATION**
```sql

	db.database_name.remove({"name": "Daniel"})

	/* remove everything from the database */
	db.database_name.drop()
```

+ WE CAN STORE
	+ strings
	+ numbers, no quotes
	+ booleans, no quotes
	+ null, no quotes
	+ arrays, all kinds of data can be in arrays, no quotes
	+ methods like "hiredate": new Date()
	+ REGEX

use "help" to see all the available commands
we could use "date": new Date(1988, 2, 15)
use .limit(3) to limit the number of results
use .skip(3) -> skip first three
use .sort({"name": 1}) to sort by name
use .dropDatabase() to drop the database itself, not just the data

### INDEXING

+ creating an index for a database is like crearting an index for a book

```sql

	for(i = 0; i < 50000; i++) {
		db.testdb.insert({
			"account": "account" + i,
			"age": Math.floor(Math.random() * 90)
		});
	}

	/* how long this query took? */
	db.testdb.find({
		"age": 50
	}).explain("executionStats")

	db.testdb.ensureIndex({"age" : 1, "account" : 1})
	db.testdb.ensureIndex({"account": 1}, {"unique": true, "dropdups": true}) /* drpudups eliminates duplicates */
	db.testdb.ensureIndex({"account": 1}, {"unique": true, "sparse": true}) /* sparse eliminates null values */

	/* this creates a new index and improves speed of the query, because it does not search for all 50000 documents but only for those, that contain "age": 50 and ignore everything else */

	db.testdb.dropIndex("index_name")
	
```

### AGREGATION
 
 ```sql

	db.testdb.aggregate([{"$group": {"_id": "$author", num_recipes: {$sum : "}}}, {"$sort": {"num_likes": -1}}])
	/* lists all the authors and the number of recipes they contributed */
	/* use $avg instead of $sum to get average */

	db.testdb.aggregate([{$match : {"type": "latin"}}, {$group : {_id: "$author", num_recipes: {$sum : 1}}}])

	/* $project can provide fields from subdocuments and it also allows for renaming fields. */
	db.testdb.aggregate({"$project": {"Recipe": "$recipe", "_id": 0}})

	/* strong impressions made out of $likes and $dislikes */
	db.testdb.aggregate({"$project": {"Strong Impressions": {"$add": ["$likes", "$dislikes"]}, "_id": 0}}) /* use $substract for the oposite, also $multiply and $divide */

 ```

**Extracting information**

+ date
	+ month
	+ year
	+ week
	+ dayOfMonth
	+ dayOfWeek
	+ dayOfYear

```sql

	db.testdb.aggregate({"$project": {"Month Posted": {"$month": "$datePosted"}, "recipe": 1, "_id": 0}})
```

**String operations**

```sql

	db.testdb.aggregate({"$project": {"Type": {"$substr": ["$type", 0, 3]}, "_id": 0})

	/* $concat */
	db.testdb.aggregate({
		"$project": {
			"Title": {
				"$concat": [
					{ $toUpper: "$recipe" },
					" by ",
					"$author"
				]
			}, "_id": 0
		}
	})

	/* if statements */

	db.testdb.aggregate({
		"$project": {
			"Score": {
				"$cond": {
					if: {
						$gte : ["$likes", 200]
					}, then: "Great", else: "OK"
				}
			}, "recipe": 1, "_id": 0
		}
	})

	/* compare to a value */
	db.testdb.aggregate({
		"$project": {
			"Compare to 200": {
				$cmp: ["$likes", 200]
			}, "recipe": 1, "_id": 0
		}
	})
```

### Classes

```sql

	db.classes.insert({
		class: "Philosophy 101",
		startDate: new Date(2016, 1, 10),
		students: [
			{
				fName: "Dale", lName: "Cooper", age: 42
			}, {
				fName: "Lucy", lName: "Moran", age: 35
			}, {
				fName: "Tommy", lName: "Hill", age: 44
			}
		],
		cost: 1600,
		professor: "Paul Slugman",
	})
```