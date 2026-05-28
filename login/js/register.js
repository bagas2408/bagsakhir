document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageElement = document.getElementById("message");

    // Bersihkan pesan lama saat tombol diklik lagi
    if (messageElement) {
        messageElement.innerText = "";
    }

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const data = await res.json();

        if (data.status === "success") {
            // Warnai hijau jika berhasil
            messageElement.style.color = "#00ff87"; 
            messageElement.innerText = "Registrasi berhasil, silakan login";
            
            // Beri jeda 1.5 detik agar user sempat membaca tulisan sukses sebelum pindah halaman
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
            
        } else {
            // Warnai merah jika username sudah ada atau gagal
            messageElement.style.color = "#ff4a4a";
            // Jika API merespon "Username sudah digunakan", otomatis akan tertulis di sini
            messageElement.innerText = data.message || "Gagal registrasi";
        }
    } catch (error) {
        // Antisipasi jika koneksi internet terputus atau server API down
        messageElement.style.color = "#ff4a4a";
        messageElement.innerText = "Terjadi kesalahan koneksi ke server.";
    }
});
