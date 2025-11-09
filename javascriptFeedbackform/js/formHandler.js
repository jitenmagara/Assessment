import { getItem, setItem, generateId } from "./utils.js";

class FeedbackFormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.message = document.getElementById("message");
        this.attach();
    }

    attach() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.validateForm();
        });
        // real-time validation
        this.form.addEventListener("input", (e) => this.validateField(e.target));
        this.form.addEventListener("blur", (e) => this.validateField(e.target), true);
    }

    validateField(field) {
        const ok = (() => {
            if (field.id === "name") return field.value.trim().length >= 3;
            if (field.id === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
            if (field.id === "comments") return field.value.trim().length >= 10;
            return true;
        })();
        field.style.borderColor = ok ? "#ccc" : "red";
    }

    validateForm() {
        const { name, email, event, comments } = this.form;
        const rating = this.form.querySelector('input[name="rating"]:checked')?.value;

        if (name.value.trim().length < 3) return this.show("Name must be ≥ 3 characters", "error");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return this.show("Invalid email format", "error");
        if (!event.value) return this.show("Please select an event", "error");
        if (!rating || Number(rating) < 1 || Number(rating) > 5) return this.show("Choose rating 1–5", "error");
        if (comments.value.trim().length < 10) return this.show("Comments must be ≥ 10 characters", "error");

        const feedback = {
            id: generateId(),
            name: name.value.trim(),
            email: email.value.trim(),
            event: event.value,
            rating: Number(rating),
            comments: comments.value.trim()
        };

        const feedbacks = getItem("feedbacks");
        feedbacks.push(feedback);
        setItem("feedbacks", feedbacks);

        this.show("Feedback submitted successfully!", "success");
        this.form.reset();
    }

    show(msg, type) {
        this.message.textContent = msg;
        this.message.style.color = type === "success" ? "green" : "red";
    }
}

document.addEventListener("DOMContentLoaded", () => new FeedbackFormHandler("feedbackForm"));
