import Ember from 'ember';

export default Ember.Component.extend({
  base: 'https://cartogram-relay.herokuapp.com/infogram?sql=',
  build: function() {
    var base = this.get('base');
    var user = this.get('user');
    var sql = this.get('sql');

    if(user && sql) {
      return base + encodeURIComponent(sql) + '&user=' + user;
    }
  },
  urlString: function() {
    var string = this.build();
    return string;
  }.property('user,sql,groupBy,aggrBy,val')
});
