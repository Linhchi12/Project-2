// Top artists in Australia by 30-day streams (using the global CSV + filter).
export const spotifyAuTopArtistsSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": 700, "height": 420,
  "data": { "url": "data/Cleaned_Spotify_2024_Global_Streaming_Data.csv" },
  "transform": [
    { "filter": "lower(trim(datum.Country)) === 'australia'" },
    { "calculate": "toNumber(datum['Streams Last 30 Days (Millions)'])", "as": "Streams30" },
    { "calculate": "toNumber(datum['Monthly Listeners (Millions)'])", "as": "MonthlyListeners" },
    { "window": [{ "op": "rank", "as": "rank" }], "sort": [{ "field": "Streams30", "order": "descending" }] },
    { "filter": "datum.rank <= 10" }
  ],
  "mark": { "type": "bar", "cornerRadiusEnd": 2 },
  "encoding": {
    "y": { "field": "Artist", "type": "nominal", "sort": "-x", "title": "Artist" },
    "x": { "field": "Streams30", "type": "quantitative", "title": "Streams (last 30 days, M)" },
    "tooltip": [
      { "field": "Artist" },
      { "field": "Album" },
      { "field": "Genre" },
      { "field": "Streams30", "title": "30-day Streams (M)", "format": ",.2f" },
      { "field": "MonthlyListeners", "title": "Monthly listeners (M)", "format": ",.2f" },
      { "field": "Skip Rate (%)", "title": "Skip rate (%)", "format": ",.1f" }
    ]
  },
  "config": { "view": { "stroke": null } }
};
