const tbody = document.querySelector("#dataTable tbody");

function addRow() {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input type="text" placeholder="Category"></td>
    <td><input type="number"></td>
    <td><input type="number"></td>
    <td><input type="number"></td>
    <td><input type="number"></td>
    <td><input type="number"></td>
    <td><button onclick="this.parentElement.parentElement.remove()">X</button></td>
  `;

  tbody.appendChild(row);
}

// add a few starter rows
for (let i = 0; i < 5; i++) addRow();

function getData() {
  const rows = document.querySelectorAll("#dataTable tbody tr");

  return Array.from(rows).map(row => {
    const inputs = row.querySelectorAll("input");

    return {
      label: inputs[0].value,
      self: parseFloat(inputs[1].value),
      avg: parseFloat(inputs[2].value),
      min: parseFloat(inputs[3].value),
      max: parseFloat(inputs[4].value),
      nr: parseInt(inputs[5].value)
    };
  });
}

function generateChart() {
  const data = getData();
  const svg = document.getElementById("chart");

  svg.innerHTML = "";

  const width = 900;
  const left = 200;
  const chartWidth = 400;
  const rowHeight = 30;

  function x(v) {
    return left + (v / 10) * chartWidth;
  }

  data.forEach((d, i) => {
    const y = 40 + i * rowHeight;

    // label
    const label = createText(d.label, left - 10, y);
    label.setAttribute("class", "label");
    svg.appendChild(label);

    // range
    const rect = createRect(
      x(d.min),
      y - 8,
      x(d.max) - x(d.min),
      14,
      "range"
    );
    svg.appendChild(rect);

    // self
    if (!isNaN(d.self)) {
      svg.appendChild(createCircle(x(d.self), y, "self-dot"));
    }

    // avg
    if (!isNaN(d.avg)) {
      svg.appendChild(createCircle(x(d.avg), y, "avg-dot"));
    }

    // nr
    const nr = createText("N/R: " + (d.nr || 0), left + chartWidth + 60, y);
    nr.setAttribute("class", "nr");
    svg.appendChild(nr);
  });
}

function createText(text, x, y) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "text");
  el.setAttribute("x", x);
  el.setAttribute("y", y);
  el.textContent = text;
  return el;
}

function createRect(x, y, w, h, cls) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  el.setAttribute("x", x);
  el.setAttribute("y", y);
  el.setAttribute("width", w);
  el.setAttribute("height", h);
  el.setAttribute("class", cls);
  return el;
}

function createCircle(x, y, cls) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  el.setAttribute("cx", x);
  el.setAttribute("cy", y);
  el.setAttribute("r", 4);
  el.setAttribute("class", cls);
  return el;
}
