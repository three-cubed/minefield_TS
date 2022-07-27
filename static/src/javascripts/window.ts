function goTo(page: string): void {
    window.location.href = page;
}

function detectMobileOrNarrow(): void {
    if (window.innerWidth < 1000) goTo('/narrow'); // Use 1000 for deployment
}

detectMobileOrNarrow();

window.onresize = detectMobileOrNarrow;
