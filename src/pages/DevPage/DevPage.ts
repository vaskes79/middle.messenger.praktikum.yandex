import html from 'bundle-text:./DevPage.html'
function buildSettingsPage() {
  return html;
}

export function demoModals() {
  const btnOpenModal = document.getElementById("openModalBtn");
  const modal: any = document.getElementById('modal');
  btnOpenModal?.addEventListener('click', () => {
    console.log('btnOpenModal')
    if (modal) {
      modal.open();
    }
  })
}

export function DevPage() {
  return buildSettingsPage();
}
