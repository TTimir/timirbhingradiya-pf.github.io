var form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("contact-form-status");
  var spinner = document.getElementById("loading-spinner");
  var data = new FormData(event.target);

  // Show the loading spinner
  spinner.style.opacity = "1";

  // Check if there are empty fields
  var inputs = form.querySelectorAll("input, textarea");
  var hasEmptyFields = false;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      hasEmptyFields = true;
      input.classList.add("error"); // Add error class
    } else {
      input.classList.remove("error"); // Remove error class if not empty
    }
  });

  if (hasEmptyFields) {
    spinner.style.opacity = "0"; // Hide the loading spinner
    status.innerHTML = "<strong>*</strong> Please fill out all fields.";

    // Remove red border after 2 seconds
    setTimeout(() => {
      inputs.forEach((input) => input.classList.remove("error"));
    }, 4000);

    return; // Stop form submission
  }

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      spinner.style.opacity = "0"; // Hide the loading spinner

      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => `<strong>*</strong> ${error["message"]}`)
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      spinner.style.opacity = "0"; // Hide the loading spinner
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}

form.addEventListener("submit", handleSubmit);
