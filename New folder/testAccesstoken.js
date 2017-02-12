/**
 * Created by Dell-Pc on 2/4/2017.
 */

var FB =require('fb');
var mysql = require('mysql');
const accessToken='EAAE7mskkFsUBAK0UiEtqjZA3gIZBxV831sT2AzDfbLX9Wbfk0mIhdJhl0JiCBOZC3dZBpnO5iH1NLZAtuElP7V8hjneC3UbasTJbtrGwFnaxmqO5B6Rv2ZCbZAFY253CoRkyEHgipMmf38Rerualw9mOHTZBOt9SZBecZD';



 con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "msp1"
});


con.connect(function (err) {
    if (err) {
        console.log("error connect");
        return;
    }
    console.log("connected");
});

var gettokenQuery='SELECT MAX(id),token FROM access_token';


(function getAccessToken (callback) {

    con.query(gettokenQuery, function (err, rows) {

        if (err || rows[0].id==null)
        {
            FB.api("/oauth/access_token",{client_id: '347010962298565', client_secret: 'f0350453bd29b370bff8d7117d4dde61',grant_type:'fb_exchange_token',fb_exchange_token: accessToken},function(res) {
                console.log(res.access_token);
                //global.accessToken2=res.access_token2;
                //accessToken2=res.access_token;



                var insertQuery="INSERT INTO access_token(token) VALUES('"+res.access_token+"')";
                //var updateQuery="UPDATE access_token SET token='"+res.access_token+"' ORDER BY id DESC LIMIT 1";



                con.query(insertQuery,function(err,rows){
                    if (err)throw err;

                    con.end(function (err) {
                        //console.log(err);
                    });

                });


            });
        }
        else
        {
            console.log(rows[0].token);
            var newToken = rows[0].token;
            callback(newToken);
        }





    });

})(function(newToken){

    FB.setAccessToken(newToken);

    FB.api("/oauth/access_token",{client_id: '347010962298565', client_secret: 'f0350453bd29b370bff8d7117d4dde61',grant_type:'fb_exchange_token',fb_exchange_token: newToken},function(res) {
        console.log(res.access_token);
        //global.accessToken2=res.access_token2;
        //accessToken2=res.access_token;

        //var insertQuery="INSERT INTO access_token(token) VALUES('"+res.access_token+"')";

        var updateQuery="UPDATE access_token SET token='"+res.access_token+"' ORDER BY id DESC LIMIT 1";



        con.query(updateQuery,function(err,rows){
            if (err)throw err;

            con.end(function (err) {
                //console.log(err);
            });
        });



    });

});






/*
if (newToken==accessToken){
    FB.setAccessToken(accessToken);

    FB.api("/oauth/access_token",{client_id: '347010962298565', client_secret: 'f0350453bd29b370bff8d7117d4dde61',grant_type:'fb_exchange_token',fb_exchange_token: accessToken},function(res) {
        console.log(res.access_token);
        //global.accessToken2=res.access_token2;
        //accessToken2=res.access_token;

        var insertQuery='INSERT INTO access_token(token) VALUES('+res.access_token+')';

        con.query(insertQuery,function(err,rows){
            if (err)throw err;
        });


    });

}
else{

    FB.setAccessToken(newToken);

    FB.api("/oauth/access_token",{client_id: '347010962298565', client_secret: 'f0350453bd29b370bff8d7117d4dde61',grant_type:'fb_exchange_token',fb_exchange_token: newToken},function(res) {
        console.log(res.access_token);
        //global.accessToken2=res.access_token2;
        //accessToken2=res.access_token;

        var insertQuery = 'INSERT INTO access_token(token) VALUES(' + res.access_token + ')';

        con.query(insertQuery, function (err,rows) {
            if (err)throw err;
        });

    });

}

*/


/*

FB.api('/me/accounts',function(response) {
    console.log(response.data);
    //object=JSON.parse(response);
    //Console.log(object);
});


*/


/*
con.end(function (err) {
    //console.log(err);
});

    */