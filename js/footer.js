// --- КОНСТАНТЫ ТАЙМИНГОВ (в миллисекундах) ---
          const FLY_TIME = 3000;  // 1.5 секунды полет вверх/вниз
          const HOLD_TOP = 0;     // 0 секунд задержка вверху (по вашему условию)
          const HOLD_BOTTOM = 7000; // 6 секунд задержка внизу

          // Находим элементы в DOM
          const img1 = document.getElementById('img1');
          const img2 = document.getElementById('img2');
          const img3 = document.getElementById('img3');

          // Вспомогательная функция для создания пауз
          const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

          // Функция одиночного полета (вверх или вниз)
          function moveElement(element, startY, endY, duration) {
            return element.animate([
              { transform: `translateY(${startY}px)` },
              { transform: `translateY(${endY}px)` }
            ], {
              duration: duration,
              easing: 'ease-in-out',
              fill: 'forwards' // Фиксируем картинку в конечной точке перемещения
            }).finished; // Возвращаем Promise окончания движения
          }

          // Бесконечный цикл жизни для ОДНОЙ картинки
          async function runImageCycle(element, upDistance) {
            if (!element) return;

            while (true) {
              // 1. Движется вверх (смещение по оси Y на отрицательное значение)
              await moveElement(element, 0, -upDistance, FLY_TIME);

              // 2. Задержка вверху
              await delay(HOLD_TOP);

              // 3. Движется вниз (возвращается из верхней точки в 0)
              await moveElement(element, -upDistance, 0, FLY_TIME);

              // 4. Задержка внизу перед следующим взлетом
              await delay(HOLD_BOTTOM);
            }
          }

          // Главная функция, которая распределяет старты по времени
          async function initAnimations() {
            // Высота взлета картинок (на 200 пикселей вверх)
            const jumpDistance = 200;

            // Картинка 1: Стартует сразу (задержка 0с)
            runImageCycle(img1, jumpDistance);

            // Картинка 2: Стартует с задержкой в 3 секунды
            await delay(4500);
            runImageCycle(img2, jumpDistance);

            // Картинка 3: Стартует с задержкой в 6 секунд (отсчет от старта скрипта, то есть еще через 3с после второй)
            await delay(4500);
            runImageCycle(img3, jumpDistance);
          }

          // Запускаем менеджер анимаций строго после загрузки DOM
          document.addEventListener('DOMContentLoaded', () => {
            initAnimations();
          });
