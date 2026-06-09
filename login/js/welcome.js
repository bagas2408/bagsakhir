document.addEventListener("DOMContentLoaded", function () {
    function goLogin() {
        window.location.href = "login/index.html";
    }
    function logout() {
        localStorage.removeItem("username");
        window.location.href = "index.html";
    }
    const user = localStorage.getItem("username");
    if (user) {
        document.getElementById("userInfo").innerText = "Halo, " + user;
        document.getElementById("authArea").innerHTML = `
            <button onclick="window.logout()" class="nav-cta">Keluar</button>
        `;
    }
    window.goLogin = goLogin;
    window.logout = logout;
});
