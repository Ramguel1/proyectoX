let total = 0;

        function addExpense() {
            const description = document.getElementById('description').value;
            const amount = parseFloat(document.getElementById('amount').value);

            if (description && !isNaN(amount) && amount > 0) {
                const table = document.getElementById('expenses-table').getElementsByTagName('tbody')[0];
                const newRow = table.insertRow();

                const descCell = newRow.insertCell(0);
                descCell.textContent = description;

                const amountCell = newRow.insertCell(1);
                amountCell.textContent = amount.toFixed(2);

                const actionsCell = newRow.insertCell(2);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.onclick = function() {
                    confirmDelete(newRow, amount);
                };
                actionsCell.appendChild(deleteButton);

                total += amount;
                document.getElementById('total').textContent = total.toFixed(2);

                document.getElementById('description').value = '';
                document.getElementById('amount').value = '';
            } else {
                alert('Por favor, ingrese una descripción válida y un gasto mayor a 0.');
            }
        }

        function confirmDelete(row, amount) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteExpense(row, amount);
                    Swal.fire(
                        'Eliminado!',
                        'El gasto ha sido eliminado.',
                        'success'
                    )
                }
            })
        }

        function deleteExpense(row, amount) {
            const table = document.getElementById('expenses-table').getElementsByTagName('tbody')[0];
            table.deleteRow(row.rowIndex - 1);
            total -= amount;
            document.getElementById('total').textContent = total.toFixed(2);
        }

        function clearAll() {
            Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar todo!',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const table = document.getElementById('expenses-table').getElementsByTagName('tbody')[0];
                    table.innerHTML = '';
                    total = 0;
                    document.getElementById('total').textContent = total.toFixed(2);
                    Swal.fire(
                        'Eliminado!',
                        'Todos los gastos han sido eliminados.',
                        'success'
                    )
                }
            })
        }