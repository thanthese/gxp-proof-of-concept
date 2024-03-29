// this is where your application code goes

var app;
Ext.onReady(function() {
  app = new gxp.Viewer({
    portalConfig: {
      layout: "border",
      region: "center",

      // by configuring items here, we don't need to configure portalItems
      // and save a wrapping container
      items: [{
        id: "centerpanel",
        xtype: "panel",
        layout: "fit",
        region: "center",
        border: false,
        items: ["mymap"]
      }, {
        id: "south",
        xtype: "container",
        layout: "fit",
        region: "south",
        border: false,
        height: 200
      }, {
        xtype: "container",
        layout: "vbox",
        region: "west",
        align: "stretch",
        pack: "start",
        defaults: {
          width: 200
        },
        width: 200,
        items: [{
          title: "Layers",
          id: "westpanel",
          flex: 1,
          layout: "fit"
        }, {
          xtype: "container",
          id: "legendpanel",
          layout: "fit",
          height: 250
        }]
      }],
      bbar: {id: "mybbar"}
    },

    // configuration of all tool plugins for this application
    tools: [{
      ptype: "gxp_layertree",
      outputConfig: {
        id: "tree",
        border: true,
        tbar: [] // we will add buttons to "tree.bbar" later
      },
      outputTarget: "westpanel"
    }, {
      ptype: "gxp_addlayers",
      actionTarget: "tree.tbar"
    }, {
      ptype: "gxp_removelayer",
      actionTarget: ["tree.tbar", "tree.contextMenu"]
    }, {
      ptype: "gxp_zoomtoextent",
      actionTarget: "map.tbar"
    }, {
      ptype: "gxp_zoom",
      actionTarget: "map.tbar"
    }, {
      ptype: "gxp_navigationhistory",
      actionTarget: "map.tbar"
    }, {
      ptype: "gxp_wmsgetfeatureinfo",
      outputConfig: { width: 400 }
    }, {
      ptype: "gxp_legend",
      outputTarget: "legendpanel"
    }, {
      ptype: "gxp_featuremanager",
      id: "states_manager",
      autoLoadFeatures: true,
      paging: false,
      autoSetLayer: true
    }, {
      ptype: "gxp_featureeditor",
      featureManager: "states_manager",
      autoLoadFeatures: true
    }, {
      ptype: "gxp_featuregrid",
      featureManager: "states_manager",
      outputConfig: {
          loadMask: true
      },
      outputTarget: "south"
    }, {
      ptype: "gxp_googlegeocoder",
      outputTarget: "geocoder",
      outputConfig: { emptyText: "Search for a location ..." }
    }],

    // layer sources
    sources: {
      local: {
        ptype: "gxp_wmscsource",
        url: "/geoserver/wms",
        version: "1.1.1"
      },
      // google: {
      //   ptype: "gxp_googlesource"  // throws "B is not defined" error
      // },
      osm: {
        ptype: "gxp_osmsource"
      }
    },

    // map and layers
    map: {
      id: "mymap", // id needed to reference map in portalConfig above
      tbar: {id: 'geocoder'},
      title: "Map",
      projection: "EPSG:900913",
      units: "m",
      maxResolution: 156543.0339,
      maxExtent: [-20037508, -20037508, 20037508, 20037508],
      center: [-10764594.758211, 4523072.3184791],
      zoom: 3,
      layers: [{
        source: "osm",
        name: "mapnik",
        group: "background"
      }, {
      //   source: "google",
      //   name: "ROADMAP",
      //   group: "background"
      // }, {
        source: "local",
        name: "usa:states",
        selected: true
      }],
      items: [{
        xtype: "gx_zoomslider",
        vertical: true,
        height: 100
      }]
    }

  });
});
