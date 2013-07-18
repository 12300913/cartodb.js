describe("common.geo.ui.Legend", function() {

  describe("Legend", function() {

    var data, legend, map;

    afterEach(function() {
      legend.clean();
    });

    beforeEach(function() {

      map = new cdb.geo.Map();

      data = [
        { name: "Category 1", value: "#f1f1f1" },
        { name: "Category 2", value: "red" },
        { name: "Category 3", value: "#f1f1f1" },
        { name: "Category 4", value: "#ccc" },
      ];

      legend = new cdb.geo.ui.Legend({
        data: data,
        map: map
      });

      $("body").append(legend.render().$el);

    });

    it("should have a 'custom' type set by default", function() {
      expect(legend.model.get("type")).toEqual('custom');
    });

    it("should use the provided model", function() {

      var legend = new cdb.geo.ui.Legend({
        data: data,
        map: map
      });

      expect(legend.model).toBeDefined();
      expect(legend.model.get("type")).toEqual('custom');

    });
    it("should generate a model if no model is provided", function() {

      var legend = new cdb.geo.ui.Legend({
        model: new cdb.geo.ui.LegendModel({ type: "bubble" }),
        data: data,
        map: map
      });

      expect(legend.model).toBeDefined();
      expect(legend.model.get("type")).toEqual('bubble');

    });

    it("should allow to change type", function() {
      legend.model.set({ type: "bubble" });
      expect(legend.model.get("type")).toEqual('bubble');
    });

    it("should have a collection", function() {
      expect(legend.items instanceof cdb.geo.ui.LegendItems).toEqual(true);
    });

    it("should populate the collection", function() {
      expect(legend.items.length).toEqual(4);

      for (var i = 0; i < data.length; i++) {
        expect(legend.items.at(i).get("name")).toEqual(data[i].name);
      }

    });

    it("should set the type of the legend in the element", function() {
      legend.model.set({ type: "bubble" });
      legend.render();
      expect(legend.$el.hasClass("bubble")).toEqual(true);
    });

    it("should create the specific legend based on the type", function() {
      expect(legend.view instanceof cdb.geo.ui.CustomLegend).toEqual(true);
      expect(legend.$el.hasClass("custom")).toEqual(true);

      legend.model.set({ type: "bubble" });
      expect(legend.view instanceof cdb.geo.ui.BubbleLegend).toEqual(true);
      expect(legend.$el.hasClass("bubble")).toEqual(true);
      expect(legend.$el.hasClass("custom")).toEqual(false);
    });

    it("shouldn't create the legend if the type is unknown", function() {
      legend.model.set({ type: "the_legend_of_santana" });
      expect(legend.view instanceof cdb.geo.ui.CustomLegend).toEqual(true);
      expect(legend.$el.hasClass("custom")).toEqual(true);
    });

    it("should show the legend", function() {
      legend.show();
      expect(legend.$el.css('display')).toEqual('block');
    });

    it("should hide the legend", function() {

      legend.show();
      legend.hide();

      waits(300);

      runs(function () {
        expect(legend.$el.css('display')).toEqual('none');
      });

    });
  });

  describe("StackedLegend", function() {

    var data, legends, legendA, legendB, stackedLegend;

    afterEach(function() {
      stackedLegend.clean();
    });

    beforeEach(function() {

      data = [
        { name: "Category 1", value: "#f1f1f1" },
        { name: "Category 2", value: "red" },
        { name: "Category 3", value: "#f1f1f1" },
        { name: "Category 4", value: "#ccc" },
      ];

      legendA = new cdb.geo.ui.Legend({
        data: data
      });

      legendB = new cdb.geo.ui.Legend({
        data: data
      });

      legends = [ legendA, legendB ];

      stackedLegend = new cdb.geo.ui.StackedLegend({
        legends: legends
      });

      $("body").append(stackedLegend.render().$el);

    });

    xit("should have a collection of items", function() {
      expect(stackedLegend.items instanceof cdb.geo.ui.StackedLegendItems).toEqual(true);
    });

    xit("should populate the collection", function() {
      expect(stackedLegend.items.length).toEqual(2);

      //for (var i = 0; i < legends.length; i++) {
        //expect(stackedLegend.items.at(i).toJSON()).toEqual(legends[i]);
      //}

    });

    //it("should generate one element", function() {
      //stackedLegend.render();
      //expec(stackedLegend.$el);
    //});

  });

});
