define([
  'collection/base',
  'localStorage',
  'model/subject'
], function(BaseCollection, LocalStorage, Subject) {
  return BaseCollection.extend({

    /**
     * For storage we use local storage
     */
    localStorage: new LocalStorage('SubjectCollection'),

    /**
     * Set model for this collection
     */
    model: Subject,

    /**
     * Inactivates (status is inactive) all items
     * in the collection
     */
    inactivateAll: function() {
      _.each(this.models, function(subject) {
        subject.save({
          status: 'i'
        })
      });
    },

    /**
     * @returns {Backbone.Model|Boolean}
     */
    getActive: function() {
      var activeModels = this.filter(function(subject) {
        return subject.hasStatus('a') === true;
      });

      if (activeModels.length > 0) {
        return activeModels[0];
      }

      return false;
    }
  });
});