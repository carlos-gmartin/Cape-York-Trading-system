// Testing Array.
//var tableData = [["helicopter","plane"],["Book", "Trade", "Basically a bunch of books", "Michael", "Facebook"],["Train", "$100","A toy train set","Leo","Watsapp"]];

function addTable(userRequest) {  
  document.getElementById("myDynamicTable").innerHTML = '';
    for (var index = 0; index < userRequest.length; index++){
      var item_name = userRequest[index][0];
      var item_cost = userRequest[index][1];
      var item_description = userRequest[index][2];
      var vendor_name = userRequest[index][3];
      var vendor_contact = userRequest[index][4];
    
      var myTableDiv = document.getElementById("myDynamicTable");

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
      
      tr.appendChild(itemNameTag);
      tr.appendChild(itemCostTag);
      tr.appendChild(itemDescTag);
      tr.appendChild(vendorNameTag);
      tr.appendChild(vendorContactTag);

      myTableDiv.appendChild(tr);
    }
}
//addTable(tableData);

// Testing community array.
//var community = ["Calvin","Victoria","Cape york", "Sidney", "Melbourne"];

$.ajax({
  type: "GET",
  url: "/dashboard/getCommunities",
  dataType: "json",
  success: function(res) {
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
      var NameOfCommunity = event.target.innerHTML;
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