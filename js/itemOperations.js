const itemOperations = {
    items: [],
  
    add(item) {
      this.items.push(item);
    },
  
    markUnmark(id) {
      const item = this.search(id);
      if (item) item.toggle();
    },
  
    search(id) {
      return this.items.find(item => item.id === id);
    },
  
    countMarked() {
      return this.items.filter(item => item.marked).length;
    },
  
    remove() {
      this.items = this.items.filter(item => !item.marked);
      return this.items;
    },
  
    update(updatedItem) {
      const index = this.items.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.items[index] = updatedItem;
      }
    }
  };
  