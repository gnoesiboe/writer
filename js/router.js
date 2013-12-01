/**
 * @param {Backbone} Backbone
 * @param {Backbone.View} AppView
 * @param {Backbone.View} WriterView
 * @param {Backbone.Collection} SubjectCollection
 *
 * @constructor
 */
var Router = function(Backbone, AppView, WriterView, SubjectCollection) {
  return Backbone.Router.extend({

    /**
     * @type {Backbone.Collection}
     */
    _subjectCollection: null,

    /**
     * @type {Backbone.View}
     */
    _appView: null,

    /**
     * @extends Backbone.Router.routes
     */
    routes: {

      // Default
      'subject/:id': 'subjectAction',
      '*actions': 'homeAction'
    },

    /**
     * Initializes this router
     */
    initialize: function() {
      this._appView = new AppView();
      this._appView.render();
    },

    /**
     * Homepage (default action)
     */
    homeAction: function() {
      var subject = this._getSubjectCollection().getActive();

      if (subject instanceof Backbone.Model) {
        this._forwardToSubject(subject);
      }
    },

    /**
     * Subject detail action
     *
     * @param {Number} id     Subject id
     */
    subjectAction: function(id) {
      var subject = this._getSubjectCollection().get(id);

      if (typeof subject === 'undefined') {
        this._forwardToHomepage();

        return;
      }

      // set selected subject
      this._appView.getSubjectListView().selectSubject(subject);

      (new WriterView({
        model: subject
      })).render();
    },

    /**
     * Forward the client to the homepage
     *
     * @protected
     */
    _forwardToHomepage: function() {
      this.navigate('');
      this.homeAction();
    },

    /**
     * Forwards the client to the subject detail
     * view for the supplied subject.
     *
     * @protected
     * @param {Backbone.Model} subject
     */
    _forwardToSubject: function(subject) {
      this.navigate(subject.getUri());
      this.subjectAction(subject.get('id'));
    },

    /**
     * @protected
     * @returns {Backbone.Collection}
     */
    _getSubjectCollection: function() {
      if (this._subjectCollection instanceof SubjectCollection) {
        return this._subjectCollection;
      }

      this._subjectCollection = new SubjectCollection();
      this._subjectCollection.fetch();

      return this._subjectCollection;
    }
  });
};

define([
  'backbone',
  'view/app',
  'view/writer',
  'collection/subject'
], Router);