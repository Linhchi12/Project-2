// charts/spotifyAuGenreStreamsGrouped.js
// AU-only Spotify: 30-day streams by Genre, grouped by Platform (Free vs Premium)

export const spotifyAuGenreStreamsGroupedSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 720,
  "height": 460,
  "data": { "url": "data/Cleaned_Spotify_2024_Global_Streaming_Data.csv" },

  "transform": [
    { "filter": "lower(trim(datum.Country)) === 'australia'" },
    {
      "calculate": "toNumber(replace(datum['Streams Last 30 Days (Millions)'] + '', /,/g, ''))",
      "as": "Streams30"
    },
    {
      "aggregate": [{ "op": "sum", "field": "Streams30", "as": "Streams30_sum" }],
      "groupby": ["Genre", "Platform Type"]
    },
    // Total per genre for sorting
    {
      "joinaggregate": [{ "op": "sum", "field": "Streams30_sum", "as": "GenreTotal" }],
      "groupby": ["Genre"]
    }
  ],

  "mark": { "type": "bar", "cornerRadiusEnd": 2 },
  "encoding": {
    "y": {
      "field": "Genre",
      "type": "nominal",
      "sort": { "field": "GenreTotal", "order": "descending" },
      "title": "Genre"
    },
    "x": {
      "field": "Streams30_sum",
      "type": "quantitative",
      "title": "30-day streams (Millions)"
    },
    "color": {
      "field": "Platform Type",
      "type": "nominal",
      "title": "Platform"
    },
    "tooltip": [
      { "field": "Genre" },
      { "field": "Platform Type", "title": "Platform" },
      { "field": "Streams30_sum", "title": "30-day streams (M)", "format": ",.2f" },
      { "field": "GenreTotal", "title": "Genre total (M)", "format": ",.2f" }
    ]
  },
  "config": { "view": { "stroke": null } }
};
