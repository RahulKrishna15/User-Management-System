const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Handle form submissions
const handleFormSubmit = async (
  formElement,
  submitUrl,
  successCallback,
  errorCallback
) => {
  formElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {};
    new FormData(formElement).forEach((value, key) => {
      formData[key] = value;
    });

    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (typeof successCallback === "function") {
          successCallback(data);
        }
      } else {
        if (typeof errorCallback === "function") {
          errorCallback(data.message || "Error processing your request");
        }
      }
    } catch (error) {
      if (typeof errorCallback === "function") {
        errorCallback("Network error. Please try again.");
      }
    }
  });
};

// Show notification
const showNotification = (
  element,
  message,
  type = "success",
  duration = 3000
) => {
  element.textContent = message;
  element.className = `alert alert-${type}`;
  element.style.display = "block";

  if (duration > 0) {
    setTimeout(() => {
      element.style.display = "none";
    }, duration);
  }
};

// Check authentication
const checkAuth = async (redirectUrl) => {
  try {
    const response = await fetch("/user/info");

    if (!response.ok) {
      window.location.href = redirectUrl || "/user/login";
      return null;
    }

    return await response.json();
  } catch (error) {
    window.location.href = redirectUrl || "/user/login";
    return null;
  }
};

// Logout function
const setupLogout = (buttonId) => {
  const logoutButton = document.getElementById(buttonId);

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await fetch("/user/logout");
        localStorage.removeItem("token");
        window.location.href = "/";
      } catch (error) {
        console.error("Logout error:", error);
      }
    });
  }
};
