
"use strict";

/* =====================================
   STUDENT DATA ENTRY - MAIN JAVASCRIPT
   ===================================== */

// Paste your deployed Google Apps Script Web App URL here.
const API_URL = "https://script.google.com/macros/s/AKfycbzZOaM_EbaKx2MuL7aSpJuupBHHCtzpDVKF8ViTquMFAngXD5TuHE8zsYa48eejAvOF/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("studentForm");
  const submitButton = document.getElementById("submitButton");
  const formMessage = document.getElementById("formMessage");

  const successModal = document.getElementById("successModal");
  const successTitle = document.getElementById("successTitle");
  const successText = document.getElementById("successText");
  const successClose = document.getElementById("successClose");

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-"); 


  const dobInput = document.getElementById("dob");

  if (dobInput) {
    dobInput.max = todayString;
  }

  if (!form) {
    console.error("Student form was not found in index.html.");
    return;
  }

  function showMessage(message, type = "error") {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
    formMessage.setAttribute("role", "status");
  }

  function clearMessage() {
    if (!formMessage) return;

    formMessage.textContent = "";
    formMessage.className = "form-message";
  }

  function setLoading(isLoading) {
    if (!submitButton) return;

    submitButton.disabled = isLoading;

    if (isLoading) {
      submitButton.classList.add("is-loading");
      submitButton.setAttribute("aria-busy", "true");
      submitButton.dataset.originalText =
        submitButton.textContent.trim();

      submitButton.innerHTML =
        '<span class="button-spinner" aria-hidden="true"></span>' +
        '<span>Submitting...</span>';
    } else {
      submitButton.classList.remove("is-loading");
      submitButton.removeAttribute("aria-busy");

      submitButton.textContent =
        submitButton.dataset.originalText || "Submit Student";
    }
  }

  function openSuccessModal(name) {
    if (!successModal) {
      showMessage("Student record submitted. Verify it in Google Sheets.", "success");
      return;
    }

    if (successTitle) {
      successTitle.textContent = "Submission Complete!";
    }

    if (successText) {
      successText.textContent =
        "The form submission was completed for " + name + ".";
    }

    successModal.classList.add("active");
    successModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (successClose) {
      successClose.focus();
    }
  }

  function closeSuccessModal() {
    if (!successModal) return;

    successModal.classList.remove("active");
    successModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  if (successClose) {
    successClose.addEventListener("click", closeSuccessModal);
  }

  if (successModal) {
    successModal.addEventListener("click", (event) => {
      if (event.target === successModal) {
        closeSuccessModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSuccessModal();
    }
  });

  function getFormData() {
    return {
      action: "saveStudent",
      id: document.getElementById("id")?.value.trim() || "",
      name: document.getElementById("name")?.value.trim() || "",
      className: document.getElementById("className")?.value || "",
      section: document.getElementById("section")?.value || "",
      rollNo: document.getElementById("rollNo")?.value.trim() || "",
      studentId: document.getElementById("studentId")?.value.trim() || "",
      dob: document.getElementById("dob")?.value || ""
    };
  }

  function validateStudent(data) {
    if (
      !data.id ||
      !data.name ||
      !data.className ||
      !data.section ||
      !data.rollNo ||
      !data.studentId ||
      !data.dob
    ) {
      return "Please fill in all required fields.";
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.dob)) {
      return "Please select a valid date of birth.";
    }

    if (data.dob > todayString) {
      return "Date of birth cannot be in the future.";
    }

    if (data.name.length > 100) {
      return "Student name is too long.";
    }

    return "";
  }

  form.addEventListener("input", clearMessage);
  form.addEventListener("change", clearMessage);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearMessage();

    const student = getFormData();
    const validationError = validateStudent(student);

    if (validationError) {
      showMessage(validationError, "error");
      return;
    }

    if (
      !API_URL ||
      API_URL === "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE"
    ) {
      showMessage(
        "Please add your deployed Google Apps Script Web App URL in script.js.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(student)
      });

      if (!response.ok) {
        throw new Error("Server returned HTTP " + response.status);
      }

      const result = await response.json();

      if (result.success === true || result.status === "success") {
        form.reset();
        if (dobInput) dobInput.max = todayString;
        openSuccessModal(student.name);
      } else {
        showMessage(
          result.message || result.error || "Unable to save the student record.",
          "error"
        );
      }
    } catch (error) {
      console.error("Student submission error:", error);

      showMessage(
        "Could not confirm the submission. Check your Apps Script URL, deployment access and browser console before trying again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  });
});
