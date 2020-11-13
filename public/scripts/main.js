/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * qiuj1 chaiq
 */

var rhit = rhit || ***REMOVED******REMOVED***;

rhit.fbPlayersManager = null;
rhit.fbAuthManager = null;

// Functions as its name
// from: https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements
function htmlToElement(html) ***REMOVED***
    var template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
***REMOVED***

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

        let account = document.querySelector("#registerAccount");
        let password = document.querySelector("#registerPassword");
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
            region = $(this).text().trim().toLowerCase();;
            document.querySelector("#dropdownMenuButton").innerHTML = region;
        ***REMOVED***);

        // Takes info when search
        document.querySelector("#searchSubmit").onclick = (event) => ***REMOVED***
            console.log("Searching");
            searchText = document.querySelector("#searchText").value;
            if (region && searchText)***REMOVED***
               let result = new rhit.FetchPlayerInfo(searchText, region).fetchPlayer();
               console.log(result);
               const newCard = htmlToElement(`
                <div id="searchResult" class="card">
                    <div class="card-body">
                        <h5 class="card-title">$***REMOVED***result.name***REMOVED***</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            Summoner level: $***REMOVED***result.summonerLevel***REMOVED***
                        </h6>
                    </div>
                </div>`);
                newCard.onclick = (event) => ***REMOVED***
                    window.location.href = `/detail.html?region=$***REMOVED***selectedRegion***REMOVED***&summoner=$***REMOVED***result.data.name***REMOVED***`;
                ***REMOVED***;
                const oldCard = document.querySelector("#searchResult");
                console.log(oldCard);
                oldCard.removeAttribute("id");
                oldCard.hidden = true;
                oldCard.parentElement.appendChild(newCard);
            ***REMOVED*** else ***REMOVED***
               console.log("One of the two necessary information is missing!");
            ***REMOVED***
        ***REMOVED***;

    ***REMOVED***
***REMOVED***


rhit.DetailPageController = class***REMOVED***
    constructor() ***REMOVED***
        new rhit.AccountController();

        console.log();
        let urlParams = new URLSearchParams(window.location.search);
        let region = urlParams.get("region");
        let summoner = urlParams.get("summoner");

        // Refresh match history based on player action


        // TODO: Favorite and unfavorite
        document.querySelector('#favoriteButton').onclick = (event) => ***REMOVED***
            let urlParams = new URLSearchParams(window.location.search);
            let region = urlParams.get("region");
            let summoner = urlParams.get("summoner");

            firebase.functions().httpsCallable("doesFollow")(***REMOVED***summonerName: summoner, region***REMOVED***);
        ***REMOVED***;

        document.querySelector('#refreshButton').onclick = (event) => ***REMOVED***
            
        ***REMOVED***;
    ***REMOVED***
***REMOVED***

rhit.FetchPlayerInfo = class***REMOVED***
    constructor(playerName, selectedRegion)***REMOVED***
        this.playerName = playerName;
        this.selectedRegion = selectedRegion;
    ***REMOVED***

    fetchPlayer = async() => ***REMOVED***
        let result = await firebase.functions().httpsCallable("getSummonerFull")(***REMOVED***summonerName: this.playerName, region: this.selectedRegion, fetchMatch: true ***REMOVED***);
        return result;
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
    if (document.querySelector("#searchPage")) ***REMOVED***
		console.log("On the search page");
		new rhit.SearchPageController();
    ***REMOVED***
    if (document.querySelector("#detailPage")) ***REMOVED***
		console.log("On the detail page");
		new rhit.DetailPageController();
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
