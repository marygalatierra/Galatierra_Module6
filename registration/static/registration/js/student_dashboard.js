document.addEventListener('DOMContentLoaded', function () {

    const nameSearch = document.getElementById('nameSearch');
    const emailSearch = document.getElementById('emailSearch');
    const programFilter = document.getElementById('programFilter');
    const clearFilters = document.getElementById('clearFilters');
    const refreshData = document.getElementById('refreshData');
    const resultCount = document.getElementById('resultCount');
    const tableBody = document.getElementById('studentTableBody');
    const noResults = document.getElementById('noResults');

    function applyFilters() {
        const nameValue = nameSearch.value.toLowerCase().trim();
        const emailValue = emailSearch.value.toLowerCase().trim();
        const programValue = programFilter.value;

        const rows = Array.from(tableBody.querySelectorAll('tr'));

        let visibleCount = 0;

        rows.forEach(function (row) {
            const name = row.dataset.name || '';
            const email = row.dataset.email || '';
            const program = row.dataset.program || '';

            const nameMatch = name.includes(nameValue);
            const emailMatch = email.includes(emailValue);
            const programMatch =
                !programValue || program === programValue;

            const show = nameMatch && emailMatch && programMatch;

            row.style.display = show ? '' : 'none';

            if (show) {
                visibleCount++;
            }
        });

        resultCount.textContent = visibleCount;

        noResults.style.display =
            visibleCount === 0 ? 'block' : 'none';
    }

    function createRow(student) {
        const row = document.createElement('tr');

        row.dataset.name = student.name.toLowerCase();
        row.dataset.email = student.email.toLowerCase();
        row.dataset.program = student.program;

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.program}</td>
            <td>${student.year_level}</td>
        `;

        return row;
    }

    nameSearch.addEventListener('input', applyFilters);
    emailSearch.addEventListener('input', applyFilters);
    programFilter.addEventListener('change', applyFilters);

    clearFilters.addEventListener('click', function () {
        nameSearch.value = '';
        emailSearch.value = '';
        programFilter.value = '';

        applyFilters();
    });

    refreshData.addEventListener('click', async function () {

        refreshData.disabled = true;
        refreshData.textContent = 'Refreshing...';

        try {
            const response = await fetch('/api/students/', {
                method: 'GET',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to load student data.');
            }

            const data = await response.json();

            tableBody.innerHTML = '';

            data.students.forEach(function (student) {
                tableBody.appendChild(createRow(student));
            });

            applyFilters();

        } catch (error) {
            console.error(error);
            alert('Unable to refresh student data.');

        } finally {
            refreshData.disabled = false;
            refreshData.textContent = 'Refresh Data';
        }
    });

    applyFilters();
});