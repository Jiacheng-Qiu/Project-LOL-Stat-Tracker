/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * qiuj1
 */

var rhit = rhit || ***REMOVED******REMOVED***;

rhit.fbPlayersManager = null;
rhit.fbAuthManager = null;

rhit.ListPageController = class***REMOVED***
    constructor() ***REMOVED***
        // Adjust user text according to stat
        if (rhit.fbAuthManager.isSignedIn) ***REMOVED***
            document.querySelector("#loginInfo").textContent = "Currently logged in as: "+ rhit.fbAuthManager.uid;
        ***REMOVED*** else ***REMOVED***
            document.querySelector("#loginInfo").textContent = "You are not logged in.";
            var button = document.createElement('button');
            button.id = "loginRedirect";
            button.type = "button";
            button.classList = "btn";
            button.textContent = "Login here";
            document.querySelector("#loginInfo").appendChild(button);

            document.querySelector("#loginRedirect").onclick = (event) => ***REMOVED***
                console.log("login redirect");
                window.location.href = "/login.html";
            ***REMOVED***;
        ***REMOVED***

        // Change password
        document.querySelector("#submitEditPass").onclick = (event) => ***REMOVED***
            if (document.querySelector("#newPass").value == document.querySelector("#reenterPass").value) ***REMOVED***
                rhit.fbAuthManager.changePassword(document.querySelector("#newPass").value);
            ***REMOVED*** else ***REMOVED***
                // Send warning
                console.log("new password don't match");
            ***REMOVED***
        ***REMOVED***

        // Logout
        document.querySelector("#signOut").onclick = (event) => ***REMOVED***
            console.log("Sign out");
            rhit.fbAuthManager.signOut();
        ***REMOVED***
        // Delete account
        document.querySelector("#submitDelete").onclick = (event) => ***REMOVED***
            console.log("Delete Account");
            rhit.fbAuthManager.deleteAccount();
        ***REMOVED***
    ***REMOVED***
***REMOVED***

rhit.LoginPageController = class***REMOVED***
    constructor() ***REMOVED***
        document.querySelector("#registerRedirect").onclick = (event) => ***REMOVED***
            console.log("reg redirect");
		    window.location.href = "/register.html";
        ***REMOVED***;

        const account = document.querySelector("#loginAccount");
        const password = document.querySelector("#loginPassword");
        document.querySelector("#login").onclick = (event) => ***REMOVED***
            firebase.auth().signInWithEmailAndPassword(account.value, password.value).catch(function(error) ***REMOVED***
                console.log("error: ", error.code, error.message);
            ***REMOVED***);
        ***REMOVED***
    ***REMOVED***
***REMOVED***

rhit.RegisterPageController = class***REMOVED***
    constructor() ***REMOVED***
        document.querySelector("#loginRedirect").onclick = (event) => ***REMOVED***
            console.log("login redirect");
		    window.location.href = "/login.html";
        ***REMOVED***;

        const account = document.querySelector("#registerAccount");
        const password = document.querySelector("#registerPassword");
        document.querySelector("#register").onclick = (event) => ***REMOVED***
            firebase.auth().createUserWithEmailAndPassword(account.value, password.value).catch(function(error) ***REMOVED***
                console.log("error: ", error.code, error.message);
            ***REMOVED***);
        ***REMOVED***
    ***REMOVED***
***REMOVED***

rhit.initializePage = function() ***REMOVED***
    if (document.querySelector("#loginPage")) ***REMOVED***
		console.log("On the login page");
		new rhit.LoginPageController();
	***REMOVED***
    if (document.querySelector("#registerPage")) ***REMOVED***
		console.log("On the register page");
		new rhit.RegisterPageController();
	***REMOVED***
    if (document.querySelector("#listPage")) ***REMOVED***
		console.log("On the list page");
		new rhit.ListPageController();
	***REMOVED***
***REMOVED***

rhit.FbAuthManager = class ***REMOVED***
	constructor() ***REMOVED***
        this._user = null;
	***REMOVED***

	beginListening(changeListener) ***REMOVED***
		firebase.auth().onAuthStateChanged((user) => ***REMOVED***
            this._user = user;
			changeListener();
		***REMOVED***);
	***REMOVED***

	signOut() ***REMOVED***
		firebase.auth().signOut();
    ***REMOVED***

    changePassword(newPassword)***REMOVED***
        user.updatePassword(newPassword).then(function() ***REMOVED***
        ***REMOVED***).catch(function(error) ***REMOVED***
            console.log(error);
        ***REMOVED***);
    ***REMOVED***

    deleteAccount() ***REMOVED***
        this._user.delete().then(function() ***REMOVED***
            // Refresh page
            window.location.href = "/";
        ***REMOVED***).catch(function(error) ***REMOVED***
            console.log(error);
        ***REMOVED***);
    ***REMOVED***

	get uid() ***REMOVED***
		return this._user.uid;
	***REMOVED***

	get isSignedIn() ***REMOVED***
		return !!this._user;
	***REMOVED***

***REMOVED***

// If the user is logged in, he shouldn't be on login/reg page
rhit.checkForRedirects = function() ***REMOVED***
    if ((document.querySelector("#loginPage") || document.querySelector("#registerPage")) && rhit.fbAuthManager.isSignedIn) ***REMOVED***
		window.location.href = "/";
	***REMOVED***
***REMOVED***;

rhit.main = function () ***REMOVED***
	console.log("Ready");
    rhit.fbAuthManager = new rhit.FbAuthManager();
    rhit.fbAuthManager.beginListening(() => ***REMOVED***
        console.log("Auth listening");
        // Page init
        rhit.checkForRedirects();
        rhit.initializePage();
	***REMOVED***);
***REMOVED***;

rhit.main();
