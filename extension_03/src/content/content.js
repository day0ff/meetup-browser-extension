const body = document.body;

body.innerHTML = body.innerHTML.replace(/google/ig, 'Mozilla');
body.innerHTML = body.innerHTML.replace(/chrome/ig, 'Firefox');

const images = body.querySelectorAll('img');

images.forEach(img => {
    if (img.src.includes('Mozilla') || img.src.includes('Firefox')) {
        img.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8a86066d-e0ce-4b12-a879-76ff8fc61487/d5afu1i-fd658f8f-9c63-4c92-bb8d-cd5148abefc6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhhODYwNjZkLWUwY2UtNGIxMi1hODc5LTc2ZmY4ZmM2MTQ4N1wvZDVhZnUxaS1mZDY1OGY4Zi05YzYzLTRjOTItYmI4ZC1jZDUxNDhhYmVmYzYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BZ_BxPiyk41apS9n7BNAh2i48VQ7PejNEwD0JEPnqvs';
        const size = Math.max(img.width, img.height);
        img.style.width = size + 'px';
        img.style.height = size + 'px';
    }
});
