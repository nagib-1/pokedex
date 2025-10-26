function showLoader() {
  const loader = document.querySelector(".loader");
  loader?.classList.remove("loader-hidden");
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  loader?.classList.add("loader-hidden");
}