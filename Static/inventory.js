var tableData = [["Book", "Trade", "Basically a bunch of books", "Michael", "Facebook"],["Train", "$100","A toy train set","Leo","Watsapp"]];

$.ajax({
  type: "GET",
  url: "/inventory/getInventory",
  dataType: "json",
  success: function(res) {
    addTable(res);
  }
})

function addTable(userRequest) {
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
      var addTag = document.createElement('td');
      var addButton = document.createElement('button');
      addButton.innerHTML = "+";
      addButton.className = "add-button";
      addTag.appendChild(addButton);
      var removeTag = document.createElement('td');
      var removeButton = document.createElement('button');
      removeButton.innerHTML = "-";
      removeButton.className = "remove-button";
      removeButton.addEventListener("click", function(event) {
        console.log(event.target.parentNode.parentNode.firstChild.innerHTML);
        $.ajax({
          type: "POST",
          url: "/inventory/removeItem",
          dataType: "json",
          data: {
            Name: event.target.parentNode.parentNode.firstChild.innerHTML
          },
          success: (
            console.log("Removed " + event.target.parentNode.parentNode.firstChild.innerHTML)
          )
        })
      })
      removeTag.appendChild(removeButton);
      
      tr.appendChild(itemNameTag);
      tr.appendChild(itemCostTag);
      tr.appendChild(itemDescTag);
      tr.appendChild(vendorNameTag);
      tr.appendChild(vendorContactTag);
      tr.appendChild(addTag);
      tr.appendChild(removeTag);

      myTableDiv.appendChild(tr);
    }
}