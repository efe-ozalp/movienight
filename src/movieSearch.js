import fetch from "node-fetch"; // Only needed if Node <18
import 'dotenv/config';
const TMDB_KEY = process.env.TMDB_KEY;

const themeToGenreId = {
  romantic: 10749,
  romance: 10749,
  comedy: 35,
  funny: 35,
  thriller: 53,
  suspense: 53,
  "found family": 10751,
  family: 10751,
  action: 28,
  mystery: 9648,
  horror: 27,
  scary: 27,
  fantasy: 14,
  sciFi: 878,
  "sci-fi": 878,
  adventure: 12,
  drama: 18,
  crime: 80,
  documentary: 99,
  animation: 16,
  war: 10752,
  western: 37,
};

// ---------------------------
// Map an array of theme strings to genre IDs
// ---------------------------
function mapThemesToGenres(themes) {
  const genreIds = [];
  themes.forEach((theme) => {
    if (!theme) return;
    const t = theme.toLowerCase().trim();
    if (themeToGenreId[t]) genreIds.push(themeToGenreId[t]);
  });
  return genreIds;
}

// ---------------------------
// Search TMDB using top themes with votes
// Guarantees movies are returned
// ---------------------------
export async function searchMoviesByThemes(topThemesWithVotes) {
  // Sort themes by votes descending (most popular first)
  const remainingThemes = [...topThemesWithVotes].sort((a, b) => b.votes - a.votes);
  let movies = [];

  // 1️⃣ Try discover API using top genres, one at a time
  for (let i = 0; i < remainingThemes.length && movies.length === 0; i++) {
    const genreIds = mapThemesToGenres([remainingThemes[i].theme]);
    if (genreIds.length === 0) continue;

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=${genreIds[0]}`;
    console.log("Trying discover with genre:", remainingThemes[i].theme);
    console.log("URL:", url);

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        movies = data.results.slice(0, 10);
        break;
      }
    } catch (err) {
      console.error("Discover API error:", err);
    }
  }

  // 2️⃣ Fallback: search with all theme names as text
  if (movies.length === 0) {
    const query = topThemesWithVotes.map((t) => t.theme).join(" ");
    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`;
    console.log("Fallback search URL:", searchUrl);

    try {
      const res = await fetch(searchUrl);
      const data = await res.json();
      movies = data.results ? data.results.slice(0, 10) : [];
    } catch (err) {
      console.error("Fallback search error:", err);
    }
  }

  return movies;
}