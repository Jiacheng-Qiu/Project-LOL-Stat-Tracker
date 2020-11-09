/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * qiuj1
 */

var rhit = rhit || {};

rhit.fbPlayersManager = null;
rhit.fbAuthManager = null;

// Change password
rhit.AccountController = class{
    constructor() {
        // Adjust user text according to stat
        if (rhit.fbAuthManager.isSignedIn) {
            document.querySelector("#loginInfo").textContent = "Currently logged in as: "+ rhit.fbAuthManager.uid;
        } else {
            document.querySelector("#loginInfo").textContent = "You are not logged in.";
            var button = document.createElement('button');
            button.id = "loginRedirect";
            button.type = "button";
            button.classList = "btn";
            button.textContent = "Login here";
            document.querySelector("#loginInfo").appendChild(button);

            document.querySelector("#loginRedirect").onclick = (event) => {
                console.log("login redirect");
                window.location.href = "/login.html";
            };
        }

        document.querySelector("#submitEditPass").onclick = (event) => {
            const pass = document.querySelector("#newPass");
            const reenter = document.querySelector("#reenterPass");
            if (pass.value == reenter.value) {
                rhit.fbAuthManager.changePassword(pass.value);
            } else {
                // Send warning
                console.log("New passwords don't match");
            }
        }

        // Logout
        document.querySelector("#signOut").onclick = (event) => {
            console.log("Sign out");
            rhit.fbAuthManager.signOut();
        }
        // Delete account
        document.querySelector("#submitDelete").onclick = (event) => {
            console.log("Delete Account");
            rhit.fbAuthManager.deleteAccount();
        }
    }
}

rhit.ListPageController = class{
    constructor() {
        // Search redirect
        document.querySelector("#searchRedirect").onclick = (event) => {
            console.log("Redirecting to search page");
            window.location.href = "/search.html";
        }

        new rhit.AccountController();
    }
}

rhit.LoginPageController = class{
    constructor() {
        document.querySelector("#registerRedirect").onclick = (event) => {
            console.log("reg redirect");
		    window.location.href = "/register.html";
        };

        const account = document.querySelector("#loginAccount");
        const password = document.querySelector("#loginPassword");
        document.querySelector("#login").onclick = (event) => {
            firebase.auth().signInWithEmailAndPassword(account.value, password.value).catch(function(error) {
                console.log("error: ", error.code, error.message);
            });
        }
    }
}

rhit.RegisterPageController = class{
    constructor() {
        document.querySelector("#loginRedirect").onclick = (event) => {
            console.log("login redirect");
		    window.location.href = "/login.html";
        };

        const account = document.querySelector("#registerAccount");
        const password = document.querySelector("#registerPassword");
        document.querySelector("#register").onclick = (event) => {
            firebase.auth().createUserWithEmailAndPassword(account.value, password.value).catch(function(error) {
                console.log("error: ", error.code, error.message);
            });
        }
    }
}

rhit.SearchPageController = class{
    constructor() {
        new rhit.AccountController();

        let region = "";
        let searchText = "";
        // Deal with dropdown selection (solution adapted)
        $('#regionSearch a').on('click', function(){
            region = $(this).text();
            document.querySelector("#dropdownMenuButton").innerHTML = region;
        });

        // Takes info when search
        document.querySelector("#searchSubmit").onclick = (event) => {
            console.log("Searching");
            searchText = document.querySelector("#searchText").value;
            if (region && searchText){
                rhit.searchPlayer(searchText, region);
            } else {
                console.log("One of the two necessary information is missing!");
            }
        };

    }
}

rhit.searchPlayer = function(playerName, region) {
    // TODO: to be combined with didi functions for results
}

rhit.initializePage = function() {
    if (document.querySelector("#loginPage")) {
		console.log("On the login page");
		new rhit.LoginPageController();
	}
    if (document.querySelector("#registerPage")) {
		console.log("On the register page");
		new rhit.RegisterPageController();
	}
    if (document.querySelector("#listPage")) {
		console.log("On the list page");
		new rhit.ListPageController();
    }
    if (document.querySelector("#searchPage")) {
		console.log("On the search page");
		new rhit.SearchPageController();
	}
}

rhit.FbAuthManager = class {
	constructor() {
        this._user = null;
	}

	beginListening(changeListener) {
		firebase.auth().onAuthStateChanged((user) => {
            this._user = user;
			changeListener();
		});
	}

	signOut() {
		firebase.auth().signOut();
    }

    changePassword(newPassword){
        user.updatePassword(newPassword).then(function() {
        }).catch(function(error) {
            console.log(error);
        });
    }

    deleteAccount() {
        this._user.delete().then(function() {
            // Refresh page
            window.location.href = "/";
        }).catch(function(error) {
            console.log(error);
        });
    }

	get uid() {
		return this._user.uid;
	}

	get isSignedIn() {
		return !!this._user;
	}

}

// If the user is logged in, he shouldn't be on login/reg page
rhit.checkForRedirects = function() {
    if ((document.querySelector("#loginPage") || document.querySelector("#registerPage")) && rhit.fbAuthManager.isSignedIn) {
		window.location.href = "/";
	}
};

rhit.main = function () {
	console.log("Ready");
    rhit.fbAuthManager = new rhit.FbAuthManager();
    rhit.fbAuthManager.beginListening(() => {
        console.log("Auth listening");
        // Page init
        rhit.checkForRedirects();
        rhit.initializePage();
	});
};

rhit.main();
