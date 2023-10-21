function modal() {
  const modalbuttons = document.querySelectorAll("[data-modal]");
  modalbuttons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      const src = this.getAttribute("data-src");
      const modalElement = document.querySelector("#" + target);
      const iframe = modalElement.querySelector("iframe");
      document.body.classList.add("overflow-hidden");
      if (src) {
        iframe.src = src;
      }
      modalElement.classList.add("active");
      modalElement.addEventListener("click", function () {
        this.classList.remove("active");
        if (src) {
          iframe.src = "";
        }
        document.body.classList.remove("overflow-hidden");
      });
    });
  });
}

modal();
