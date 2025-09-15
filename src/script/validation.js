form?.addEventListener('submit', (e) => {
    // 1) Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    
    // 2) Дополнительная проверка телефона (добавьте этот блок)
    const phoneInput = form.elements.phone; // или используйте нужный селектор
    if (phoneInput && !/^[\d+]{10,15}$/.test(phoneInput.value.replace(/\s/g, ''))) {
        phoneInput.setCustomValidity('Введите корректный номер телефона (только цифры и +)');
        phoneInput.setAttribute('aria-invalid', 'true');
    }
    
    // 3) Проверка встроенных ограничений
    if (!form.checkValidity()) {
        e.preventDefault();
        // Пример: таргетированное сообщение
        const email = form.elements.email;
        if (email?.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail, например name@example.com');
        }
        form.reportValidity(); // показать браузерные подсказки
        // A11y: подсветка проблемных полей
        [...form.elements].forEach(el => {
            if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
        });
        return;
    }
    
    // 4) Успешная «отправка» (без сервера)
    e.preventDefault();
    // Если форма внутри <dialog>, закрываем окно:
    document.getElementById('contactDialog')?.close('success');
    form.reset();
});