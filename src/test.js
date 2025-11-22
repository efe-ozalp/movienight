import { searchMoviesByThemes } from "./moviesearch.js";

async function runTest() {
  const topThemesWithVotes = [
    { theme: "romantic", votes: 5 },
    { theme: "found family", votes: 3 },
    { theme: "thriller", votes: 2 },
    { theme: "slow burn", votes: 1 },
  ];

  console.log("FINAL TOP THEMES:", topThemesWithVotes.map((t) => t.theme));

  const movies = await searchMoviesByThemes(topThemesWithVotes);

  if (movies.length === 0) {
    console.log("No movies found.");
  } else {
    console.log("\nMOVIE RESULTS:");
    movies.forEach((m) => console.log("-", m.title));
  }
}

runTest();
