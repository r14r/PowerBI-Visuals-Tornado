import powerbi from "powerbi-visuals-api";
type Selection<T> = d3.Selection<d3.BaseType, T, d3.BaseType, any>;

import DataViewObject = powerbi.DataViewObject;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import ISelectionId = powerbi.visuals.ISelectionId;
import VisualTooltipDataItem = powerbi.extensibility.VisualTooltipDataItem;

import { valueFormatter as vf, textMeasurementService, interfaces} from "powerbi-visuals-utils-formattingutils";
import IValueFormatter = vf.IValueFormatter;

import TextProperties = interfaces.TextProperties;

import {
    interactivitySelectionService as interactivityService,
    interactivityBaseService
} from "powerbi-visuals-utils-interactivityutils";
import SelectableDataPoint = interactivityService.SelectableDataPoint;
import IInteractivityService = interactivityBaseService.IInteractivityService;

import { legendInterfaces, dataLabelInterfaces } from "powerbi-visuals-utils-chartutils";
import LegendData = legendInterfaces.LegendData;
import VisualDataLabelsSettings = dataLabelInterfaces.VisualDataLabelsSettings;

export interface TornadoChartTextOptions {
    fontFamily?: string;
    fontSize?: number;
}

export interface TornadoChartSeries {
    fill: string;
    name: string;
    selectionId: ISelectionId;
    categoryAxisEnd: number;
}

export interface TornadoChartSettings {
    labelOutsideFillColor: string;
    categoriesFillColor: string;
    labelSettings: VisualDataLabelsSettings;
    showLegend?: boolean;
    showCategories?: boolean;
    categoriesFontSize?: number;
    categoriesPosition?: any;
    legendFontSize?: number;
    legendColor?: string;
    getLabelValueFormatter?: (formatString: string) => IValueFormatter;
}

export interface TornadoChartDataView {
    categories: TextData[];
    series: TornadoChartSeries[];
    settings: TornadoChartSettings;
    legend: LegendData;
    dataPoints: TornadoChartPoint[];
    highlightedDataPoints?: TornadoChartPoint[];
    hasDynamicSeries: boolean;
    hasHighlights: boolean;
    labelHeight: number;
    maxLabelsWidth: number;
    legendObjectProperties: DataViewObject;
    categoriesObjectProperties: DataViewObject;
}

export interface TornadoChartPoint extends SelectableDataPoint {
    dx?: number;
    dy?: number;
    px?: number;
    py?: number;
    angle?: number;
    width?: number;
    height?: number;
    label?: LabelData;
    color: string;
    tooltipData: VisualTooltipDataItem[];
    categoryIndex: number;
    highlight?: boolean;
    value: number;
    minValue: number;
    maxValue: number;
    formatString: string;
}

export interface LabelData {
    dx: number;
    value: number | string;
    source: number | string;
    color: string;
}

export interface LineData {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface TextData {
    text: string;
    height: number;
    width: number;
    textProperties: TextProperties;
}

export interface TornadoBehaviorOptions extends interactivityBaseService.IBehaviorOptions<TornadoChartPoint> {
    columns: Selection<any>;
    clearCatcher: Selection<any>;
    interactivityService: IInteractivityService<TornadoChartPoint>;
}

export interface TooltipCategoryDataItem {
    value?: any;
    metadata: DataViewMetadataColumn[];
}

export interface TooltipSeriesDataItem {
    value?: any;
    highlightedValue?: any;
    metadata: DataViewValueColumn;
}

