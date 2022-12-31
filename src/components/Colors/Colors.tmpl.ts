import { styles } from "./Colors.styles";

export const tmpl = document.createElement('template');

const colors = [
  "gray100",
  "gray95",
  "gray90",
  "gray80",
  "gray70",
  "gray60",
  "gray50",
  "gray40",
  "gray30",
  "gray20",
  "gray10",
  "gray5",
  "pink100",
  "pink90",
  "blue100",
  "blue90",
  "green100",
]

function drawColorBox(colorNames: string[]) {
  const htmlElements = colorNames.map(color => `
    <div class="box box--${color}" style="background-color: var(--${color});"><span>${color}</span></div>
  `)
  return htmlElements.join("");
}

tmpl.innerHTML = `
${styles}
<div class="container">
  ${drawColorBox(colors)}
</div>
`
