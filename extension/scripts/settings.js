const DEFAULT_SETTINGS = {
  columnName: "Parent ticket",
  enabled: true,
};

chrome.storage.sync.get(DEFAULT_SETTINGS, (settings) => {
  document.getElementById("column-name").value = settings.columnName;
  document.getElementById("enabled").checked = settings.enabled;
});

document.getElementById("save").addEventListener("click", () => {
  const columnName = document.getElementById("column-name");
  const enabled = document.getElementById("enabled");
  if (!columnName || !enabled) return;

  chrome.storage.sync.set({ columnName: columnName.value, enabled: enabled.checked }, () => {
    window.close();
  });
});
