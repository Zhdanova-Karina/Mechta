// ============================================
// FAQ Аккордеон
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Находим все кнопки-переключатели
    const toggles = document.querySelectorAll('.question_toggle');

    // Если на странице нет вопросов — выходим
    if (toggles.length === 0) return;

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            // Находим родительский .question
            const question = this.closest('.question');
            
            // Проверяем, открыт ли уже этот вопрос
            const isActive = question.classList.contains('active');

            // Закрываем все другие вопросы
            document.querySelectorAll('.question').forEach(q => {
                if (q !== question) {
                    q.classList.remove('active');
                }
            });

            // Переключаем текущий вопрос
            if (!isActive) {
                question.classList.add('active');
            } else {
                question.classList.remove('active');
            }
        });
    });
});