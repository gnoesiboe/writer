define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  return Backbone.Model.extend({

    /**
     * @returns {string}
     */
    getUri: function() {
      return '#subject/' + this.get('id');
    },

    /**
     * @param {String} status
     * @returns {boolean}
     */
    hasStatus: function(status) {
      return this.get('status') === status;
    },

    /**
     * Returns the text converted to HTML
     *
     * @returns {String}
     */
    getRenderedText: function() {
      var text = this.get('text'),
          output = '',
          self = this;

      // split on line break
      _.each(text.split(/\n\r?/), function(part) {

        part = self._applyHeaders(part);
        part = self._applyCheckboxes(part);
        part = self._applyTags(part);
        part = self._applyIdentiation(part);

        output += '<p>' + part + '</p>';
      });

      return output;

      /*text = this._applyHeaders(text);
      text = this._applyCheckboxes(text);
      text = this._applyTags(text);
      text = this._applyNewLineToBreak(text);

      return text;*/
    },

    _applyIdentiation: function(text) {
      var match = text.match(/^(\s+)/);

      if (match !== null) {
        var prefix = '';
        for (var i = 0, l = match[0].length; i < l; i++) {
          prefix += '<span class="indent"><!-- --></span>';
        }

        return text.replace(/^(\s+)/, prefix);
      }

      return text;
      console.log(match);
      /*if (match = text.match(/^(\s+)/) !== null) {
        console.log(match);
      }*/
      return text.replace(/^(\s+)/g, '&nbsp;');
    },

    _applyTags: function(text) {
      return text.replace(/(@[^ ]+)/g, '<span class="tag">$1</span>');
    },

    /**
     * @protected
     *
     * @param {String} text
     * @returns {String}
     */
    _applyHeaders: function(text) {
      text = text.replace(/##(.*)/, '<h1 class="title-3">$1</h1>');
      text = text.replace(/#(.*)/, '<h1 class="title-2">$1</h1>');

      return text;
    },

    /**
     * @protected
     *
     * @param {String} text
     * @returns {String}
     */
    _applyCheckboxes: function(text) {
      text = text.replace(/\[](.*)/g, '<input type="checkbox" disabled="disabled" /> $1');
      text = text.replace(/\[x](.*)/g, '<input type="checkbox" disabled="disabled" checked="checked" /> $1');

      return text;
    }
  });
});