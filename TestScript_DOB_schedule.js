

var schedule=require('node-schedule'); //node-schedule library
var mysql = require('mysql'); // mysql libaray

/*******schedule time*******/

var rule=new schedule.RecurrenceRule();
rule.hour=22;
rule.minute=5;
rule.second=0;

var task=schedule.scheduleJob(rule,function() {



    /********create connection**********/

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "msp1"
    });

    /****check connection**********/

    con.connect(function (err) {
        if (err) {
            console.log("connection error");
            return;
        }
        console.log("connected");
    });


    /********get system date and month***********/
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    //console.log(month + "-" + day);

    /*********querying and getting data***********/

    var qstring = "SELECT * FROM user_details WHERE user_DOB  LIKE '%" + month + "-" + day + "'";

    con.query(qstring, function (err, rows) {
        if (err)throw err;


        /****manipulate returned data********/
        /*
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i]["user_name"] + " : " + rows[i]["user_email"]);
        }
        */


    });


    /****terminate connection***********/

    con.end(function (err) {
        //console.log(err);
    });


});
