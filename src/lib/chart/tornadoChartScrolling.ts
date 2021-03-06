import powerbi from "powerbi-visuals-api";

import * as d3 from "d3";

import * as jQuery from "jquery";

type Selection<T> = d3.Selection<any, T, any, any>;

import IViewport = powerbi.IViewport;

import * as SVGUtil from "powerbi-visuals-utils-svgutils";

import IMargin = SVGUtil.IMargin;
import translate = SVGUtil.manipulation.translate;

import { TornadoChartDataView } from "../interfaces";
import { TornadoChart } from "../../visual";

export class TornadoChartScrolling {
    public isScrollable: boolean;
    public get scrollViewport(): IViewport {
        return {
            height: this.viewport.height,
            width: this.viewport.width
                - ((this.isYScrollBarVisible && this.isScrollable) ? TornadoChart.ScrollBarWidth : 0)
        };
    }

    private static ScrollBarMinLength: number = 15;
    private static ExtentFillOpacity: number = 0.125;
    private static DefaultScaleMultipler: number = 1;

    private isYScrollBarVisible: boolean;
    private brushGraphicsContextY: Selection<any>;
    private scrollYBrush: d3.BrushBehavior<any> = d3.brushY();

    private getRoot: () => Selection<any>;
    private getViewport: () => IViewport;
    private getPrefferedHeight: () => number;

    private get root(): Selection<any> {
        return this.getRoot();
    }

    private get viewport(): IViewport {
        return this.getViewport();
    }

    constructor(
        getRoot: () => Selection<any>,
        getViewport: () => IViewport,
        getMargin: () => IMargin,
        getPrefferedHeight: () => number,
        isScrollable: boolean) {

        this.getRoot = getRoot;
        this.getViewport = getViewport;
        this.isScrollable = isScrollable;
        this.getPrefferedHeight = getPrefferedHeight;
    }

    public renderY(data: TornadoChartDataView, onScroll: (event) => {}): void {
        this.isYScrollBarVisible = this.isScrollable
            && this.getPrefferedHeight() > this.viewport.height
            && this.viewport.height > 0
            && this.viewport.width > 0;

        this.brushGraphicsContextY = this.createOrRemoveScrollbar(this.isYScrollBarVisible, this.brushGraphicsContextY, "y brush");
        if (!this.isYScrollBarVisible) {
            onScroll.call(this, jQuery.extend(true, {}, data), 0, 1);
            return;
        }

        let scrollSpaceLength: number = this.viewport.height;
        let extentData: any = this.getExtentData(this.getPrefferedHeight(), scrollSpaceLength);

        let onRender = (selection: any, wheelDelta: number = 0) => {
            let position = selection || extentData.value;

            if (wheelDelta !== 0) {
                // Handle mouse wheel manually by moving the scrollbar half of its size
                let halfScrollsize: number = (position[1] - position[0]) / 2;
                position[0] += (wheelDelta > 0) ? halfScrollsize : -halfScrollsize;
                position[1] += (wheelDelta > 0) ? halfScrollsize : -halfScrollsize;

                if (position[0] < 0) {
                    let offset: number = -position[0];
                    position[0] += offset;
                    position[1] += offset;
                }
                if (position[1] > scrollSpaceLength) {
                    let offset: number = position[1] - scrollSpaceLength;
                    position[0] -= offset;
                    position[1] -= offset;
                }
                // Update the scroll bar accordingly and redraw
                this.scrollYBrush.move(this.brushGraphicsContextY, position);
                this.brushGraphicsContextY.select(".selection").attr("y", position[0]);
            }

            let scrollPosition: number[] = extentData.toScrollPosition(position, scrollSpaceLength);
            onScroll.call(this, jQuery.extend(true, {}, data), scrollPosition[0], scrollPosition[1]);
        };

        this.scrollYBrush.extent([[0, 0], [TornadoChart.ScrollBarWidth, this.viewport.height]]);

        this.renderScrollbar(
            this.scrollYBrush,
            this.brushGraphicsContextY,
            this.viewport.width,
            extentData.value[1],
            onRender
        );

        // @TODO
        console.error('TODO: getEvent ')
        onRender(null);
    }

    private createOrRemoveScrollbar(isVisible: boolean, brushGraphicsContext: Selection<any>, brushClass: string) {
        if (isVisible && this.isScrollable) {
            return brushGraphicsContext || this.root.append("g").merge(this.root).classed(brushClass, true);
        }

        return brushGraphicsContext ? void brushGraphicsContext.remove() : undefined;
    }

    private renderScrollbar(
        brush: d3.BrushBehavior<any>,
        brushGraphicsContext: Selection<any>,
        brushX: number,
        scrollbarHight: number,
        onRender: (d3Selection: any, value: number) => void
    ): void {
        
        brush.on("brush", (event) => {
            let d3Selection: Selection<any> = event.selection;
            window.requestAnimationFrame(() => onRender(d3Selection, 0));
        });
        this.root.on("wheel", (event) => {
            let d3Selection: Selection<any> = event.selection;

            if (!this.isYScrollBarVisible) return;
            onRender(d3Selection, event.deltaY);
        });

        brushGraphicsContext
            .attr("transform", translate(brushX, 0))
            .attr("drag-resize-disabled", "true");

        brushGraphicsContext
            .call(brush)
            .call(brush.move, [0, scrollbarHight]);

        // Disabling the zooming feature
        brushGraphicsContext
            .selectAll(".handle")
            .remove();

        brushGraphicsContext
            .select(".background")
            .remove();

        brushGraphicsContext
            .select(".overlay")
            .remove();

        brushGraphicsContext
            .selectAll(".selection")
            .style("fill-opacity", TornadoChartScrolling.ExtentFillOpacity)
            .style("cursor", "default")
            .style("display", null);
    }

    private getExtentData(svgLength: number, scrollSpaceLength: number): any {
        let value: number = scrollSpaceLength * scrollSpaceLength / svgLength;

        let scaleMultipler: number = TornadoChartScrolling.ScrollBarMinLength <= value
            ? TornadoChartScrolling.DefaultScaleMultipler
            : value / TornadoChartScrolling.ScrollBarMinLength;

        value = Math.max(value, TornadoChartScrolling.ScrollBarMinLength);

        let toScrollPosition = (extent: number[], scrollSpaceLength: number): number[] => {
            let scrollSize: number = extent[1] - extent[0];
            let scrollPosition: number = extent[0] / (scrollSpaceLength - scrollSize);

            scrollSize *= scaleMultipler;

            let start: number = (scrollPosition * (scrollSpaceLength - scrollSize));
            let end: number = (start + scrollSize);

            return [start / scrollSpaceLength, end / scrollSpaceLength];
        };

        return { value: [0, value], toScrollPosition: toScrollPosition };
    }

    public clearData(): void {
        if (this.brushGraphicsContextY) {
            this.brushGraphicsContextY
                .selectAll("*")
                .remove();
        }
    }
}
