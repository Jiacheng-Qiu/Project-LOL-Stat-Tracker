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

// Change password
rhit.AccountController = class***REMOVED***
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

        document.querySelector("#submitEditPass").onclick = (event) => ***REMOVED***
            const pass = document.querySelector("#newPass");
            const reenter = document.querySelector("#reenterPass");
            if (pass.value == reenter.value) ***REMOVED***
                rhit.fbAuthManager.changePassword(pass.value);
            ***REMOVED*** else ***REMOVED***
                // Send warning
                console.log("New passwords don't match");
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

rhit.ListPageController = class***REMOVED***
    constructor() ***REMOVED***
        // Search redirect
        document.querySelector("#searchRedirect").onclick = (event) => ***REMOVED***
            console.log("Redirecting to search page");
            window.location.href = "/search.html";
        ***REMOVED***

        new rhit.AccountController();
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

rhit.SearchPageController = class***REMOVED***
    constructor() ***REMOVED***
        new rhit.AccountController();

        let region = "";
        let searchText = "";
        // Deal with dropdown selection (solution adapted)
        $('#regionSearch a').on('click', function()***REMOVED***
            region = $(this).text();
            document.querySelector("#dropdownMenuButton").innerHTML = region;
        ***REMOVED***);

        // Takes info when search
        document.querySelector("#searchSubmit").onclick = (event) => ***REMOVED***
            console.log("Searching");
            searchText = document.querySelector("#searchText").value;
            if (region && searchText)***REMOVED***
                rhit.searchPlayer(searchText, region);
            ***REMOVED*** else ***REMOVED***
                console.log("One of the two necessary information is missing!");
            ***REMOVED***
        ***REMOVED***;

    ***REMOVED***
***REMOVED***

rhit.searchPlayer = function(playerName, region) ***REMOVED***
    // TODO: to be combined with didi functions for results
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
    if (document.querySelector("#searchPage")) ***REMOVED***
		console.log("On the search page");
		new rhit.SearchPageController();
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