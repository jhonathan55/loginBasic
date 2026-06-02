document.addEventListener("DOMContentLoaded", () => {
    const requestCodeForm = document.getElementById("requestCodeForm");
    const formMessage = document.getElementById("formMessage");

    requestCodeForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;

        formMessage.textContent = "Procesando solicitud...";
        formMessage.style.color = "blue";

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/request-code/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email })
            });

            const data = await response.json();

            if (response.ok) {
                // Si todo sale bien, mostramos éxito y pasamos a la siguiente pantalla
                formMessage.textContent = data.message;
                formMessage.style.color = "green";

                // Redirigir a la pantalla de cambiar contraseña pasando el email por la URL (opcional pero útil)
                setTimeout(() => {
                    window.location.href = `change_password.html?email=${encodeURIComponent(email)}`;

                }, 2000);
            } else {
                formMessage.textContent = data.error || "Hubo un error al procesar la solicitud.";
                formMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Error:", error);
            formMessage.textContent = "Error de red. Asegúrate de que el servidor esté corriendo.";
            formMessage.style.color = "red";
        }
    });
});