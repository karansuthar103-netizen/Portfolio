$(document).ready(function() {

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              msg.innerHTML = "Message sent successfully"
              setTimeout(function () {
                  msg.innerHTML = ""
              }, 5000)
              form.reset()
          })
          .catch(error => console.error('Error!', error.message))
  })
    
  });
  
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop() + 100;
  var windowHeight = $(window).height();
  var documentHeight = $(document).height();

  $(".header ul li a").each(function () {
    var target = $(this).attr("href");

    if (target.startsWith("#") && $(target).length) {
      var sectionTop = $(target).offset().top;
      var sectionHeight = $(target).outerHeight();

      // Normal section detection
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        $(".header ul li a").removeClass("active");
        $(this).addClass("active");
      }

      // ✅ Special case for CONTACT (last section)
      if (
        scrollPosition + windowHeight >= documentHeight - 5 &&
        target === "#contact"
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#contact']").addClass("active");
      }
    }
  });
}


  
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    // Send form data
    emailjs.sendForm('service_q3prx46', 'template_1eluywh', this)
        .then(function() {
            document.getElementById("msg").innerText = "Message sent successfully!";
            document.getElementById("contact-form").reset();
        }, function(error) {
            document.getElementById("msg").innerText = "Failed to send message. Please try again.";
            console.log('FAILED...', error);
        });
});

 