'use strict'
const checkboxes = document.querySelectorAll('.inbox [type="checkbox"]')


let lastChecked;

function handleChcek(e) {
    let inBetween = false;
    // check if they hand the shift key down
    if (e.shiftKey && this.checked) {
        // go ahead and do what we please
        // loop over every single checkbox
        checkboxes.forEach(checkbox => {
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
                console.log('in between');
            }
            if (inBetween) {
                checkbox.checked = true;
            }
        })
    }
    lastChecked = this;
}
checkboxes.forEach((checkboxe) =>
    checkboxe.addEventListener("click", handleChcek)
);