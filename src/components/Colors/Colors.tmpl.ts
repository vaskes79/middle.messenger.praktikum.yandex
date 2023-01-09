import { styles } from "./Colors.styles";

export const tmpl = document.createElement('template');

const colors = [
  "green-900",
  "green-800",
  "green-700",
  "green-600",
  "green-500",
  "green-400",
  "green-300",
  "green-200",
  "green-100",
  "orange-900",
  "orange-800",
  "orange-700",
  "orange-600",
  "orange-500",
  "orange-400",
  "orange-300",
  "orange-200",
  "orange-100",
  "gray-900",
  "gray-800",
  "gray-700",
  "gray-600",
  "gray-500",
  "gray-400",
  "gray-300",
  "gray-200",
  "gray-100",
  "blue-900",
  "blue-800",
  "blue-700",
  "blue-600",
  "blue-500",
  "blue-400",
  "blue-300",
  "blue-200",
  "blue-100",
  "red-100",
  "red-900",
  "red-800",
  "red-700",
  "red-600",
  "red-500",
  "red-400",
  "red-300",
  "red-200",
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
