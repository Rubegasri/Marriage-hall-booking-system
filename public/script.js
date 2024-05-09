// script.js

document.addEventListener("DOMContentLoaded", function() {
    // Function to handle image click event in the photo gallery
    function handleImageClick(event) {
      const previewImage = document.querySelector("#preview-image");
      previewImage.src = event.target.src;
    }
  
    // Add event listeners to each image in the gallery
    const galleryImages = document.querySelectorAll(".gallery-image");
    galleryImages.forEach(image => {
      image.addEventListener("click", handleImageClick);
    });
  });
  // scripts.js

document.addEventListener("DOMContentLoaded", function() {
    // Function to handle menu item click event
    function handleMenuItemClick(event) {
       const activeMenuItem = document.querySelector('.active');
       if (activeMenuItem) {
          activeMenuItem.classList.remove('active');
          activeMenuItem.querySelector('hr').remove();
       }
       event.target.classList.add('active');
       const hr = document.createElement('hr');
       event.target.appendChild(hr);
    }
 
    // Add event listeners to menu items
    const menuItems = document.querySelectorAll('.nav-menu li');
    menuItems.forEach(item => {
       item.addEventListener('click', handleMenuItemClick);
    });
 });
 