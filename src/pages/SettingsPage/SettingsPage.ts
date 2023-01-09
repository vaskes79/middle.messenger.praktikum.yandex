function buildSettingsPage() {
  return `
  <div>
    <h2>Settings</h2>
    <ypr-avatar></ypr-avatar> 
    <ypr-nav></ypr-nav>
    <ypr-colors></ypr-colors>
  </div>
  `
}

export function SettingsPage() {
  return buildSettingsPage();
}
