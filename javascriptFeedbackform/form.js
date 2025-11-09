class FeedbackFormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.message = document.getElementById("message");
        this.addListeners();
    }

    addListeners() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validateForm();
        });

        // validation
        this.form.addEventListener("input", (e) => this.validateField(e.target));
    }

    validateField(field) {
        if (field.id === "name" && field.value.length < 3) {
            field.style.borderColor = "red";
        } else if (field.id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            field.style.borderColor = "red";
        } else if (field.id === "comments" && field.value.length < 10) {
            field.style.borderColor = "red";
        } else {
            field.style.borderColor = "#ccc";
        }
    }

    validateForm() {
        const name = this.form.name.value.trim();
        const email = this.form.email.value.trim();
        const event = this.form.event.value;
        const rating = this.form.rating.value;
        const comments = this.form.comments.value.trim();

        if (name.length < 3) return this.showMessage("Name must be at least 3 characters.", "error");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return this.showMessage("Enter a valid email.", "error");
        if (!event) return this.showMessage("Please select an event.", "error");
        if (!rating || rating < 1 || rating > 5) return this.showMessage("Select a rating between 1 and 5.", "error");
        if (comments.length < 10) return this.showMessage("Comments must be at least 10 characters.", "error");

        this.saveToLocalStorage({ name, email, event, rating, comments });
        this.showMessage("Feedback submitted successfully!", "success");
        this.clearForm();
    }

    saveToLocalStorage(feedback) {
        let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        feedbacks.push(feedback);
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    }

    clearForm() {
        this.form.reset();
    }

    showMessage(msg, type) {
        this.message.textContent = msg;
        this.message.style.color = type === "success" ? "green" : "red";
    }
}

document.addEventListener("DOMContentLoaded", () => new FeedbackFormHandler("feedbackForm"));
