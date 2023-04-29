
function handleSubmit(e){
    e.preventDefault()
    const name=document.getElementById("name").value
    // const rating=document.getElementById("rating").value
    const review=document.getElementById("review").value
    var rating=null
    if(document.getElementById("rating-5").checked){
      rating=(5)
    }
    else if(document.getElementById("rating-4").checked){
      rating=4
    }
    else if(document.getElementById("rating-3").checked){
      rating=3
    }
    else if(document.getElementById("rating-2").checked){
      rating=2
    }
    else if(document.getElementById("rating-1").checked){
      rating=1
    }
    else if(document.getElementById("rating-0").checked){
      rating=0
    }
var table= document.getElementsByClassName("review-table")[0]
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");

    cell1.innerHTML=name;
    cell2.innerHTML=rating;
    cell3.innerHTML=review;
    row.append(cell1)
    row.append(cell2);
    row.append(cell3);

    table.append(row)
    const form = document.getElementById('review-form');

form.addEventListener('submit', (event) => {
  // prevent the form from submitting and refreshing the page
  event.preventDefault();

  // clear the form fields
  form.reset();
});
// const form = document.querySelector("form");
// form.addEventListener("submit", function(e) {
//   e.preventDefault();
//   // Your form submission code here
//   form.reset();
// });


}  
// <------------------------------------------------------------->
//  js for counter


// Set the date we're counting down to
var countDownDate = new Date("June 30, 2023 00:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "Album Already Released";
  }
}, 1000);


