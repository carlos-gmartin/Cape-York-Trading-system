// Testing Array.
//var tableData = [["helicopter","plane"],["Book", "Trade", "Basically a bunch of books", "Michael", "Facebook"],["Train", "$100","A toy train set","Leo","Watsapp"]];

var NameOfCommunity = '';

// Table used to add all of the items from the database in a interactive way. Updates on refresh.
function addTable(userRequest) {  

  console.log(userRequest);

  document.getElementById("myDynamicTable").innerHTML = '';
    for (var index = 0; index < userRequest.length; index++){
      // Gathers the items from the database and stores them as var.
      var item_name = userRequest[index][0];
      var item_cost = userRequest[index][1];
      var item_description = userRequest[index][2];
      var vendor_name = userRequest[index][3];
      var vendor_contact = userRequest[index][4];
    
      // Finds the table id.
      var myTableDiv = document.getElementById("myDynamicTable");

      // Creates new table row tags.
      var tr = document.createElement('tr');
      myTableDiv.appendChild(tr);
         
      // Inserts the table data into that row which has been created.
      var itemNameTag = document.createElement('td');
      itemNameTag.appendChild(document.createTextNode(item_name));
      var itemCostTag = document.createElement('td');
      itemCostTag.appendChild(document.createTextNode(item_cost));
      var itemDescTag = document.createElement('td');
      itemDescTag.appendChild(document.createTextNode(item_description));
      var vendorNameTag = document.createElement('td');
      vendorNameTag.appendChild(document.createTextNode(vendor_name));
      var vendorContactTag = document.createElement('td');
      vendorContactTag.appendChild(document.createTextNode(vendor_contact));
      var buyButton = document.createElement('button');
      // If the trader clicks on the buy button.
      buyButton.innerHTML = 'Buy';
      buyButton.addEventListener("click", function(event) {
        console.log(event.target.parentNode.firstChild.innerHTML);
        // Send the pressed on item to the past transactions table.
        $.ajax({
          type: "POST",
          url: "/dashboard/buyItem",
          dataType: "json",
          data: {
            Name: event.target.parentNode.childNodes[0].innerHTML,
            ItemCost: event.target.parentNode.childNodes[1].innerHTML,
            ItemDescription: event.target.parentNode.childNodes[2].innerHTML,
            VendorName: event.target.parentNode.childNodes[3].innerHTML,
            Contact: event.target.parentNode.childNodes[4].innerHTML,
            Community: NameOfCommunity
          },
          success: (
            console.log("Bought " + event.target.parentNode.childNodes[0].innerHTML)
          )
        })

      })

      // Append the tag to the table in HTML.
      tr.appendChild(itemNameTag);
      tr.appendChild(itemCostTag);
      tr.appendChild(itemDescTag);
      tr.appendChild(vendorNameTag);
      tr.appendChild(vendorContactTag);
      tr.appendChild(buyButton);

      myTableDiv.appendChild(tr);
    }
}

function addTransactionTable(userRequest) {  
  // Transaction table works the same as the dashboard table. Using the same method.
  document.getElementById("myTransactionDynamicTable").innerHTML = '';
    for (var index = 0; index < userRequest.length; index++){
      var item_name = userRequest[index][0];
      var item_cost = userRequest[index][1];
      var item_description = userRequest[index][2];
      var vendor_name = userRequest[index][3];
      var vendor_contact = userRequest[index][4];
      var buyer = userRequest[index][5];
    
      var myTableDiv = document.getElementById("myTransactionDynamicTable");

      var tr = document.createElement('tr');
      myTableDiv.appendChild(tr);
         
      var itemNameTag = document.createElement('td');
      itemNameTag.appendChild(document.createTextNode(item_name));
      var itemCostTag = document.createElement('td');
      itemCostTag.appendChild(document.createTextNode(item_cost));
      var itemDescTag = document.createElement('td');
      itemDescTag.appendChild(document.createTextNode(item_description));
      var vendorNameTag = document.createElement('td');
      vendorNameTag.appendChild(document.createTextNode(vendor_name));
      var vendorContactTag = document.createElement('td');
      vendorContactTag.appendChild(document.createTextNode(vendor_contact));
      var buyerTag = document.createElement('td');
      buyerTag.appendChild(document.createTextNode(buyer));
      
      tr.appendChild(itemNameTag);
      tr.appendChild(itemCostTag);
      tr.appendChild(itemDescTag);
      tr.appendChild(vendorNameTag);
      tr.appendChild(vendorContactTag);
      tr.appendChild(buyerTag);

      myTableDiv.appendChild(tr);
    }
}
//addTable(tableData);

// Testing community array.
//var community = ["Calvin","Victoria","Cape york", "Sidney", "Melbourne"];

// Gets all of the current databases stored on the server.
$.ajax({
  type: "GET",
  url: "/dashboard/getCommunities",
  dataType: "json",
  success: function(res) {
    console.log(res);
    addCommunities(res);
  }
})

function addCommunities(communityData){
  for (let i = 0; i < communityData.length; i++) {
    
    var communityName = communityData[i];

    var communityTagLi = document.createElement('li');
    var communityTagA = document.createElement('a');

    communityTagA.className = "dropdown-item";
    communityTagA.href = "#";
    communityTagA.innerHTML = communityName;
    communityTagA.addEventListener("click", function(event) {
      NameOfCommunity = event.target.innerHTML;
      $.ajax({
        type: "POST",
        url: "/dashboard/getTransactions",
        dataType: "json",
        data: {
          Community: NameOfCommunity
        },
        success: function(res) {
          addTransactionTable(res);
        }
      })
      $.ajax({
        type: "POST",
        url: "/dashboard/getItems",
        dataType: "json",
        data: {
          Community: NameOfCommunity
        },
        success: function(res) {
          addTable(res);
        }
      })
    })
    communityTagLi.appendChild(communityTagA);

    var dropDownList = document.getElementById("dropDownList");

    dropDownList.appendChild(communityTagLi);
  }
}
//addCommunities(community);