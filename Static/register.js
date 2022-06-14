$.ajax({
    type: "GET",
    url: "/register/getCommunities",
    dataType: "json",
    success: function(res) {
      addCommunities(res);
      console.log(res);
    }
})

function addCommunities(communityData){
    for (let i = 0; i < communityData.length; i++) {
      
      var communityName = communityData[i];
      var dropdownList = document.getElementById('Communities');
      var communityTagOption = document.createElement('option');
      
      communityTagOption.innerHTML = communityName;
      communityTagOption.value = communityName;

      dropdownList.appendChild(communityTagOption);
    }
  }

console.log("Register Found");