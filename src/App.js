import "./App.css";
import { useState } from "react";
const tempMusicData = [
  {
    id: 111,
    title: "Vampire",
    artist: "Olivia Rodrigo",
    genre: "Pop",
  },
  {
    id: 211,
    title: "Into the night",
    artist: "Yoasobi",
    genre: "J-pop",
  },
  {
    id: 311,
    title: "Shout",
    artist: "TFF",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Cancer",
    artist: "MCR",
    genre: "Rock",
  },
  {
    id: 3,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    genre: "Pop",
  },
  {
    id: 4,
    title: "Shape of You",
    artist: "Ed Sheeran",
    genre: "Pop",
  },
  {
    id: 5,
    title: "Dance Monkey",
    artist: "Tones and I",
    genre: "Pop",
  },

  {
    id: 7,
    title: "Despacito",
    artist: "Luis Fonsi ft. Daddy Yankee",
    genre: "Pop",
  },
  {
    id: 8,
    title: "Bad Guy",
    artist: "Billie Eilish",
    genre: "Pop",
  },
  {
    id: 9,
    title: "Happy",
    artist: "Pharrell Williams",
    genre: "Pop",
  },
  {
    id: 10,
    title: "Old Town Road",
    artist: "Lil Nas X",
    genre: "Pop",
  },
  {
    id: 11,
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    genre: "Pop",
  },
  {
    id: 12,
    title: "Someone Like You",
    artist: "Adele",
    genre: "Pop",
  },
  {
    id: 13,
    title: "Hello",
    artist: "Adele",
    genre: "Pop",
  },
  {
    id: 14,
    title: "Shallow",
    artist: "Lady Gaga & Bradley Cooper",
    genre: "Pop",
  },
  {
    id: 15,
    title: "Closer",
    artist: "The Chainsmokers ft. Halsey",
    genre: "Pop",
  },
  {
    id: 16,
    title: "Sorry",
    artist: "Justin Bieber",
    genre: "Pop",
  },
  {
    id: 17,
    title: "Love Yourself",
    artist: "Justin Bieber",
    genre: "Pop",
  },
  {
    id: 18,
    title: "Roar",
    artist: "Katy Perry",
    genre: "Pop",
  },
  {
    id: 19,
    title: "Firework",
    artist: "Katy Perry",
    genre: "Pop",
  },
  {
    id: 20,
    title: "Wrecking Ball",
    artist: "Miley Cyrus",
    genre: "Pop",
  },
];
const tempPlaylist = [
  {
    id: 1,
    title: "Orange",
    artist: "7!",
    genre: "J-pop",
  },
  {
    id: 6,
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    genre: "Pop",
  },
];

function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMusic = (newMusic) => {
    setMusic([...music, newMusic]);
  };

  const addToPlaylist = (music) => {
    const isAlreadyInPlaylist = playlist.some((item) => item.id === music.id);

    if (!isAlreadyInPlaylist) {
      setPlaylist([...playlist, music]);
    } else {
      window.alert("This music is already in the playlist.");
    }
  };

  return (
    <>
      <NavBar onAddClick={() => setIsModalOpen(true)}>
        <NumResult music={music} />
      </NavBar>
      <AddMusicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMusic}
      />
      <Main>
        <Box>
          <Music music={music} addToPlaylist={addToPlaylist} />
        </Box>
        <Box title="PlayList">
          <Playlist playlist={playlist} />
        </Box>
      </Main>
    </>
  );
}

export default App;

function AddMusicModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = () => {
    const newMusic = {
      id: Math.floor(Math.random() * 1000),
      title,
      artist,
      genre,
    };
    onAdd(newMusic);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <br></br>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="newsong"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          className="newsong"
          onChange={(e) => setArtist(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          className="newsong"
          onChange={(e) => setGenre(e.target.value)}
        />
        <button className="add" onClick={handleSubmit}>
          Add <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

function NavBar({ children, onAddClick }) {
  return (
    <nav className="container">
      <Logo />

      <button className="add" onClick={onAddClick}>
        <i class="fas fa-plus"></i> Add Music
      </button>
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <h1 style={{ textAlign: "center" }}>
      <i class="fa-solid fa-music"></i> MusicKeep
    </h1>
  );
}
function NumResult({ music }) {
  return (
    <p>
      Total of <strong>{music.length}</strong> songs
    </p>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search songs..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Box({ children, title }) {
  return (
    <div className="container">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function Music({ music, addToPlaylist }) {
  const [sortBy, setSortBy] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const uniqueGenres = Array.from(new Set(music.map((item) => item.genre)));

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  const handleGenreFilter = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  let filteredMusic = music.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (sortBy === "artist") {
    filteredMusic.sort((a, b) => a.artist.localeCompare(b.artist));
  } else if (sortBy === "title") {
    filteredMusic.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (selectedGenre) {
    filteredMusic = filteredMusic.filter(
      (item) => item.genre === selectedGenre
    );
  }

  return (
    <div>
      <div>
        <h2>Music</h2>
        Search:{" "}
        <input
          className="search"
          type="text"
          placeholder="Search songs or artists..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <center>
          <p style={{ marginTop: -12 }}>{filteredMusic.length} results found</p>
        </center>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => handleSort("artist")}>Sort by Artist</button>
        <button onClick={() => handleSort("title")}>Sort by Title</button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <label htmlFor="genreFilter">Filter by Genre:</label>
        <select
          id="genreFilter"
          onChange={handleGenreFilter}
          value={selectedGenre}
        >
          <option value="">All Genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredMusic.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist} ({music.genre}){" "}
            <button className="fav" onClick={() => addToPlaylist(music)}>
              ♥️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Playlist({ playlist }) {
  return (
    <ul>
      {playlist.map((music) => (
        <li key={music.id}>
          {music.title} by {music.artist}
          <p>
            <span>🌟</span>
            <span>3</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
function Main({ children }) {
  return <div className="container">{children}</div>;
}
