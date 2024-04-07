var logedInUser = null;

window.addEventListener("load", function () {
  
    if(logedInUser == null){
        logedInUser = JSON.parse(localStorage.getItem("logedInUser"));
    }

    // if(JSON.parse(localStorage.getItem("logedInUser")).isChef){
    //     document.getElementById("up-check-box").setAttribute("checked", "true");
    //     document.getElementById("chefAccountBtn").style.display = "block";
    // }else{
    //     document.getElementById("up-check-box").removeAttribute("checked");
    //     document.getElementById("chefAccountBtn").style.display = "none";
    // }

    loadRecentlyAccessed();
    loadPurchasedTutorials();
    loadPaymentHistory();

});



function loadRecentlyAccessed() {
  var userRecentlyAccessedObj = logedInUser.recently_accessed;
  if (userRecentlyAccessedObj != null) {

    var recentlyAccessedCardList = "";

    for(var cardKey in userRecentlyAccessedObj){

        var card = userRecentlyAccessedObj[cardKey];
        var recentlyAccessedCard = `
            <div class="search-card">
                <div class="search-card-head"></div>
                <div class="search-card-body">

                    <div class="search-card-body-first">

                        <div class="search-card-body-second">
                            <div class="search-card-name">${card.name}</div>
                            <div class="search-card-city">${card.related_to}</div>
                        </div>

                    </div>

                    <div class="search-card-by">Tutorial By : <span>${card.chef_name}</span></div>

                </div>
            </div>
        `;
        recentlyAccessedCardList += recentlyAccessedCard;
    }

    document.getElementById("recentlyAccessedDiv").innerHTML = recentlyAccessedCardList;

  }
}

function loadPurchasedTutorials() {
    var purchasedTutorialObj = logedInUser.purchased_tutorials;
    if (purchasedTutorialObj != null) {
  
      var purchasedTutorialCardList = "";
  
      for(var cardKey in purchasedTutorialObj){
  
        var card = purchasedTutorialObj[cardKey];
          var purchasedTutorialCard = `
              <div class="search-card">
                  <div class="search-card-head"></div>
                  <div class="search-card-body">
  
                      <div class="search-card-body-first">
  
                          <div class="search-card-body-second">
                              <div class="search-card-name">${card.name}</div>
                              <div class="search-card-city">${card.related_to}</div>
                          </div>
  
                      </div>
  
                      <div class="search-card-by">Tutorial By : <span>${card.chef_name}</span></div>
  
                  </div>
              </div>
          `;
          purchasedTutorialCardList += purchasedTutorialCard;
      }
  
      document.getElementById("purchasedTutorialsDiv").innerHTML = purchasedTutorialCardList;
  
    }
}

function loadPaymentHistory() {
    var paymentHistoryObj = logedInUser.payment_history;
    if (paymentHistoryObj != null) {
  
      var paymentHistoryCardList = "";
  
      for(var cardKey in paymentHistoryObj){
  
        var card = paymentHistoryObj[cardKey];
          var paymentHistoryCard = `
            <div class="up-history-card">
                <div class="up-history-text">
                    <span class="up-history-title">Tutorial : </span>${card.name}
                </div>
                <div class="up-history-text">
                    <span class="up-history-title">Cheff : </span>${card.chef_name}
                </div>
                <div class="up-history-text">
                    <span class="up-history-title">At : </span>${card.purchased_date}
                </div>
                <div class="up-history-text">
                    <span class="up-history-title">Paid : </span>${card.paid_amount}
                </div>
            </div>
          `;
          paymentHistoryCardList += paymentHistoryCard;
      }
  
      document.getElementById("paymentHistoryDiv").innerHTML = paymentHistoryCardList;
  
    }
}

function showSection(sectionId) {
  if (document.getElementById("detail_" + sectionId).hasAttribute("open")) {
    document.getElementById("detail_" + sectionId).removeAttribute("open");
    return;
  } else {
    document.getElementById("detail_" + sectionId).setAttribute("open", "true");
    document.getElementById("detail_" + sectionId).scrollIntoView();
  }
}

function logout() {

    localStorage.removeItem("logedInUser");
    window.location.href = "login.html";

}    

function goToChefAccount() {
    window.location.href = "chef_profile.html";
}

function setChefStatus(event){

    event.preventDefault(); 
    event.stopPropagation();

    if(logedInUser.isChef){

        logedInUser.isChef = false;
        document.getElementById("chefAccountBtn").style.display = "none";
        document.getElementById("up-check-box").removeAttribute("checked");
    }else{

        logedInUser.isChef = true;
        document.getElementById("chefAccountBtn").style.display = "block";
        document.getElementById("up-check-box").setAttribute("checked", "true");
    }

    localStorage.setItem("logedInUser", JSON.stringify(logedInUser));

    
    var currentUsersObject = JSON.parse(localStorage.getItem("users"));
    currentUsersObject[logedInUser.username] = logedInUser;

    localStorage.setItem("users",JSON.stringify(currentUsersObject));

}