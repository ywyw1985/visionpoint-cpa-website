(function () {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");
  const button = form.querySelector("button[type='submit']");
  const successMessage = form.dataset.success || "Thank you. Your question has been sent.";
  const errorMessage = form.dataset.error || "Something went wrong. Please try again.";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = form.dataset.sending || "Sending...";
    status.textContent = "";
    status.className = "form-status";

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.page = window.location.href;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.message || errorMessage);
      form.reset();
      status.textContent = result.message || successMessage;
      status.classList.add("success");
    } catch (error) {
      status.textContent = error.message || errorMessage;
      status.classList.add("error");
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
})();
