import { getItem, setItem, ensureIds } from "./utils.js";

class FeedbackViewer {
    constructor() {
        const stored = getItem("feedbacks");
        const { data, changed } = ensureIds(stored);
        this.feedbacks = data;
        if (changed) setItem("feedbacks", this.feedbacks); // migrate old entries lacking id

        this.tbody = document.querySelector("#feedbackTable tbody");
        this.noData = document.getElementById("noData");
        this.search = document.getElementById("search");

        this.render(this.feedbacks);
        this.attach();
    }

    attach() {
        this.search.addEventListener("input", () => this.filter());

        // event delegation
        this.tbody.addEventListener("click", (e) => {
            const btn = e.target.closest(".delete-btn");
            if (!btn) return;
            const id = Number(btn.dataset.id);
            if (Number.isFinite(id)) this.deleteById(id);
        });
    }

    render(data) {
        this.tbody.innerHTML = "";
        if (!data.length) {
            this.noData.style.display = "block";
            return;
        }
        this.noData.style.display = "none";

        const rows = data.map(fb => `
      <tr>
        <td data-label="Name">${this.escape(fb.name)}</td>
        <td data-label="Email">${this.escape(fb.email)}</td>
        <td data-label="Event">${this.escape(fb.event)}</td>
        <td data-label="Rating">${this.escape(String(fb.rating))}</td>
        <td data-label="Comments">${this.escape(fb.comments)}</td>
        <td data-label="Action">
          <button class="delete-btn" data-id="${fb.id}">Delete</button>
        </td>
      </tr>
    `).join("");
        this.tbody.insertAdjacentHTML("beforeend", rows);
    }

    filter() {
        const q = this.search.value.toLowerCase();
        const filtered = this.feedbacks.filter(f =>
            f.name.toLowerCase().includes(q) || f.event.toLowerCase().includes(q)
        );
        this.render(filtered);
    }

    deleteById(id) {
        // remove from in-memory
        this.feedbacks = this.feedbacks.filter(f => f.id !== id);
        // persist
        setItem("feedbacks", this.feedbacks);
        // rerender
        this.filter();
    }

    escape(str) {
        return String(str)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }
}

document.addEventListener("DOMContentLoaded", () => new FeedbackViewer());
