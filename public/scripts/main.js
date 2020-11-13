/**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author
 * qiuj1 chaiq
 */

var rhit = rhit || {};

rhit.fbPlayersManager = null;
rhit.fbAuthManager = null;

// Functions as its name
// from: https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

// Change password
rhit.AccountController = class {
  constructor() {
    // Adjust user text according to stat
    if (rhit.fbAuthManager.isSignedIn) {
      document.querySelector("#loginInfo").textContent =
        "Currently logged in as: " + rhit.fbAuthManager.uid;
    } else {
      document.querySelector("#loginInfo").textContent =
        "You are not logged in.";
      var button = document.createElement("button");
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
    };

    // Logout
    document.querySelector("#signOut").onclick = (event) => {
      console.log("Sign out");
      rhit.fbAuthManager.signOut();
    };
    // Delete account
    document.querySelector("#submitDelete").onclick = (event) => {
      console.log("Delete Account");
      rhit.fbAuthManager.deleteAccount();
    };
  }
};

rhit.ListPageController = class {
  constructor() {
    // Search redirect
    document.querySelector("#searchRedirect").onclick = (event) => {
      console.log("Redirecting to search page");
      window.location.href = "/search.html";
    };

    new rhit.AccountController();
  }
};

rhit.LoginPageController = class {
  constructor() {
    document.querySelector("#registerRedirect").onclick = (event) => {
      console.log("reg redirect");
      window.location.href = "/register.html";
    };

    const account = document.querySelector("#loginAccount");
    const password = document.querySelector("#loginPassword");
    document.querySelector("#login").onclick = (event) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(account.value, password.value)
        .catch(function (error) {
          console.log("error: ", error.code, error.message);
        });
    };
  }
};

rhit.RegisterPageController = class {
  constructor() {
    document.querySelector("#loginRedirect").onclick = (event) => {
      console.log("login redirect");
      window.location.href = "/login.html";
    };

    let account = document.querySelector("#registerAccount");
    let password = document.querySelector("#registerPassword");
    document.querySelector("#register").onclick = (event) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(account.value, password.value)
        .catch(function (error) {
          console.log("error: ", error.code, error.message);
        });
    };
  }
};

rhit.SearchPageController = class {
  constructor() {
    new rhit.AccountController();

    let region = "";
    let searchText = "";
    // Deal with dropdown selection (solution adapted)
    $("#regionSearch a").on("click", function () {
        region = $(this).text().trim().toLowerCase();
        document.querySelector("#dropdownMenuButton").innerHTML = region;
    });

    // Takes info when search
    document.querySelector("#searchSubmit").onclick = async (event) => {
      console.log("Searching");
      searchText = document.querySelector("#searchText").value;
      if (region && searchText) {
        console.log("stuff:", region, searchText)
        let result = await rhit.fetchPlayer(searchText, region);
        console.log(result)
        const newCard = htmlToElement(`
                <div id="searchResult" class="card">
                    <div class="card-body">
                        <h5 class="card-title">${result.data.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">
                            Summoner level: ${result.data.summonerLevel}
                        </h6>
                    </div>
                </div>`);
        newCard.onclick = (event) => {
            window.location.href = `/detail.html?region=${region}&summoner=${result.data.name}`;
        };
        const oldCard = document.querySelector("#searchResult");
        console.log(oldCard);
        oldCard.removeAttribute("id");
        oldCard.hidden = true;
        oldCard.parentElement.appendChild(newCard);
      } else {
        console.log("One of the two necessary information is missing!");
      }
    };
  }
};

rhit.DetailPageController = class {
  constructor() {
    new rhit.AccountController();

    let urlParams = new URLSearchParams(window.location.search);
    rhit.fetchPlayer(urlParams.get("summoner"), urlParams.get("region")).then(
        result => {
            //TODO: Fetch if the user have favorited the player
            // Refresh player info based on player action (The player icon image is loaded from op.gg database)
            const newCard = htmlToElement(`
                <div id="playerInfo">       
                    <img src="//opgg-static.akamaized.net/images/profile_icons/profileIcon${result.data.profileIconId}.jpg?image=c_scale,q_auto&amp;v=1518361200" id="playerIcon">
                    <div id="Profile">
                        <div class="Information">
                            <span id="playerName">${result.data.name}</span>
                            <a type="button" class="btn btn-primary" id="favoriteButton" disabled><i class="material-icons">favorite_border</i></a>
                        </div>
                        <button type="button" class="btn btn-primary" id="refreshButton"><i class="material-icons">update</i>Refresh</button>
                    </div>
                </div>`);
            const oldCard = document.querySelector("#playerInfo");
            console.log(oldCard);
            oldCard.removeAttribute("id");
            oldCard.hidden = true;
            oldCard.parentElement.appendChild(newCard);

            // Refresh match history
            const matchesData = firebase.firestore().collection("Matches");
            const matchList = htmlToElement(`<div id="matchHistory"></div>`);
            for (let i = 0; i < 3; i++) {
                var matchDetail = matchesData.doc(result.data.recentMatches[i]);
                var recentMatch = htmlToElement(`<div class="card"></div>`);
                recentMatch.appendChild(htmlToElement(`
                    <div class="card-body" style="background-color:#8ed49a; border-radius: 25px;" data-toggle="collapse" data-target="#${result.data.recentMatches[i]}" aria-expanded="false" aria-controls="collapseExample"><h5 class="card-title">Victory</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Ranked 20 min ago</h6>
                        <h6 class="card-subtitle mb-2 text-muted">25 minutes</h6>
                    </div>`));
                var playerList = htmlToElement(`
                <div class="collapse" id="${result.data.recentMatches[i]}">
                    <div class="card-body"> 
                    </div>
                </div>`);
                for (let j = 1; j < 11; j ++){
                    playerList.appendChild(htmlToElement(`<div class="card-subtitle" style="background-color:#8ebad4;">${matchDetail.data.participants.j.gameData.championID}&nbsp;&nbsp;Empertoast&nbsp;&nbsp;0/50/1&nbsp;&nbsp;294</div>
                    `));
                }
                recentMatch.appendChild(playerList);
                matchList.appendChild(matchDetail);
            }
        
            // TODO: Favorite and unfavorite
            document.querySelector("#favoriteButton").onclick = (event) => {
              let urlParams = new URLSearchParams(window.location.search);
              let region = urlParams.get("region");
              let summoner = urlParams.get("summoner");
        
              firebase.functions().httpsCallable("doesFollow")({
                summonerName: summoner,
                region,
              });
            };
        
            document.querySelector("#refreshButton").onclick = (event) => {};}
    ).catch((err) => {
        console.log(err);
    });
  }
};

rhit.fetchPlayer = async (playerName, selectedRegion) => {
  let result = await firebase.functions().httpsCallable("getSummonerFull")({
    summonerName: playerName,
    region: selectedRegion,
    fetchMatch: true,
  });
  return result;
};

rhit.initializePage = function () {
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
  if (document.querySelector("#detailPage")) {
    console.log("On the detail page");
    new rhit.DetailPageController();
  }
};

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

  changePassword(newPassword) {
    user
      .updatePassword(newPassword)
      .then(function () {})
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteAccount() {
    this._user
      .delete()
      .then(function () {
        // Refresh page
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  get uid() {
    return this._user.uid;
  }

  get isSignedIn() {
    return !!this._user;
  }
};

// If the user is logged in, he shouldn't be on login/reg page
rhit.checkForRedirects = function () {
  if (
    (document.querySelector("#loginPage") ||
      document.querySelector("#registerPage")) &&
    rhit.fbAuthManager.isSignedIn
  ) {
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
