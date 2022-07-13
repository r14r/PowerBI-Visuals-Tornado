import powerbi from "powerbi-visuals-api";

import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;

export let tornadoChartProperties = {
  dataPoint: {
    fill: <DataViewObjectPropertyIdentifier>{
      objectName: "dataPoint",
      propertyName: "fill",
    },
  },
  categoryAxis: {
    end: <DataViewObjectPropertyIdentifier>{
      objectName: "categoryAxis",
      propertyName: "end",
    },
  },
  categories: {
    show: <DataViewObjectPropertyIdentifier>{
      objectName: "categories",
      propertyName: "show",
    },
    fill: <DataViewObjectPropertyIdentifier>{
      objectName: "categories",
      propertyName: "fill",
    },
    fontSize: <DataViewObjectPropertyIdentifier>{
      objectName: "categories",
      propertyName: "fontSize",
    },
    position: <DataViewObjectPropertyIdentifier>{
      objectName: "categories",
      propertyName: "position",
    },
  },
  labels: {
    show: <DataViewObjectPropertyIdentifier>{
      objectName: "labels",
      propertyName: "show",
    },
    labelPrecision: <DataViewObjectPropertyIdentifier>{
      objectName: "labels",
      propertyName: "labelPrecision",
    },
    fontSize: <DataViewObjectPropertyIdentifier>{
      objectName: "labels",
      propertyName: "fontSize",
    },
    labelDisplayUnits: <DataViewObjectPropertyIdentifier>{
      objectName: "labels",
      propertyName: "labelDisplayUnits",
    },
    insideFill: <DataViewObjectPropertyIdentifier>{
      objectName: "labels",
      propertyName: "insideFill",
    },
    outsideFill: <DataViewObjectPropertyIdentifier>{
      objectName: "labels",
      propertyName: "outsideFill",
    },
  },
  legend: {
    show: <DataViewObjectPropertyIdentifier>{
      objectName: "legend",
      propertyName: "show",
    },
    position: <DataViewObjectPropertyIdentifier>{
      objectName: "legend",
      propertyName: "position",
    },
    showTitle: <DataViewObjectPropertyIdentifier>{
      objectName: "legend",
      propertyName: "showTitle",
    },
    titleText: <DataViewObjectPropertyIdentifier>{
      objectName: "legend",
      propertyName: "titleText",
    },
    labelColor: <DataViewObjectPropertyIdentifier>{
      objectName: "legend",
      propertyName: "labelColor",
    },
    fontSize: <DataViewObjectPropertyIdentifier>{
      objectName: "legend",
      propertyName: "fontSize",
    },
  },
  selectedPropertyIdentifier: <DataViewObjectPropertyIdentifier>{
    objectName: "general",
    propertyName: "selected",
  },
  filterPropertyIdentifier: <DataViewObjectPropertyIdentifier>{
    objectName: "general",
    propertyName: "filter",
  },
  formatString: <DataViewObjectPropertyIdentifier>{
    objectName: "general",
    propertyName: "formatString",
  },
  hasSavedSelection: true,
};
