class ModelTasks {
  id;
  title;
  description;
  createdAt;
  updatedAt;
  order;
  archive;

  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.description = model.description;
    this.createdAt = model.createdAt;
    this.updatedAt = model.updatedAt;
    this.order = model.order;
    this.archive = model.archive;
  }
}

module.exports = { ModelTasks };
