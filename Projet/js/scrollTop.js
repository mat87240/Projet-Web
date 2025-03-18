document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
