import * as d3 from 'd3';

type Selection<T> = d3.Selection<any, T, any, any>;


import {
  interactivitySelectionService as interactivityService,
  interactivityBaseService,
} from "powerbi-visuals-utils-interactivityutils";
import ISelectionHandler = interactivityBaseService.ISelectionHandler;
import SelectableDataPoint = interactivityService.SelectableDataPoint;
import IInteractiveBehavior = interactivityBaseService.IInteractiveBehavior;
import IInteractivityService = interactivityBaseService.IInteractivityService;

import { TornadoBehaviorOptions, TornadoChartPoint } from "../interfaces";
import { tornadoChartUtils } from "../chart/tornadoChartUtils";

export class TornadoWebBehavior implements IInteractiveBehavior {
  private columns: Selection<any>;
  private clearCatcher: Selection<any>;
  private interactivityService: IInteractivityService<TornadoChartPoint>;

  public bindEvents(
    options: TornadoBehaviorOptions,
    selectionHandler: ISelectionHandler
  ) {
    this.columns = options.columns;
    this.clearCatcher = options.clearCatcher;
    this.interactivityService = options.interactivityService;

    this.columns.on("click", (event) => {
      selectionHandler.handleSelection(event.selection, event.ctrlKey);
    });

    this.clearCatcher.on("click", () => {
      selectionHandler.handleClearSelection();
    });
  }

  public renderSelection(hasSelection: boolean) {
    let hasHighlights: boolean = this.interactivityService.hasSelection();
    this.changeOpacityAttribute("fill-opacity", hasSelection, hasHighlights);
    this.changeOpacityAttribute("stroke-opacity", hasSelection, hasHighlights);
  }

  private changeOpacityAttribute(
    attributeName: string,
    hasSelection: boolean,
    hasHighlights: boolean
  ) {
    this.columns.style(attributeName, (d: TornadoChartPoint) => {
      return tornadoChartUtils.getOpacity(
        d.selected,
        d.highlight,
        !d.highlight && hasSelection,
        !d.selected && hasHighlights
      );
    });
  }
}
