# PowerBI-Visuals-Tornado

This is a clone from the original [Microsoft Repository](https://github.com/microsoft/PowerBI-visuals-Tornado).
Now running with powerbi-visuals-tools 4.0.5, apiVersion 3.8.4 and d3.js v7.

> A bar chart with category values listed vertically. Use for comparing the relative importance of a variable between two distinct groups.

![Tornado chart screenshot](/assets/screenshot.png?raw=true)
# Overview
Tornado charts, are a special type of Bar chart, where the data categories are listed vertically instead of the standard horizontal presentation, and the categories are ordered so that the largest bar appears at the top of the chart, the second largest appears second from the top, and so on. They are so named because the final chart visually resembles either one half of or a complete tornado.

A tornado chart is a common tool used to depict the sensitivity of a result to changes in selected variables. It shows the effect on the output of varying each input variable at a time, keeping all the other input variables at their initial (nominal) values. Typically, you choose a “low” and a “high” value for each input.
