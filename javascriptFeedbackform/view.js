class FeedbackViewer {
    constructor() {
        this.feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        this.tableBody = document.querySelector("#feedbackTable tbody");
        this.noData = document.getElementById("noData");
        this.searchInput = document.getElementById("search");
        this.renderTable(this.feedbacks);
        this.addListeners();
    }

    addListeners() {
        this.searchInput.addEventListener("input", () => this.filterFeedbacks());
    }

    renderTable(data) {
        this.tableBody.innerHTML = "";
        if (data.length === 0) {
            this.noData.style.display = "block";
            return;
        }
        this.noData.style.display = "none";
        data.forEach(fb => {
            const row = `<tr>
        <td>${fb.name}</td>
        <td>${fb.email}</td>
        <td>${fb.event}</td>
        <td>${fb.rating}</td>
        <td>${fb.comments}</td>
      </tr>`;
            this.tableBody.innerHTML += row;
        });
    }

    filterFeedbacks() {
        const query = this.searchInput.value.toLowerCase();
        const filtered = this.feedbacks.filter(fb =>
            fb.name.toLowerCase().includes(query) ||
            fb.event.toLowerCase().includes(query)
        );
        this.renderTable(filtered);
    }
}

document.addEventListener("DOMContentLoaded", () => new FeedbackViewer());
