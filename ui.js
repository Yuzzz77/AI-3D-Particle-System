export function showErrorModal(message) {
  const errorModal = document.getElementById('errorModal');
  const errorMessage = document.getElementById('errorMessage');

  errorMessage.textContent = message;
  errorModal.classList.add('show');
}

export function setupUiControls({ onShapeChange, onColorChange, onFullscreenError }) {
  const colorInput = document.getElementById('particleColor');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const shapeButtons = Array.from(document.querySelectorAll('.shape-btn'));

  shapeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const shape = button.dataset.shape;
      const changed = onShapeChange(shape);

      if (changed === false) return;

      shapeButtons.forEach((item) => {
        item.classList.toggle('active', item.dataset.shape === shape);
      });
    });
  });

  colorInput.addEventListener('input', () => {
    onColorChange(colorInput.value);
  });

  fullscreenBtn.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      onFullscreenError();
    }
  });
}
