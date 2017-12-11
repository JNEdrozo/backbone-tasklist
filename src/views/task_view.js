import Backbone from 'backbone';
import Task from '../models/task';

const TaskView = Backbone.View.extend({
  initialize(params) {
    this.template = params.template;

    // Listen to changes in the model and call render when they occur.
    this.listenTo(this.model, "change", this.render);
  },
  render() {
    const compiledTemplate = this.template(this.model.toJSON());
    this.$el.html(compiledTemplate);
    if (this.model.get('toggle-complete')) {
      this.$el.addClass('toggle-complete');
    } else {
      this.$el.removeClass('toggle-complete');
    }
    return this;
  },
  events: {
    'click button.delete': 'deleteTask',
    'click button.toggle-complete':'toggleComplete',
  },
  deleteTask: function(e) {
    this.model.destroy();
    this.remove();
  },
  toggleComplete: function(e) {
    console.log('toggle complete fired');
    this.$el.toggleClass('toggle-complete');
  },
});

export default TaskView;
