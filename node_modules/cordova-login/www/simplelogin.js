var exec = require('cordova/exec');
var PLUGIN_NAME = 'SimpleLogin';
var SimpleLogin = {
	init: function(){
		$('.login-form').hide();
		$('#init').show();
		$('#back').hide();
		$('.login-msg').hide();
		$('#login-logo').html('<img src="'+LOGO+'">');
	},
	signUp: function(show=0){
		if(show == 1){
			$('.login-form').hide();
			$('#registration').show();
			$('#back').show();
		}else{
			var name  = $('#name').val();
			var email = $('#mail').val();
			var secQ  = $('#securityQ').val();
			var secA  = $('#securityA').val();
			var pass  = $('#pass').val();
			var pass  = (pass);
			if(email!='' && pass!=''){
				$('.login-msg').hide();
				$('#WaitIcon').show();
				var param = {name:name,email:email,secQ:secQ,secA:secA,pass:pass,gcm:localStorage.gcm,app_id:localStorage.app_id};
				var response = SimpleLogin.verify('PLUGIN__userSignUp', param).done(function(response){
					if(response!=0){
						localStorage.name = name;
						localStorage.user_id = response;
						window.location.href = home_page;
					}else{
						$('.login-msg').html("Email already registered! <br><span onclick='SimpleLogin.init()'>Try Login?</span>");
						$('.login-msg').show();
						$('#WaitIcon').hide();
					}
				});
			}else{
				$('.login-msg').html("Please fill all fields!");
				$('.login-msg').show();
			}
		}
	},
	signIn: function(show=0){
		if(show == 1){
			$('.login-form').hide();
			$('#login').show();
			$('#back').show();
		}else{
			var email = $('#email').val();
			var pass  = $('#password').val();
			var pass  = (pass);
			if(email!='' && pass!=''){
				$('.login-msg').hide();
				$('#WaitIcon').show();
				var param = {email:email,pass:pass,app_id:localStorage.app_id};
				var response = SimpleLogin.verify('PLUGIN__userSignIn', param).done(function(response){
					if(response!=0){
						localStorage.name = response.name;
						localStorage.user_id = response.user_id;
						window.location.href = home_page;
					}else{
						$('.login-msg').html("Invalid credentials! <br><span onclick='SimpleLogin.resetPassword(1)'>Want to RESET?</span>");
						$('.login-msg').show();
						$('#WaitIcon').hide();
					}
				});
				
				
			}else{
				$('.login-msg').html("Please provide credentials!");
				$('.login-msg').show();
			}
		}
	},
	resetPassword: function(show=0){
		if(show == 1){
			$('.login-form').hide();
			$('.login-msg').hide();
			$('#reset').show();
			$('#back').show();
		}else{
			var email = $('#registeredEmail').val();
			if(email!=''){
				$('.login-msg').hide();
				$('#WaitIcon').show();
				var param = {email:email,app_id:localStorage.app_id};
				var response = SimpleLogin.verify('PLUGIN__checkEmail', param).done(function(response){
					if(response!=0){
						$('#WaitIcon').hide();
						SimpleLogin.confirmReset(1,response.secQ,email);
					}else{
						$('.login-msg').html("Email address is not registered");
						$('.login-msg').show();
						$('#WaitIcon').hide();
					}
				});
				
			}else{
				$('.login-msg').html("Email Address is required!");
				$('.login-msg').show();
			}
		}
	},
	confirmReset: function(show=0,secQ='',email=''){
		if(show != 0){
			$('.login-form').hide();
			$('.login-msg').html(secQ + '?');
			$('.login-msg').show();
			$('#confirmReset').show();
			$('#confirmBtn').html('<input type="button" id="resetButton" value="Reset" onclick="SimpleLogin.confirmReset(0,\''+secQ+'\',\''+email+'\')" />');
			$('#back').show();
		}else{
			var secA = $('#secretAns').val();
			var pass = $('#preferredPassword').val();
			var pass  = (pass);
			if(secA!='' && pass!=''){
				$('.login-msg').hide();
				$('#WaitIcon').show();
				var param = {email:email,pass:pass,secQ:secQ,secA:secA,app_id:localStorage.app_id};
				var response = SimpleLogin.verify('PLUGIN__passwordReset', param).done(function(response){
					if(response){
						$('#WaitIcon').hide();
						$('#secretAns').hide();
						$('#preferredPassword').hide();
						$('#resetButton').hide();
						$('.login-msg').html("Password Reset successful");
						$('.login-msg').show();
					}else{
						$('.login-msg').html("Invalid security answer!");
						$('.login-msg').show();
						$('#WaitIcon').hide();
					}
				});
				
			}else{
				$('.login-msg').html("Email Address is required!");
				$('.login-msg').show();
			}
		}
	},
	signOut: function(){
		localStorage.removeItem(user_id);
		window.location.href="login.html";
	},
	auth: function(){
		if(localStorage.user_id!=undefined){
			return true;
		}else{
			window.location.href="login.html";
		}
	},
	verify: function(method,param){
		return jQuery.ajax({
			 type: "POST",
			 url: API_URL+method,
			 data: param,
			 contentType: "application/x-www-form-urlencoded; charset=utf-8",
			 dataType: "json",
			 success: function (data) {
				
			 },error: function (err) {            
				//console.log(err);
			 }
		 });
	}
};
cordova.addConstructor(function() 
{
	window.SimpleLogin = SimpleLogin;
	return window.SimpleLogin;
});
module.exports = SimpleLogin;
