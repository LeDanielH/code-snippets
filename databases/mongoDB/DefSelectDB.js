var selectDB = function (port, dbName) {
	if(!port) {
		port = 27017;
	}

	if(!dbName) {
		dbName = 'database_name';
	}

	db = connect('localhost:' + port + '/' + dbName);

	return db;
};