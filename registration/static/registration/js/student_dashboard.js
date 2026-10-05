async function loadStudents() {
    try {
        const response = await fetch("/api/students/");

        if (response.status === 401) {
            throw new Error("Authentication required. Please log in.");
        }

        if (!response.ok) {
            throw new Error("Failed to load students.");
        }

        const data = await response.json();

        document.getElementById("student-count").textContent = data.count;

        const tableBody = document.getElementById("student-table-body");
        const loadingMessage = document.getElementById("loading-message");

        loadingMessage.style.display = "none";

        if (data.students.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="4">No students found.</td>
                </tr>
            `;
            return;
        }

        data.students.forEach(student => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>${student.year_level}</td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        document.getElementById("loading-message").style.display = "none";
        document.getElementById("error-message").textContent = error.message;
        console.error(error);
    }
}

loadStudents();

function logout() {
    window.location.href = "/registration/logout/";
}