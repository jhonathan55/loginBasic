document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const formMessage = document.getElementById("formMessage");

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que recargue la página

        // Capturar los valores del formulario
        const nombres = document.getElementById("nombres").value;
        const apellidos = document.getElementById("apellidos").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Limpiar mensaje anterior
        formMessage.textContent = "Registrando...";
        formMessage.style.color = "blue";

        try {
            // Petición al endpoint (Asegúrate de que el backend esté corriendo)
            const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombres: nombres,
                    apellidos: apellidos,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Registro exitoso
                formMessage.textContent = "Registro exitoso. Redirigiendo al login...";
                formMessage.style.color = "green";
                setTimeout(() => {
                    window.location.href = "index.html"; // Redirige al login
                }, 2000);
            } else {
                // Manejo de errores que envía el backend
                formMessage.textContent = data.message || data.error || "Error al registrarse. Revisa los datos.";
                formMessage.style.color = "red";
            }
        } catch (error) {
            console.error("Error de conexión:", error);
            formMessage.textContent = "Error de red. Asegúrate de que el servidor esté corriendo.";
            formMessage.style.color = "red";
        }
    });
});