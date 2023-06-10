const DEFAULT_SETTINGS = {
  columnName: "Parent ticket",
  enabled: true,
};

function populateParentTicket(columnName) {
  Array.from(document.querySelectorAll("[role=row]")).forEach((ticket) => {
    const parentTasName = ticket.querySelector(".SpreadsheetGridTaskNameAndDetailsCellGroup-parentTaskName");
    if (!parentTasName) return;

    const parentTicketCell = Array.from(ticket.querySelectorAll("[role=gridcell]")).find((cell) => {
      const ariaLabel = cell.getAttribute("aria-label");
      return ariaLabel && ariaLabel.startsWith(columnName);
    });
    if (!parentTicketCell) return;

    const parent = parentTicketCell.querySelector(".CustomPropertyTextValueInput");
    if (!parent) return;

    const value = parentTasName.innerText.replace(/^‹ /, "");
    const input = createInput(value);

    parent.innerHTML = "";
    parent.appendChild(input);
    parentTasName.remove();
  });
}

function createInput(value) {
  const input = document.createElement("input");

  input.classList.add(
    "TextInputBase",
    "SizedTextInput",
    "SizedTextInput--medium",
    "DynamicTextInput",
    "CustomPropertyTextValueInput-dynamicTextInput"
  );

  input.setAttribute("type", "text");
  input.setAttribute("tabindex", "-1");
  input.setAttribute("placeholder", "—");
  input.value = value;

  return input;
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type !== "childList") return;

    chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
      if (!settings.enabled) return;

      populateParentTicket(settings.columnName);
    });
  });
});

observer.observe(document.body, { childList: true, subtree: true });
