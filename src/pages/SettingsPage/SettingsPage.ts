function buildSettingsPage() {
  return `
  <div>
    <h2>Settings</h2>
    <ypr-modal id="modal">
      <ypr-colors slot="content"></ypr-colors>
    </ypr-modal>
    <ypr-avatar></ypr-avatar> 
    <ypr-nav></ypr-nav>
    <ypr-icon name="home" color="var(--orange-400)" width="320px"></ypr-icon>
    <ypr-icon width="120px"></ypr-icon>
    <ypr-icon name="morevert" width="120px"></ypr-icon>
    <button id='openModalBtn' type="button">Open modal</button>
  </div>
  `
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



export function SettingsPage() {
  return buildSettingsPage();
}
