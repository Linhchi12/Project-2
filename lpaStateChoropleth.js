// lpaStateChoropleth.js
// Choropleth: LPA spend per person (AUD) by Australian state

export const lpaStateChoroplethSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 900,
  "height": 600,
  "projection": { "type": "equalEarth" },
  "config": { "view": { "stroke": null }, "legend": { "orient": "right" } },

  // --- Use GeoJSON at the repo root ---
  "data": { "url": "states.geojson", "format": { "type": "geojson" } },

  // --- If you actually have TopoJSON named states.json, replace the 'data' above with:
  // "data": { "url": "states.json", "format": { "type": "topojson", "feature": "states" } },

  "transform": [
    // Normalise the state name key from properties (handles STATE_NAME / STATES_NAME / name)
    {
      "calculate":
        "isValid(datum.properties.STATE_NAME) ? datum.properties.STATE_NAME : " +
        "(isValid(datum.properties.STATES_NAME) ? datum.properties.STATES_NAME : " +
        "(isValid(datum.properties.name) ? datum.properties.name : null))",
      "as": "state_key"
    },

    // Lookup LPA metrics by state
    {
      "lookup": "state_key",
      "from": {
        "data": { "url": "LPA_2024_state_totals.csv" },
        "key": "State",
        "fields": ["Revenue_AUD_m","Attendance","Spend_per_person_AUD","Year"]
      }
    },

    // Ensure numeric for coloring
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
      { "field": "state_key", "title": "State" },
      { "field": "Revenue_AUD_m", "title": "Revenue (AUD m)", "format": ",.1f" },
      { "field": "Attendance", "title": "Attendance", "format": "," },
      { "field": "SpendPerPerson", "title": "Spend per person (AUD)", "format": ",.0f" },
      { "field": "Year", "title": "Year" }
    ]
  }
};
