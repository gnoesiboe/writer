/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 *
 * @param {Backbone} Backbone
 * @param {Backbone.View} ListView
 *
 * @returns {Backbone.View}
 *
 * @constructor
 */
var AppView = function(Backbone, SubjectListView) {
  return Backbone.View.extend({

    /**
     * @type {jQuery}
     */
    _subjectListView: null,

    /**
     * Initializes this app view
     */
    initialize: function() {
      this.setElement('body');
    },

    /**
     * Renders this view
     *
     * @returns {Backbone.View}
     */
    render: function() {
      this._renderListView();

      return this;
    },

    /**
     * @returns {jQuery}
     */
    getSubjectListView: function() {
      if ((this._subjectListView instanceof Backbone.View) === false) {
        this._renderListView();
      }

      return this._subjectListView;
    },

    /**
     * Renders the list view
     */
    _renderListView: function() {
      this._subjectListView = new SubjectListView();
      this._subjectListView.setElement(this.$('#sidebar')).render();
    }
  });
};

define([
  'backbone',
  'view/subjectList'
], AppView);