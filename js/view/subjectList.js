/**
 * @author Gijs Nieuwenhuis <gijs.nieuwenhuis@freshheads.com>
 *
 * @param {Backbone} Backbone
 * @param {Backbone.Collection} SubjectCollection
 * @param {Object} SubjectListTemplate
 * @param {Backbone.View} SubjectView
 *
 * @returns {Object}
 *
 * @constructor
 */
var SubjectListView = function(Backbone, SubjectCollection, SubjectListTemplate, SubjectView) {
  return Backbone.View.extend({

    /**
     * @type {Backbone.Collection}
     */
    _collection: null,

    /**
     * @type {jQuery}
     */
    _subjectInputEl: null,

    /**
     * Holds the events for this view
     */
    events: {
      'click input[type=submit]': '_onSubmitClick',
      'selection': '_onSelectionMade'
    },

    _onSelectionMade: function(e) {
      alert('selection made');
    },

    /**
     * Initializes this view
     */
    initialize: function() {
      // makes sure that all events are executed with 'this' as
      // the context instead of the callback caller object
      _.bindAll(this);

      this._getCollection().fetch();
    },

    /**
     * @param {Object} e
     */
    _onSubmitClick: function(e) {
      e.preventDefault();

      var value = this._getSubjectInputEl().val();

      if (value.length > 0) {
        this._addNewSubject(value);
      }

      this._clearSubjectInput();
    },

    /**
     * Clears the subject input field
     *
     * @protected
     */
    _clearSubjectInput: function() {
      this._getSubjectInputEl().val('');
    },

    /**
     * @protected
     * @param {String} title
     */
    _addNewSubject: function(title) {
      var collection = this._getCollection();

      var subject = collection.create({
        id:     collection.getNextId(),
        title:  title,
        rank:   collection.getNextRank(),
        status: 'i',
        text:   '# ' + title + '\n\nEtiam Lorem Malesuada Ultricies'
      });

      this.$('#list-subjects').append(this._renderSubject(subject));
    },

    /**
     * @protected
     * @returns {jQuery}
     */
    _getSubjectInputEl: function() {
      if (this._subjectInputEl instanceof jQuery) {
        return this._subjectInputEl;
      }

      this._subjectInputEl = this.$('input[name=subject]');
      return this._subjectInputEl;
    },

    /**
     * Sets the supplied subject as the selected
     * subject.
     *
     * @param {Backbone.Model} subject
     */
    selectSubject: function(subject) {
      this._clearActiveState();

      subject.save({ status: 'a' });
      this.$('li[data-id=' + subject.id + ']').addClass('active');
    },

    /**
     * Clears the active state of all items in the list
     *
     * @protected
     */
    _clearActiveState: function() {
      $('#list-subjects li').removeClass('active');
      this._getCollection().inactivateAll();
    },

    /**
     * Renders this view
     *
     * @returns {Backbone.View}
     */
    render: function() {
      this.$el.html(this._renderTemplate());

      var self = this;
      _.each(this._getCollection().models, function(subject) {
        $('#list-subjects').append(self._renderSubject(subject));
      });

      return this;
    },

    /**
     * @protected
     * @returns {Backbone.Collection}
     */
    _getCollection: function() {
      if (this._collection instanceof Backbone.Collection) {
        return this._collection;
      }

      this._collection = new SubjectCollection();
      return this._collection;
    },

    /**
     * @protected
     * @returns {Object}
     */
    _renderTemplate: function() {
      return _.template(SubjectListTemplate);
    },

    /**
     * @param {Backbone.Model} subject
     * @return {Object}
     */
    _renderSubject: function(subject) {
      var view = new SubjectView({
        model: subject
      });

      view.setElement('<li class="subject" />')
          .render()
          .on('selection', this._onSubjectSelection)
      ;

      return view.el;
    }
  });
};

define([
  'backbone',
  'collection/subject',
  'text!template/subjectList.html',
  'view/subject'
], SubjectListView);