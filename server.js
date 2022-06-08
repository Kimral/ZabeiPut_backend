const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());

var config = {
        server: 'localhost',  
        authentication: {
            type: 'default',
            options: {
                userName: 'Admin321', 
                password: 'Admin321'  
            }
        },
        options: {
            encrypt: true,
            database: 'test'  
        }
    };


app.get('/points', (req, res) => {// SELECT * FROM Geo_Point
    var Connection = require('tedious').Connection;
    
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        //console.log("Connected");
        executeStatement();
    });

    connection.connect();

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    

    function executeStatement() {
        request = new Request("SELECT * FROM Geo_Point", function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = {
            Data : []
        }
        

        request.on('row', function (columns) {
            var data = {} 
            var number = 0
            columns.forEach(function (column) {
                number += 1
				if(number === 1){
					data["id"] = column.value
				}
				if(number === 2){
					data["name"] = column.value
				}
				if(number === 3){
				data["coordinate_1"] = column.value
				}
                if(number === 4){
                    data["coordinate_2"] = column.value
                    result["Data"].push(data)
				}   
            });
        });
       
        
        
        request.on("requestCompleted", function (rowCount, more) {
            res.json(result);
            console.log(rowCount + ' rows returned');
            connection.close();
        });
        connection.execSql(request);
       
    }
   
})
app.get('/points_data', (req, res) => {// SELECT * FROM PointData

    var Connection = require('tedious').Connection;
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        //console.log("Connected");
        executeStatement();
    });

    connection.connect();

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    

    function executeStatement() {
        request = new Request("SELECT * FROM PointData", function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = {
            Data : []
        }
        

        request.on('row', function (columns) {
            var data = {} 
            var number = 0
            columns.forEach(function (column) {
                number += 1
                if(number === 1){
                    data["id"] = column.value
                }
                if(number === 2){
                    data["name"] = column.value
                }
                if(number === 3){
                    data["Info"] = column.value
				}
                if(number === 4){
					data["Schedule"] = column.value
				}	
				if(number === 5){
					data["History"] = column.value
				}
				if(number === 6){
					data["Foundation"] = column.value
				}
				if(number === 7){
					data["Price"] = column.value
					result["Data"].push(data)
				}
								
                
            });
        });
       
        
        
        request.on("requestCompleted", function (rowCount, more) {
            res.json(result);
            connection.close();
        });
        connection.execSql(request);
       
    }
   
})
app.get('/public_route/name/:name', (req, res) => { // "SELECT * FROM PublicRoute where name = @name"
	console.log('/public_route')
	console.log('name = ' + req.params.name)
    var Connection = require('tedious').Connection;
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        //console.log("Connected");
        executeStatement();
    });

    connection.connect();

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    

    function executeStatement() {
        request = new Request("SELECT * FROM PublicRoute where name = @name", function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = {
            Data : []
        }
        request.addParameter('name', TYPES.VarChar, req.params.name);

        request.on('row', function (columns) {
            var data = {} 
            var number = 0
            columns.forEach(function (column) {
                number += 1
                if(number === 1){
                    data["name"] = column.value
                }
                if(number === 2){
                    data["Route"] = column.value
					result["Data"].push(data)
                }
              
            });
        });
       
        
        
        request.on("requestCompleted", function (rowCount, more) {
            res.json(result);
			
            connection.close();
        });
        connection.execSql(request);
       console.log('Complete')
    }
   
})
app.get('/public_route', (req, res) => { // SELECT * FROM PublicRoute

	console.log('/public_route')
    var Connection = require('tedious').Connection;
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        //console.log("Connected");
        executeStatement();
    });

    connection.connect();

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    

    function executeStatement() {
        request = new Request("SELECT * FROM PublicRoute", function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = {
            Data : []
        }
        

        request.on('row', function (columns) {
            var data = {} 
            var number = 0
            columns.forEach(function (column) {
                number += 1
                if(number === 1){
                    data["name"] = column.value
                }
                if(number === 2){
                    data["Route"] = column.value
					result["Data"].push(data)
                }
              
            });
        });
       
        
        
        request.on("requestCompleted", function (rowCount, more) {
            res.json(result);
            connection.close();
        });
        connection.execSql(request);
       console.log('complete')
    }
   
})
app.get('/login/:phone/:password', (req, res) => { //проверка авторизации SELECT id FROM Author where Phone = @Phone and Password = @Password
    console.log('/login')
	var Connection = require('tedious').Connection;
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        //console.log("Connected");
        executeStatement();
    });

    connection.connect();

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    

    function executeStatement() {
		request = new Request("SELECT id FROM Author where Phone = @Phone and Password = @Password" , function (err) {
			if (err) {
				console.log(err);
			}
        });
		
        request.addParameter('Phone', TYPES.VarChar, req.params.phone);
		request.addParameter('Password', TYPES.VarChar, req.params.password);
		var result = {
            Data : []
        }
        request.on('row', function (columns) {
		console.log('Complete')
		result["Data"].push(true) 
        });
       
        
        
        request.on("requestCompleted", function (rowCount, more) {
            res.json(result);
            console.log(rowCount + ' rows returned');
            connection.close();
        });
        connection.execSql(request);
    }
   
})
app.post('/registration/:phone/:password', (req, res) => { //Регистрация INSERT Author (Phone, Password) VALUES (@Phone, @Password)

    console.log('/registration')
	var Connection = require('tedious').Connection;
    var connection = new Connection(config);
	
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        //console.log("Connected");
        executeStatement();
    });
    connection.connect();
	
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
	
	function executeStatement() {
		request = new Request("INSERT Author (Phone, Password) VALUES (@Phone, @Password)" , function (err) {
			if (err) {
			console.log(err);
			}
		});	
		request.addParameter('Phone', TYPES.VarChar, req.params.phone);
		request.addParameter('Password', TYPES.VarChar, req.params.password);
		var result = {
            Data : ["Complete"]
        }
		request.on("requestCompleted", function (rowCount, more) {
			res.json(result)
			console.log(rowCount + ' rows returned');
            connection.close();
        });
		
		connection.execSql(request);
		console.log('Complete')
	}
        
})
app.get('/public_route/route/:route', (req, res) => { // "SELECT * FROM PublicRoute where name = @name"
	console.log('/public_route')
	console.log('Route = ' + req.params.route)
    var Connection = require('tedious').Connection;
    var connection = new Connection(config);
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        //console.log("Connected");
        executeStatement();
    });

    connection.connect();

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    

    function executeStatement() {
	request = new Request("SELECT * FROM PublicRoute where Route LIKE @Route ", function (err) {
            if (err) {
                console.log(err);
            }
        });
        var result = {
            Data : []
        }
        request.addParameter('Route', TYPES.Text,'%' + req.params.route + '%');

        request.on('row', function (columns) {
			var data = {} 
            var number = 0
            columns.forEach(function (column) {
                number += 1
                if(number === 1){
                    data["name"] = column.value
                }
                if(number === 2){
                    data["Route"] = column.value
					result["Data"].push(data)
                }
              
            });
        });
       
        
        
        request.on("requestCompleted", function (rowCount, more) {
            res.json(result);
			
            connection.close();
        });
        connection.execSql(request);
       console.log('Complete')
    }
   
})
 
var server = app.listen(8080, function () {
    var host = "0.0.0.0" 
    var port = server.address().port

    console.log("сервер доступен по url http://%s:%s", host, port)
});