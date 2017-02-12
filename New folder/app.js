

var FB= require('fb');

module.exports= {

    appJS:function(){

        var mysql = require('mysql'); //import mysql libaray
        var fbpost = require('./fbPostTest');
        var appdata=require('./config');

        /**** initial acces token - short live token/long live (60 days) token from graph api  ****/

        const accessToken='EAAE7mskkFsUBAK0UiEtqjZA3gIZBxV831sT2AzDfbLX9Wbfk0mIhdJhl0JiCBOZC3dZBpnO5iH1NLZAtuElP7V8hjneC3UbasTJbtrGwFnaxmqO5B6Rv2ZCbZAFY253CoRkyEHgipMmf38Rerualw9mOHTZBOt9SZBecZD';
        const pageName='Test1_page'


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
        console.log(date.getFullYear()+"-"+month + "-" + day);

        /*********querying and  data***********/

        var qstring = "SELECT user_name FROM user_details WHERE user_DOB  LIKE '%" + month + "-" + day + "'";

        con.query(qstring, function (err, userDetails) {
            if (err)throw err;

            /*console.log("Sender List");

            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i]["user_name"] + " : " + rows[i]["user_email"]);
            }*/

            //set access token manuallay to access variable




            var gettokenQuery='SELECT MAX(id),token FROM access_token';


            (function getAccessToken (userDetails) {

                /** getting previously used access token from db***/

                con.query(gettokenQuery, function (err, rows) {

                    /*** initial lookup for acesss-token in db if no token exist *****/

                    if (err || rows[0].token==null)
                    {
                        FB.setAccessToken(accessToken);

                        /***** access token renewal **/

                        FB.api("/oauth/access_token",{client_id: appdata.FaceBook.appID, client_secret: appdata.FaceBook.appSecret,grant_type:'fb_exchange_token',fb_exchange_token: accessToken},function(res) {
                            //console.log(res.access_token);


                            FB.setAccessToken(res.access_token);

                            /**** getting relevant page access token****/

                            FB.api("me/accounts",function(res){

                                for (key=0;key<res.data.length;key++) {

                                    if(res.data[key].name==pageName){
                                        fbpost.postFunction(userDetails,res.data[key].access_token);
                                    }

                                }

                            });


                            /**** insert new token to databasse *****/

                            var insertQuery="INSERT INTO access_token(token) VALUES('"+res.access_token+"')";
                            //var updateQuery="UPDATE access_token SET token='"+res.access_token+"' ORDER BY id DESC LIMIT 1";

                            con.query(insertQuery,function(err,rows){
                                if (err)throw err;

                                /****terminate connection***********/

                                con.end(function (err) {
                                    //console.log(err);
                                });

                            });


                        });
                    }
                    else
                    {
                        //console.log(rows[0].token);
                        var newToken = rows[0].token;
                        //callback(newToken,userDetails);

                        FB.setAccessToken(newToken);

                        /***** user access token renewal **/

                        FB.api("/oauth/access_token",{client_id: appdata.FaceBook.appID, client_secret: appdata.FaceBook.appSecret,grant_type:'fb_exchange_token',fb_exchange_token: newToken},function(res) {
                            //console.log(res.access_token);


                            FB.setAccessToken(res.access_token);

                            /**** getting relevant page access token****/

                            FB.api("me/accounts",function(res){

                                for (key=0;key<res.data.length;key++) {

                                    if(res.data[key].name==pageName){
                                        fbpost.postFunction(userDetails,res.data[key].access_token);
                                    }

                                }

                            });

                            /*** update previous(last used) user access token in db***/

                            var updateQuery="UPDATE access_token SET token='"+res.access_token+"' ORDER BY id DESC LIMIT 1";

                            con.query(updateQuery,function(err,rows){
                                if (err)throw err;

                                /****terminate connection***********/

                                con.end(function (err) {
                                    //console.log(err);
                                });
                            });



                        });


                    }





                });

            })(userDetails);







        });


    }

}