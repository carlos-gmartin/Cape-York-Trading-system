
var tableData = ["hello", "world", "!23", "hello"];

function addTable(userRequest) {
  // if(userRequest[0] != undefined){
    // for (var index = 0; index < userRequest.length; index++){
      var userID = userRequest[0];
      var carParkName = userRequest[1];
      var positionX = userRequest[2];
      var positionY = userRequest[3];
      var timing = userRequest[4];
    
      var myTableDiv = document.getElementById("myDynamicTable");
      
      var tableBody = document.createElement('tbody');
      myTableDiv.appendChild(tableBody);
      var tr = document.createElement('tr');
      tableBody.appendChild(tr);
         
      for (var i = 0; i < 4; i++){

          var userTag = document.createElement('td');
          userTag.appendChild(document.createTextNode(userID));
          var carTag = document.createElement('td');
          carTag.appendChild(document.createTextNode(carParkName));
          var xTag = document.createElement('td');
          xTag.appendChild(document.createTextNode(positionX));
          var yTag = document.createElement('td');
          yTag.appendChild(document.createTextNode(positionY));
          var timingTag = document.createElement('td');
          timingTag.appendChild(document.createTextNode(timing));
          
          tr.appendChild(userTag);
          tr.appendChild(xTag);
          tr.appendChild(yTag);
          tr.appendChild(timingTag);
      }
      myTableDiv.appendChild(tableBody);
  //}
  // else{
  //   var myTableDiv = document.getElementById("myDynamicTable");
  //   var tableBody = document.createElement('tbody');
  //   myTableDiv.appendChild(tableBody);
  //   var tr = document.createElement('tr');
  //   var defaultTag = document.createElement('td');
  //   defaultTag.appendChild(document.createTextNode("No request made yet."));
  // }
}

addTable(tableData);