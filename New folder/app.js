/**
 * Created by Dell-Pc on 9/29/2016.
 */

module.exports= {

    appJS:function(){

        var mysql = require('mysql'); //import mysql libaray
        var fbpost = require('./fbPostTest');

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
                console.log("error connect");
                return;
            }
            console.log("connected");
        });
        /********get system date and month***********/
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        console.log(month + "-" + day);

        /*********querying and getiing data***********/

        var qstring = "SELECT user_name FROM user_details WHERE user_DOB  LIKE '%" + month + "-" + day + "'";
//var qstring="SELECT * FROM user_details";
        con.query(qstring, function (err, rows) {
            if (err)throw err;

            /*console.log("Sender List");

            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i]["user_name"] + " : " + rows[i]["user_email"]);
            }*/

            //set access token manuallay to access variable

            var access      ='EAACEdEose0cBAN6smSBP6g3I72o2ORazj4K9uKq6ZCgKKLjBdKdzkSfg58fRa33h1frEFYnUKNIZAzRnmvGpQAZATN9aLQf61GIMHshOrKWXzI0218pdiWEcS68F0ZCtKpRano8S2QigJrQyoSNrJMsfr1709ij3nsEmgkdOxwZDZD';
            var access_token='EAACEdEose0cBAGA3OoRw9CX8izjyeJjyUQTu5Q0ZAZBpAxYFH9EUBcFIMljIsjyKPqI8Fqz1AcVMsJMb7ukxZAlMBprwklFOS3YEoODfjg4ZC7DvXZAHvXWJHZC6vcFnZCSobw11YZC4cwrDwZAZCIPFxCDBpcGViVukNklNaGkymrvwZDZD';
            
            fbpost.postFunction(rows,access);


        });


        /****terminate connection***********/

        con.end(function (err) {
            //console.log(err);
        });

    }

}