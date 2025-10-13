// Choropleth of LPA Spend per person (AUD) by state.
export const lpaStateChoroplethSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 900, "height": 600,
  "projection": { "type": "equalEarth" },
  "config": { "view": { "stroke": null }, "legend": { "orient": "right" } },
  "layer": [
    {
      "data": { "url": "data/states_fixed.json",
                "format": { "type": "topojson", "feature": "states" } },
      "mark": { "type": "geoshape", "fill": "#f2f2f2", "stroke": "#cccccc" }
    },
    {
      "data": { "url": "data/states_fixed.json",
                "format": { "type": "topojson", "feature": "states" } },
      "transform": [
        {
          "lookup": "properties.STATE_NAME",
          "from": {
            "data": { "url": "data/LPA_2024_state_totals.csv" },
            "key": "State",
            "fields": ["Revenue_AUD_m","Attendance","Spend_per_person_AUD","Year"]
          }
        },
        { "calculate": "toNumber(datum.Revenue_AUD_m)", "as": "Revenue_m" },
        { "calculate": "toNumber(datum.Attendance)", "as": "Attend" },
        { "calculate": "toNumber(datum.Spend_per_person_AUD)", "as": "SpendPerPerson" }
      ],
      "mark": { "type": "geoshape", "stroke": "white", "strokeWidth": 0.8 },
      "encoding": {
        "color": {
          "field": "SpendPerPerson",
          "type": "quantitative",
          "title": "Spend per person (AUD)",
          "scale": { "scheme": "blues" }
        },
        "tooltip": [
          { "field": "properties.STATE_NAME", "title": "State" },
          { "field": "Revenue_m", "title": "Revenue (AUD m)", "format": ",.1f" },
          { "field": "Attend", "title": "Attendance", "format": "," },
          { "field": "SpendPerPerson", "title": "Spend per person (AUD)", "format": ",.0f" },
          { "field": "Year", "title": "Year" }
        ]
      }
    }
  ]
};
