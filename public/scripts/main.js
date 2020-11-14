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
      document.querySelector("#accountDrawer").disabled = false;
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

      document.querySelector("#accountDrawer").disabled = true;
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

    // TODO: list user's favorites if there is any
    // First check if the user is logged in
    if (rhit.fbAuthManager.isSignedIn) {
      firebase
        .firestore()
        .collection("Users")
        .doc(rhit.fbAuthManager.uid)
        .get()
        .then((res) => res.data())
        .then(async (res) => {
          let favoritesRaw = res["favorites"];
          let favorites = {};
          await Promise.all(
            favoritesRaw.map(async (rawFav) => {
              try {
                let sum = await firebase
                  .firestore()
                  .collection("Summoners")
                  .doc(rawFav)
                  .get();
                favorites[rawFav] = sum.data();
              } catch (err) {
                console.log("Err fetching summoner", err);
              }
            })
          );

          console.log("favs", favorites);
          let favContainer = document.querySelector("#favContainer");
          for (let fav in favorites) {
            let data = favorites[fav];
            let name = data.name;
            let region = fav.replace(name.trim().toLowerCase(), "");
            console.warn(name);
            console.warn(region);
            let favCard = htmlToElement(`
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                    </div>
                  </div>`);
            favCard.onclick = (event) => {
              window.location.href = `/detail.html?region=${region}&summoner=${name}`;
            };
            favContainer.appendChild(favCard);
          }
        })
        .catch((err) => console.log(err));
      // let favContainer = htmlToElement('<div id="favContainer"></div>');
      // for (let fav in favList) {
      //   let favCard = htmlToElement(`
      //       <div class="card">
      //         <div class="card-body">
      //           <h5 class="card-title">${fav.player}</h5>
      //         </div>
      //       </div>`);
      //   favCard.onclick = (event) => {
      //     window.location.href = `/detail.html?region=${fav.region}&summoner=${fav.name}`;
      //   };
      //   favContainer.appendChild(favCard);
      // }
      // const oldFav = document.querySelector("#favContainer");
      // oldFav.removeAttribute("id");
      // oldFav.hidden = true;
      // oldFav.parentElement.appendChild(favList);
    }

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
        console.log("stuff:", region, searchText);
        let result = await rhit.fetchPlayer(searchText, region);
        console.log(result);
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

    // Search redirect
    document.querySelector("#searchRedirect").onclick = (event) => {
      console.log("Redirecting to search page");
      window.location.href = "/search.html";
    };

    let urlParams = new URLSearchParams(window.location.search);
    rhit
      .fetchPlayer(
        urlParams.get("summoner").trim().toLowerCase(),
        urlParams.get("region").trim().toLowerCase()
      )
      .then(async (result) => {
        // Refresh player info based on player action
        let doesFollow = await firebase.functions().httpsCallable("doesFollow")(
          {
            summonerName: urlParams.get("summoner").trim().toLowerCase(),
            region: urlParams.get("region").trim().toLowerCase(),
          }
        );
        let followIcon = "";
        if (doesFollow.data["follows"]) {
          followIcon = "favorite";
        } else {
          followIcon = "favorite_border";
        }
        const newCard = htmlToElement(`
                <div id="playerInfo">       
                    <img src="//raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${result.data.profileIconId}.jpg" id="playerIcon">
                    <div id="Profile">
                        <div class="Information">
                            <span id="playerName">${result.data.name}</span>
                            <a type="button" class="btn btn-primary" id="favoriteButton"><i class="material-icons">${followIcon}</i></a>
                        </div>
                        <button type="button" class="btn btn-primary" id="refreshButton"><i class="material-icons">update</i>Refresh</button>
                    </div>
                </div>`);
        const oldCard = document.querySelector("#playerInfo");
        oldCard.removeAttribute("id");
        oldCard.hidden = true;
        oldCard.parentElement.appendChild(newCard);

        let isLiveCard = document.querySelector("#isLive");
        let isLive = result.data.isLive;
        if (isLive) {
          isLiveCard.innerHTML = "Live right now!";
        } else {
          isLiveCard.innerHTML = "";
        }

        // Refresh match history
        const matchesData = firebase.firestore().collection("Matches");
        const matchList = htmlToElement(`<div id="matchHistory"></div>`);

        // Load the champion data file

        for (let i = 0; i < result.data.recentMatches.length; i++) {
          var matchDetail = await matchesData
            .doc(result.data.recentMatches[i])
            .get();
          var recentMatch = htmlToElement(`<div class="card"></div>`);

          let playerList = "";

          // playerListOuter.innerHTML = playerList
          let waaak = matchDetail.data().participants;
          var matchTime = timeSince(matchDetail.data().gameCreation) + " ago";

          let playerCounter = 0;
          for (let key in waaak) {
            playerCounter++;
            if (
              waaak[key].player.summonerName.trim().toLowerCase() ==
              urlParams.get("summoner").trim().toLowerCase()
            ) {
              var matchResult = "";
              var borderColor = "";
              if (
                (playerCounter <= 5 && matchDetail.data().teams[100] == true) ||
                (playerCounter > 5 && matchDetail.data().teams[200] == true)
              ) {
                matchResult = "Victory";
                borderColor = "8ed49a";
              } else {
                matchResult = "Defeat";
                borderColor = "ee9b9b";
              }
              recentMatch.appendChild(
                htmlToElement(`
                        <div class="card-body" style="background-color:#${borderColor}; border-radius: 25px;" data-toggle="collapse" data-target="#${
                  result.data.recentMatches[i]
                }" aria-expanded="false" aria-controls="collapseExample"><h5 class="card-title">${matchResult}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${matchTime}</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Game type: ${
                              matchDetail.data().gameMode
                            }</h6>
                            <h6 class="card-subtitle mb-2 text-muted">Lasted ${Math.round(
                              parseInt(matchDetail.data().gameDuration) / 60
                            )} minutes</h6>
                        </div>`)
              );
            }

            let color = "";
            if (playerCounter <= 5) {
              color = "8ebad4";
            } else {
              color = "ee9b9b";
            }

            playerList += `
                      <tr class="card-body" style="background-color:#${color}; border-radius: 10px;">
                        <td>${CHAMPION[waaak[key].gameData.championId]}</td>
                        <td>
                          <a 
                            href="/detail.html?region=${urlParams
                              .get("region")
                              .trim()
                              .toLowerCase()}&summoner=${
              waaak[key].player.summonerName
            }"
                          >
                            ${waaak[key].player.summonerName}
                          <a>
                        </td>
                        <td>${waaak[key].gameData.stats.kills}/${
              waaak[key].gameData.stats.deaths
            }/${waaak[key].gameData.stats.assists}</td>
                        <td>${
                          waaak[key].gameData.stats.totalDamageDealtToChampions
                        }</td>
                        <td>${waaak[key].gameData.stats.goldEarned}</td>
                      </tr>
                      `;
            if (playerCounter == 5) {
              playerList += `<tr><td>&nbsp;</td></tr>`;
            }
          }
          let playerListHTML = htmlToElement(`
                   <div class="collapse" id="${result.data.recentMatches[i]}">
                    <table id="match${result.data.recentMatches[i]}">
                      <tr>
                        <th>Champion</th>
                        <th>Summoner</th>
                        <th>KDA</th>
                        <th>Damage</th>
                        <th>Gold</th>
                      </tr>
                      ${playerList}
                    </table>
                   </div>`);

          recentMatch.appendChild(playerListHTML);
          matchList.appendChild(recentMatch);
        }

        const oldMatch = document.querySelector("#matchHistory");
        oldMatch.removeAttribute("id");
        oldMatch.hidden = true;
        oldMatch.parentElement.appendChild(matchList);

        // TODO: Favorite and unfavorite

        let favButtonEvent = async (event) => {
          // First disable the button
          document.querySelector("#favoriteButton").disabled = true;

          let urlParams = new URLSearchParams(window.location.search);
          let region = urlParams.get("region").trim().toLowerCase();
          let summoner = urlParams.get("summoner").trim().toLowerCase();

          let doesFollow = await firebase
            .functions()
            .httpsCallable("doesFollow")({
            summonerName: summoner,
            region,
          });
          console.log(doesFollow);
          // If the user already follows the player, unfollow and change button
          if (doesFollow.data["follows"]) {
            console.log("unfollowing");
            firebase
              .functions()
              .httpsCallable("unfollowPlayer")({
                summonerName: summoner,
                region,
              })
              .then(function () {
                let newButton = htmlToElement(
                  `<a type="button" class="btn btn-primary" id="favoriteButton"><i class="material-icons">favorite_border</i></a>`
                );
                const oldButton = document.querySelector("#favoriteButton");
                oldButton.removeAttribute("id");
                oldButton.hidden = true;
                newButton.onclick = favButtonEvent;
                oldButton.parentElement.appendChild(newButton);
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            console.log("following");
            firebase
              .functions()
              .httpsCallable("followPlayer")({
                summonerName: summoner,
                region,
              })
              .then(function () {
                let newButton = htmlToElement(
                  `<a type="button" class="btn btn-primary" id="favoriteButton"><i class="material-icons">favorite</i></a>`
                );
                const oldButton = document.querySelector("#favoriteButton");
                oldButton.removeAttribute("id");
                oldButton.hidden = true;
                newButton.onclick = favButtonEvent;
                oldButton.parentElement.appendChild(newButton);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        };

        document.querySelector("#favoriteButton").onclick = favButtonEvent;

        document.querySelector("#refreshButton").onclick = (event) => {
          location.reload();
        };
      })
      .catch((err) => {
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
    this._user
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
