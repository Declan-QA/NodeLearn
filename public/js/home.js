async function getUserData(email) {
  const response = await fetch(`/userData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: `{data: ${email}}`
  });
  return await response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  const userEmail = localStorage.getItem("email");
  if (!userEmail) return;  
  alert(`{email: ${userEmail}}`)
  const data = await getUserData(userEmail);

  // Update the content for specific elements
  document.getElementById("job_title").textContent = data.job_title;
  document.getElementById("project_name").textContent = data.project_name;
  document.getElementById("full_name").textContent = data.full_name;
  document.getElementById("date_of_birth").textContent = data.date_of_birth;
  document.getElementById("email").textContent = data.email;
  document.getElementById("recipient_email").textContent = data.recipient_email;

  const usernamerefs = document.getElementsByClassName("username");
  for (let i = 0; i < usernamerefs.length; i++) {
    usernamerefs[i].textContent = data.username;
  }
});


function openModal() {
  document.getElementById("modalOverlay").style.display = "flex";
}

function closeModal() {
  document.getElementById("modalOverlay").style.display = "none";
}