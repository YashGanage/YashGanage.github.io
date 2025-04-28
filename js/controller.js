window.addEventListener("load", init);

let editMode = false;

function init() {
  bindEvents();
  totalRecords();
}

function bindEvents() {
  document.querySelector("#add").addEventListener("click", addOrUpdate);
  document.querySelector("#delete").addEventListener("click", deleteRecord);
  document.querySelector("#update").addEventListener("click", updateRecord);
  document.querySelector("#searchBtn").addEventListener("click", searchItem);
  document.querySelector("#clearSearchBtn").addEventListener("click", clearSearch);

}
function searchItem() {
    const keyword = document.querySelector("#searchBox").value.trim().toLowerCase();
    const filteredItems = itemOperations.items.filter(item =>
      item.name.toLowerCase().includes(keyword)
    );
    printTable(filteredItems);
  }
  
  function clearSearch() {
    document.querySelector("#searchBox").value = "";
    printTable(itemOperations.items);
  }
  

function addOrUpdate() {
  if (editMode) {
    updateRecord();
    return;
  }
  const item = getItemFromForm();
  itemOperations.add(item);
  printRecord(item);
  clearForm();
  totalRecords();
}

function getItemFromForm() {
  return new Items(
    document.querySelector("#id").value,
    document.querySelector("#name").value,
    document.querySelector("#price").value,
    document.querySelector("#desc").value,
    document.querySelector("#color").value,
    document.querySelector("#url").value
  );
}

function printRecord(item) {
  const tbody = document.querySelector("#tbody");
  const tr = tbody.insertRow();
  let idx = 0;
  for (let key in item) {
    if (key === "marked") continue;
    const cell = tr.insertCell(idx++);
    cell.innerText = item[key];
  }
  const actionCell = tr.insertCell(idx);
  actionCell.appendChild(createIcon("fas fa-trash-alt", trash, item.id));
  actionCell.appendChild(createIcon("fas fa-edit", edit, item.id));
}

function createIcon(classes, fn, id) {
  const icon = document.createElement("i");
  icon.className = classes;
  icon.addEventListener("click", fn);
  icon.setAttribute("data-id", id);
  return icon;
}

function trash() {
  const id = this.getAttribute("data-id");
  const tr = this.closest("tr");
  tr.classList.toggle("alert-danger");
  itemOperations.markUnmark(id);
  totalRecords();
}

function edit() {
  const id = this.getAttribute("data-id");
  const item = itemOperations.search(id);
  if (item) {
    document.querySelector("#id").value = item.id;
    document.querySelector("#name").value = item.name;
    document.querySelector("#price").value = item.price;
    document.querySelector("#amount").value = item.price;
    document.querySelector("#desc").value = item.desc;
    document.querySelector("#color").value = item.color;
    document.querySelector("#url").value = item.url;
    editMode = true;
  }
}

function updateRecord() {
  const updatedItem = getItemFromForm();
  itemOperations.update(updatedItem);
  printTable(itemOperations.items);
  clearForm();
  totalRecords();
  editMode = false;
}

function printTable(items) {
  const tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";
  items.forEach(printRecord);
}

function deleteRecord() {
  itemOperations.remove();
  printTable(itemOperations.items);
  totalRecords();
}

function clearForm() {
  document.querySelector("#id").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#price").value = 100;
  document.querySelector("#amount").value = 100;
  document.querySelector("#desc").value = "";
  document.querySelector("#color").value = "#000000";
  document.querySelector("#url").value = "";
}

function totalRecords() {
  document.querySelector("#total").innerText = "Total: " + itemOperations.items.length;
  document.querySelector("#marked").innerText = " | Marked: " + itemOperations.countMarked();
  document.querySelector("#unmarked").innerText = " | Unmarked: " + (itemOperations.items.length - itemOperations.countMarked());
}
