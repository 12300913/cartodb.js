
(function() {

if(typeof(google) == "undefined" || typeof(google.maps) == "undefined")
  return;

var GMapsTorqueLayerView = function(layerModel, gmapsMap) {

  var extra = layerModel.get('extra_params');
  cdb.geo.GMapsLayerView.call(this, layerModel, this, gmapsMap);
  torque.GMapsTorqueLayer.call(this, {
      table: layerModel.get('table_name'),
      user: layerModel.get('user_name'),
      column: layerModel.get('property'),
      blendmode: layerModel.get('torque-blend-mode'),
      resolution: 1,
      //TODO: manage time columns
      countby: 'count(cartodb_id)',
      sql_api_domain: layerModel.get('sql_api_domain'),
      sql_api_protocol: layerModel.get('sql_api_protocol'),
      sql_api_port: layerModel.get('sql_api_port'),
      animationDuration: layerModel.get('torque-duration'),
      steps: layerModel.get('torque-steps'),
      sql: layerModel.get('query'),
      extra_params: {
        api_key: extra ? extra.map_key: ''
      },
      map: gmapsMap
  });

  this.setCartoCSS(this.model.get('tile_style'));
  this.play();

};

_.extend(
  GMapsTorqueLayerView.prototype,
  cdb.geo.GMapsLayerView.prototype,
  torque.GMapsTorqueLayer.prototype,
  {

  _update: function() {
    var changed = this.model.changedAttributes();
    if(changed === false) return;
    changed.tile_style && this.setCartoCSS(this.model.get('tile_style'));
    changed['torque-blend-mode'] && this.setBlendMode(this.model.get('torque-blend-mode'));
    changed['torque-duration'] && this.setDuration(this.model.get('torque-duration'));
    changed['torque-steps'] && this.setSteps(this.model.get('torque-steps'));
    changed['property'] && this.setColumn(this.model.get('property'));
    'query' in changed && this.setSQL(this.model.get('query'));
  },

  refreshView: function() {
    //TODO: update screen
  },

  onTilesLoaded: function() {
    //this.trigger('load');
    Backbone.Events.trigger.call(this, 'load');
  }

});


cdb.geo.GMapsTorqueLayerView = GMapsTorqueLayerView;


})();
