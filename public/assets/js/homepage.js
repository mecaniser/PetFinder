$(document).ready(function() {
  function populateCats() {
    $.ajax({
      url: "/api/cats/",
      method: "GET"
    }).then(function(response) {
      console.log(response);

      var catCarousel = $("#catCarousel");
      // var carousel = document.getElementById("catCarousel");
      // let defaultOption = document.createElement("a");
      // carousel.appendChild(defaultOption);
      // .replace("public/", "")

      for (var i = 0; i < response.length; i++) {
        console.log(response[i]);

        var carouselItem = $("<a>");
        carouselItem.addClass("carousel-item");
        // carouselItem.attr("href", "#");
        carouselItem.text(response[i].breed);

        var carouselImage = $("<img>");
        carouselImage.attr("src", response[i].img1);
        carouselImage.attr("alt", response[i].breed);
        carouselImage.attr("value", response[i].id);
        carouselImage.addClass("cat-image", response[i].id);

        carouselImage.appendTo(carouselItem);
        carouselItem.appendTo(catCarousel);
      }

      $(".carousel").carousel();
    });
  }

  populateCats();

  $(document).on("click", ".cat-image", function() {
    console.log("testing");

    // var catId = window.location.search.split("=")[1];
    var catId = $(this).attr("value");
    console.log("cat id: " + catId);

    $.ajax({
      url: "/api/cats/" + catId,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      $(".breed-title").html(response.breed);
      $(".cat-img1").html("<img src='" + response.img1 + "'>");
      $(".cat-img2").html("<img src='" + response.img2 + "'>");
      $(".cat-img3").html("<img src='" + response.img3 + "'>");
      $(".lifeSpan-holder").text(response.life_span);
      $(".weight-holder").text(response.weight);

      // $(".lifeSpan-holder").html("<h5>Life Span: </h5>" + response.life_span + "<br>");
      // $(".weight-holder").html("<h5>Weight: </h5>"+ response.weight + "<br>");
    });

      $(".slider").slider();
      $(".collapsible").collapsible();

      var elem = document.querySelector(".collapsible.expandable");
      var instance = M.Collapsible.init(elem, {
        accordion: false
    }); // Close accordion Materialize function

  }); // Close click handler/AJAX call for cat info
}); // Close document.ready


function populateBreed() {
  
  $.ajax({
    url: "/api/cats/",
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var dropdown = document.getElementById("breedChoices");

    let defaultOption = document.createElement("option");
    defaultOption.text = "Choose Breed";

    dropdown.appendChild(defaultOption);
    dropdown.selectedIndex = 0;

    for (var i = 0; i < response.length; i++) {
      var option = document.createElement("option");
      option.setAttribute("class", "dropdown-item");
      option.text = response[i].breed;
      option.value = response[i].id;
      dropdown.appendChild(option);
    }

    $("select").formSelect();
  });
}

populateBreed();

var nameInput = $("#name");
var commentInput = $("#comment");
var postIdSelect = $("#breedChoices");

$("#submit").on("click", function handleFormSubmit(event) {
  event.preventDefault();
  // Wont submit the post if we are missing a body or a title
  if (!nameInput.val().trim() || !commentInput.val().trim() || !postIdSelect.val()) {
    return;
  }
  // Constructing a newPost object to hand to the database
  var newPost = {
    name: nameInput.val().trim(),
    comment: commentInput.val().trim(),
    CatId: postIdSelect.val()
  };


  console.log(newPost);
  submitPost(newPost)
})

function submitPost(Post) {
  $.post("/api/comments/", Post, function() {
    // window.location.href = "/";
  });
}