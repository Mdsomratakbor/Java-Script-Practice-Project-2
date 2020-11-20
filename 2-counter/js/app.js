let count = 0;

const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");
window.onload = function () {
  btns.forEach((btn) => {
    btn.addEventListener("click", digitCounter);
  });
};
function digitCounter(e) {
  const styles = e.currentTarget.classList;
  if (styles.contains("increase")) {
    count++;
  } else if (styles.contains("decrease")) {
    count--;
  } else {
    count = 0;
  }
  valueColorSet(count);
}
function valueColorSet(count) {
  if (count > 0) value.style.color = "green";
  else if (count < 0) value.style.color = "red";
  else if (count === 0) value.style.color = "#222";
  value.textContent = count
}
