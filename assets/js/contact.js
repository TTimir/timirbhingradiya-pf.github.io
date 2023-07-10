var form = document.getElementById("contact-form");
        
        async function handleSubmit(event) {
          event.preventDefault();
          var status = document.getElementById("contact-form-status");
          var spinner = document.getElementById("loading-spinner");
          var data = new FormData(event.target);

          spinner.style.opacity = "1"; // Show the loading spinner

          fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
          }).then(response => {
            spinner.style.opacity = "0"; // Hide the loading spinner

            if (response.ok) {
              status.innerHTML = "Thanks for your submission!";
              form.reset()
            } else {
              response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                  status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                  status.innerHTML = "Oops! There was a problem submitting your form"
                }
              })
            }
          }).catch(error => {
            spinner.style.opacity = "0"; // Hide the loading spinner
            status.innerHTML = "Oops! There was a problem submitting your form"
          });
        }
        form.addEventListener("submit", handleSubmit)