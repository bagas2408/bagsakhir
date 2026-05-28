document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorElement = document.getElementById("passwordError"); // tempat munculin teks eror jika salah

    try {
        // Mengirim data login ke API server herisusanta
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            // JIKA SUKSES LOGIN:
            // 1. Simpan nama/username dari server ke browser supaya bisa dipanggil "Halo, nama"
            localStorage.setItem('username', data.user.username || 'User');

            // 2. LANGSUNG MASUK KE WEB UTAMA (Landing Page)
            // "../index.html" artinya keluar dari folder login dan buka index.html utama yang di luar
            window.location.href = "../index.html"; 
        } else {
            // Jika email/password salah, munculkan pesan eror dari server
            if (errorElement) {
                errorElement.style.color = "#ff4a4a";
                errorElement.innerText = data.message || "Email atau Password salah!";
            } else {
                alert(data.message || "Email atau Password salah!");
            }
        }
    } catch (error) {
        alert("Gagal terhubung ke server login.");
    }
});
