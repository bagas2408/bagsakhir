    /*document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorElement = document.getElementById("passwordError"); 
    const successMessage = document.getElementById("successMessage"); // Mengambil elemen sukses bawaan HTML

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
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
                // Ganti baris nomor 29 dengan baris di bawah ini:
             window.location.href = "../index.html"; 
            }, 1500);

        } else {
            if (errorElement) {
                errorElement.style.color = "#ff4a4a";
                errorElement.innerText = data.message || "Username atau Password salah!";
            } else {
                alert(data.message || "Username atau Password salah!");
            }
        }
    } catch (error) {
        console.error(error);
        alert("Gagal terhubung ke server login.");
    }
});
*/


document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const res = await fetch("https://herisusanta.my.id/javalogin/api/auth.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `action=login&email=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        });

        console.log("Status:", res.status);

        const data = await res.json();

        console.log("Response:", data);

        if (data.status === "success" || data.success === true) {

            localStorage.setItem("username", username);

            alert("Login berhasil!");

            window.location.replace("../index.html");

        } else {
            alert(data.message || "Username atau Password salah!");
        }

    } catch (error) {
        console.error(error);
        alert("Gagal terhubung ke server.");
    }
});
