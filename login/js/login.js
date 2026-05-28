document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorElement = document.getElementById("passwordError"); 
    const successMessage = document.getElementById("successMessage"); // Mengambil elemen sukses bawaan HTML

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            // 1. Simpan username ke localStorage
            localStorage.setItem('username', data.user.username || 'User');

            // 2. Tampilkan efek animasi sukses bawaan template kamu
            if (successMessage) {
                successMessage.classList.add('visible');
                successMessage.style.display = "block"; // Memastikan elemennya muncul
            }

            // 3. Beri jeda 1,5 detik sebelum pindah halaman agar animasinya selesai berjalan
            setTimeout(() => {
                // Pastikan nama file beranda di luar folder login adalah index.html
                window.location.href = "../index.html"; 
            }, 1500);

        } else {
            if (errorElement) {
                errorElement.style.color = "#ff4a4a";
                errorElement.innerText = data.message || "Email atau Password salah!";
            } else {
                alert(data.message || "Email atau Password salah!");
            }
        }
    } catch (error) {
        console.error(error);
        alert("Gagal terhubung ke server login.");
    }
});
