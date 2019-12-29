function triggerFunc() {
  //verify the input is not empty
  var checkifNull = document.getElementById("txt_name").value;
  if (checkifNull !== null) {
    //disable the submit button
    document.getElementById("btn_insert").setAttribute("disabled", null);
    //below condition is executed if the device is online
    if (navigator.onLine) {
      // fetch is in charge of getting the data from the API
      // Call the fetch function passing the url of the API as a parameter
      fetch("http://api.creativehandles.com/getRandomColor")
        .then(function(response) {
          //get the current text of the input into a variable
          var setName = document.getElementById("txt_name").value;

          response.json().then(function(data) {
            //create 2 variables for new card & to store then in democontainer
            var block_to_insert;
            var container_block;

            //create new div for the card & add a class name
            block_to_insert = document.createElement("div");
            block_to_insert.className = "boxed setOfBox";

            //make the card text as the text in the input
            block_to_insert.innerHTML = setName;

            //get democontainer as parent and append the card
            container_block = document.getElementById("democontainer");
            container_block.appendChild(block_to_insert);

            //make an id for the card
            block_to_insert.id = "inserted_block_id";

            //color from api
            let color = data["color"];

            //make the background color as api random color
            block_to_insert.style.backgroundColor = color;

            //get the invert color of the above background color for text
            var styles = window.getComputedStyle(block_to_insert),
              original = styles.backgroundColor,
              channels = original.match(/\d+/g) /* [red, green, blue] */,
              inverted_channels = channels.map(function(ch) {
                return 255 - ch;
              }) /* [255 - red, 255 - green, 255 - blue] */,
              inverted = "rgb(" + inverted_channels.join(", ") + ")";
            //box_inverted_js = document.querySelector(".thetext");
            block_to_insert.style.color = inverted;
            // box_inverted_js.style.color = inverted;

            //reset the fields

            clearFields();
          });
        })
        .catch(function() {
          // This is code if the server returns any errors
          pureCard();
        });

      //below condition is executed if the device is offline
    } else {
      pureCard();
    }
  }
}

function pureCard() {
  var block_to_insert;
  var container_block;

  block_to_insert = document.createElement("div");
  block_to_insert.className = "boxed";
  block_to_insert.innerHTML = document.getElementById("txt_name").value;

  container_block = document.getElementById("democontainer");
  container_block.appendChild(block_to_insert);

  block_to_insert.id = "inserted_block_id";

  clearFields();
}
