document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        let isValid = true;

        if (!data.name) {
            document.getElementById('nameError').textContent = 'Nama lengkap tidak boleh kosong';
            isValid = false;
        }

        if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
            document.getElementById('emailError').textContent = 'Alamat email tidak valid';
            isValid = false;
        }

        if (!data.phone || !/^\d+$/.test(data.phone)) {
            document.getElementById('phoneError').textContent = 'Nomor telepon harus berupa angka';
            isValid = false;
        }

        if (!data.program) {
            document.getElementById('programError').textContent = 'Program studi harus dipilih';
            isValid = false;
        }

        if (!isValid) return;

        // Send data to Formspree
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (response.ok) {
                alert('Pendaftaran berhasil dikirim!');
                form.reset();
            } else {
                alert('Terjadi kesalahan saat mengirim formulir.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim formulir.');
        }
    });
});
