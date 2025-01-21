/* eslint-disable no-unused-vars */
function openModal(imageUrl, title) {
    var modal = document.getElementById("imageModal");
    var modalImage = document.getElementById("modalImage");
    var caption = document.getElementById("caption");

    // Set the modal image source and caption
    modal.style.display = "block";
    modalImage.src = imageUrl;
    caption.innerHTML = title;
}


function closeModal() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none";
}
