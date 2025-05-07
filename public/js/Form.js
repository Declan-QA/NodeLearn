const form = document.getElementById("user-form")

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const forminfo = new FormData(form); 
});
