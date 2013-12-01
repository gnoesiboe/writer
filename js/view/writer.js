/**
 * @param {Backbone} Backbone
 * @param {Object} _
 * @param {Object} WriterTemplate
 *
 * @returns {Backbone.View}
 *
 * @constructor
 */
var WriterView = function(Backbone, _, WriterTemplate) {
  return Backbone.View.extend({

    /**
     * @type {Object}
     */
    _inputEl: null,

    /**
     * Defines if the edit mode is currently on
     */
    _edit: false,

    /**
     * Defines the events for this view
     */
    events: {
      'keypress': '_onKeyUp'
    },

    /**
     * Initialize function
     */
    initialize: function() {
      this.setElement('#content');

      _.bindAll(this);

      $(document).bind('keyup', this._onKeyUp);
    },

    /**
     * @protected
     * @returns {boolean}
     */
    _inEditMode: function() {
      return this._edit === true;
    },

    /**
     * Gets called when a key is clicked
     *
     * @protected
     * @param {Object} e
     */
    _onKeyUp: function(e) {
      if (this._inEditMode() === false) {
        if (this._isEditStartKeyCommand(e) === true) {
          this._toggleEditMode();
        }
      }
      else {
        // this is edit mode

        if (this._isEditEndKeyCommand(e) === true) {
          this._saveEditContents();
          this._toggleEditMode();
          this.render();
        }
      }
    },

    /**
     * Persists the contents of the writer textarea
     */
    _saveEditContents: function() {
      this.model.save({
        text: $('#writer-edit').val()
      });
    },

    /**
     * @param e
     * @returns {boolean}
     * @private
     */
    _isEditEndKeyCommand: function(e) {
      return e.ctrlKey === true && Number(e.which) === Number(13); // 'ctrl + enter' combination
    },

    /**
     * @protected
     * @param {Object} e
     * @returns {boolean}
     */
    _isEditStartKeyCommand: function(e) {
      return Number(e.which) === Number(69); // 'e' key
    },

    /**
     *
     */
    _toggleEditMode: function() {
      if (this._edit === false) {
        this.$('button[name=save], #writer-edit').removeClass('hide');
        this.$('#writer-detail').addClass('hide');
        this.$('h1').addClass('hide');
      }
      else {
        this.$('button[name=save], #writer-edit').addClass('hide');
        this.$('#writer-detail').removeClass('hide');
        this.$('h1').removeClass('hide');
      }

//      this._getInputEl().autogrow({});
      this._edit = !this._edit;
    },

    /**
     *
     * @returns {Backbone.View}
     */
    render: function() {
      this.$el.html(this._renderTemplate());

//      this._getInputEl().autogrow({});

      return this;
    },

    /**
     * @returns {Object}
     */
    _getInputEl: function() {
      if (_.isNull(this._inputEl) === true) {
        this._inputEl = this.$('#writer-edit');
      }

      return this._inputEl;
    },

    /**
     * Renders this view's template
     *
     * @returns {*}
     */
    _renderTemplate: function() {
      return _.template(WriterTemplate, {
        subject: this.model
      });
    }
  });
};

define([
  'backbone',
  'underscore',
  'text!template/writer.html',
  'jqueryAutogrow'
], WriterView);