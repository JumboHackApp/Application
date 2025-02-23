window.addEventListener('load', function() {
    setTimeout(() => {
        document.getElementById('fadeImage').style.opacity = 1;

        setTimeout(() => {
            let boxes = document.querySelectorAll('.box');
            boxes.forEach((box, index) => {
                setTimeout(() => {
                    box.style.opacity = 1;
                    box.style.animation = "bounce 0.6s ease-in-out infinite";
                }, index * 500);
            });
        }, 2000);

    }, 1000);
});