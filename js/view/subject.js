/**
 * @param {Backbone} Backbone
 * @param {Object} SubjectTemplate
 *
 * @constructor
 */
var SubjectView = function(Backbone, SubjectTemplate) {
  return Backbone.View.extend({

    /**
     * Set the events for this view
     */
    events: {
      'click': '_onClick'
    },

    /**
     * Gets called when this view is clicked
     *
     * @protected
     */
    _onClick: function() {
      this.trigger('selection', this.model);
    },

    /**
     * Renders this template
     *
     * @returns {*}
     */
    render: function() {
      this.$el.attr('data-id', this.model.id);
      this.$el.html(this._renderTemplate());

      return this;
    },

    /**
     * Renders this view's template
     *
     * @protected
     * @returns {Object}
     */
    _renderTemplate: function() {
      return _.template(SubjectTemplate, {
        subject: this.model
      });
    }
  });
};

define([
  'backbone',
  'text!template/subject.html'
], SubjectView);