var FB= require('fb');

//console.log(accessToken);

module.exports = {

		postFunction : function (name,accessToken) {


	        FB.setAccessToken(accessToken);


	        var body = ' Happy Birthday ';

	        if(name.length >= 1) {

	        	for (var i = 0; i < name.length; i++) {
	        		if(i==name.length-1){
	        			body+=name[i]["user_name"]+" =D !!!";
	        		}

	        		else{
	        			body+=name[i]["user_name"]+" & ";
	        		}

	        	}


				FB.api('me/feed', 'post', { message: body }, function (res) {
					if(!res || res.error) {
						console.log(!res ? 'error occurred' : res.error);
						return;
					}
					console.log('Post Id: ' + res.id);
				});



	        }



	    }

    };