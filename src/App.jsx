import React, { useReducer, useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Star,
  Heart,
  Menu,
  X,
  Wifi,
  Car,
  Coffee,
  Waves,
  Dumbbell,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  SlidersHorizontal,
  Building2,
} from "lucide-react";

const hotels = [
  {
    id: 1,
    name: "The Grand Orchid",
    city: "Mumbai",
    area: "Bandra West",
    rating: 4.8,
    reviews: 328,
    price: 5499,
    type: "Luxury",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    description:
      "A stylish luxury stay with elegant rooms, rooftop dining and easy access to the city's best attractions.",
    amenities: ["Free Wi-Fi", "Breakfast", "Pool", "Parking"],
  },

  {
    id: 2,
    name: "SeaView Residency",
    city: "Goa",
    area: "Calangute",
    rating: 4.6,
    reviews: 241,
    price: 3899,
    type: "Resort",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    description:
      "Relax by the sea in a bright resort featuring a pool, spacious rooms and complimentary breakfast.",
    amenities: ["Free Wi-Fi", "Pool", "Breakfast", "Gym"],
  },

  {
    id: 3,
    name: "Urban Nest",
    city: "Bengaluru",
    area: "Indiranagar",
    rating: 4.5,
    reviews: 186,
    price: 2799,
    type: "Business",
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    description:
      "A modern city hotel designed for comfortable business and leisure stays.",
    amenities: ["Free Wi-Fi", "Parking", "Breakfast", "Gym"],
  },

  {
    id: 4,
    name: "Royal Palace Suites",
    city: "Jaipur",
    area: "C-Scheme",
    rating: 4.9,
    reviews: 412,
    price: 6999,
    type: "Luxury",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    description:
      "A heritage-inspired luxury property combining royal interiors with modern comforts.",
    amenities: ["Free Wi-Fi", "Pool", "Breakfast", "Parking"],
  },

  {
    id: 5,
    name: "Mountain Mist Inn",
    city: "Manali",
    area: "Old Manali",
    rating: 4.7,
    reviews: 155,
    price: 3199,
    type: "Resort",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
    description:
      "A peaceful mountain retreat with scenic views and cozy rooms.",
    amenities: ["Free Wi-Fi", "Breakfast", "Parking", "Gym"],
  },

  {
    id: 6,
    name: "CityLite Hotel",
    city: "Delhi",
    area: "Aerocity",
    rating: 4.3,
    reviews: 203,
    price: 2499,
    type: "Budget",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    description:
      "Affordable, comfortable rooms close to the airport and major business districts.",
    amenities: ["Free Wi-Fi", "Parking", "Breakfast"],
  },
];

const initialState = {
  bookings: [],
  favorites: [],
  selectedHotel: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "BOOK":
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };

    case "TOGGLE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter((id) => id !== action.payload)
          : [...state.favorites, action.payload],
      };

    case "SELECT_HOTEL":
      return {
        ...state,
        selectedHotel: action.payload,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [type, setType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(8000);
  const [sort, setSort] = useState("recommended");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingHotel, setBookingHotel] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const filteredHotels = hotels
    .filter((hotel) => {
      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        `${hotel.name} ${hotel.city} ${hotel.area}`
          .toLowerCase()
          .includes(query);

      const matchesType =
        type === "All" || hotel.type === type;

      const matchesPrice = hotel.price <= maxPrice;

      return matchesSearch && matchesType && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === "price") {
        return a.price - b.price;
      }

      if (sort === "rating") {
        return b.rating - a.rating;
      }

      return b.rating - a.rating;
    });

  const goHome = () => {
    setPage("home");
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openDetails = (hotel) => {
    dispatch({
      type: "SELECT_HOTEL",
      payload: hotel,
    });

    setPage("details");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const makeBooking = (hotel, guestName, room) => {
    const booking = {
      id: `ST-${Date.now().toString().slice(-7)}`,
      hotel: hotel.name,
      city: hotel.city,
      guestName,
      room,
      checkIn: checkIn || "2026-10-15",
      checkOut: checkOut || "2026-10-17",
      guests,
      total: hotel.price * 2,
    };

    dispatch({
      type: "BOOK",
      payload: booking,
    });

    setBookingHotel(null);
    setConfirmation(booking);
    setPage("bookings");
  };

  return (
    <div className="app">

      {/* NAVBAR */}

      <header className="navbar">

        <button className="brand" onClick={goHome}>
          <span className="brand-mark">S</span>
          StayNest
        </button>

        <nav className={mobileOpen ? "nav-links open" : "nav-links"}>

          <button
            className={page === "home" ? "active" : ""}
            onClick={goHome}
          >
            Explore
          </button>

          <button
            onClick={() => {
              setPage("bookings");
              setMobileOpen(false);
            }}
          >
            My Bookings

            {state.bookings.length > 0 && (
              <span className="count">
                {state.bookings.length}
              </span>
            )}
          </button>

        </nav>

        <button
          className="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>

        <button className="profile">
          CK
        </button>

      </header>

      {/* HOME */}

      {page === "home" && (
        <>
          <section className="hero">

            <div className="hero-content">

              <p className="eyebrow">
                TRAVEL BETTER • STAY HAPPIER
              </p>

              <h1>
                Find a stay you'll
                <br />
                <em>love coming back to.</em>
              </h1>

              <p className="hero-sub">
                Discover handpicked hotels, resorts and stays
                for every kind of trip.
              </p>

            </div>

          </section>

          {/* SEARCH */}

          <div className="search-wrap">

            <div className="search-panel">

              <div className="field destination">

                <MapPin />

                <div>
                  <label>Destination</label>

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="City, hotel or area"
                  />
                </div>

              </div>

              <div className="field">

                <CalendarDays />

                <div>
                  <label>Check in</label>

                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) =>
                      setCheckIn(e.target.value)
                    }
                  />
                </div>

              </div>

              <div className="field">

                <CalendarDays />

                <div>
                  <label>Check out</label>

                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) =>
                      setCheckOut(e.target.value)
                    }
                  />
                </div>

              </div>

              <div className="field">

                <Users />

                <div>
                  <label>Guests</label>

                  <select
                    value={guests}
                    onChange={(e) =>
                      setGuests(Number(e.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6].map((number) => (
                      <option key={number} value={number}>
                        {number} guest
                        {number > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              <button
                className="search-btn"
                onClick={() =>
                  document
                    .getElementById("results")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                <Search size={19} />
                Search
              </button>

            </div>

          </div>

          {/* HOTEL RESULTS */}

          <main className="content" id="results">

            <div className="section-head">

              <div>
                <p className="eyebrow">
                  EXPLORE STAYS
                </p>

                <h2>
                  {filteredHotels.length} properties available
                </h2>
              </div>

              <div className="sort-row">

                <SlidersHorizontal size={17} />

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                >
                  <option value="recommended">
                    Recommended
                  </option>

                  <option value="rating">
                    Top rated
                  </option>

                  <option value="price">
                    Price: low to high
                  </option>
                </select>

              </div>

            </div>

            {/* FILTERS */}

            <div className="filters">

              {[
                "All",
                "Luxury",
                "Resort",
                "Business",
                "Budget",
              ].map((category) => (

                <button
                  key={category}
                  className={
                    type === category
                      ? "filter active"
                      : "filter"
                  }
                  onClick={() =>
                    setType(category)
                  }
                >
                  {category}
                </button>

              ))}

              <label className="price-filter">

                Up to ₹
                {maxPrice.toLocaleString()}

                <input
                  type="range"
                  min="2000"
                  max="8000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Number(e.target.value))
                  }
                />

              </label>

            </div>

            {/* HOTEL CARDS */}

            <div className="hotel-grid">

              {filteredHotels.map((hotel) => (

                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  favorite={state.favorites.includes(
                    hotel.id
                  )}
                  onFavorite={() =>
                    dispatch({
                      type: "TOGGLE_FAVORITE",
                      payload: hotel.id,
                    })
                  }
                  onDetails={() =>
                    openDetails(hotel)
                  }
                  onBook={() =>
                    setBookingHotel(hotel)
                  }
                />

              ))}

            </div>

            {filteredHotels.length === 0 && (

              <div className="empty">

                <Building2 size={38} />

                <h3>No stays found</h3>

                <p>
                  Try changing your destination,
                  category or price range.
                </p>

              </div>

            )}

          </main>
        </>
      )}

      {/* DETAILS PAGE */}

      {page === "details" &&
        state.selectedHotel && (

          <Details
            hotel={state.selectedHotel}
            onBack={goHome}
            onBook={() =>
              setBookingHotel(
                state.selectedHotel
              )
            }
          />

        )}

      {/* BOOKINGS */}

      {page === "bookings" && (

        <Bookings
          bookings={state.bookings}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
          onExplore={goHome}
        />

      )}

      {/* FOOTER */}

      <footer>

        <div>
          <span className="brand-mark small">
            S
          </span>

          <strong> StayNest</strong>

          <p>
            Simple booking. Better stays.
          </p>
        </div>

        <div className="footer-links">
          <span>About</span>
          <span>Support</span>
          <span>Privacy</span>
          <span>Terms</span>
        </div>

        <p className="copyright">
          © 2026 StayNest
        </p>

      </footer>

      {/* BOOKING MODAL */}

      {bookingHotel && (

        <BookingModal
          hotel={bookingHotel}
          guests={guests}
          onClose={() =>
            setBookingHotel(null)
          }
          onConfirm={makeBooking}
        />

      )}

    </div>
  );
}


/* HOTEL CARD */

function HotelCard({
  hotel,
  favorite,
  onFavorite,
  onDetails,
  onBook,
}) {

  return (

    <article className="hotel-card">

      <div className="card-image">

        <img
          src={hotel.image}
          alt={hotel.name}
        />

        <button
          className={
            favorite
              ? "heart liked"
              : "heart"
          }
          onClick={onFavorite}
        >
          <Heart
            size={19}
            fill={
              favorite
                ? "currentColor"
                : "none"
            }
          />
        </button>

        <span className="type-badge">
          {hotel.type}
        </span>

      </div>

      <div className="card-body">

        <div className="hotel-title">

          <div>

            <h3>{hotel.name}</h3>

            <p>
              <MapPin size={14} />
              {hotel.area}, {hotel.city}
            </p>

          </div>

          <span className="rating">

            <Star
              size={14}
              fill="currentColor"
            />

            {hotel.rating}

          </span>

        </div>

        <p className="desc">
          {hotel.description}
        </p>

        <div className="amenities">

          {hotel.amenities
            .slice(0, 3)
            .map((amenity) => (

              <span key={amenity}>
                {amenity}
              </span>

            ))}

        </div>

        <div className="card-bottom">

          <div>

            <small>
              Starting from
            </small>

            <strong>
              ₹{hotel.price.toLocaleString()}

              <small>
                / night
              </small>
            </strong>

          </div>

          <div className="card-actions">

            <button
              className="outline-btn"
              onClick={onDetails}
            >
              Details
            </button>

            <button
              className="primary-btn"
              onClick={onBook}
            >
              Book
            </button>

          </div>

        </div>

      </div>

    </article>
  );
}


/* DETAILS */

function Details({
  hotel,
  onBack,
  onBook,
}) {

  return (

    <main className="details-page">

      <button
        className="back-btn"
        onClick={onBack}
      >
        <ArrowLeft size={17} />
        Back to stays
      </button>

      <div className="details-hero">

        <img
          src={hotel.image}
          alt={hotel.name}
        />

        <div className="details-overlay">

          <span className="type-badge">
            {hotel.type}
          </span>

          <h1>{hotel.name}</h1>

          <p>
            <MapPin size={16} />
            {hotel.area}, {hotel.city}
          </p>

        </div>

      </div>

      <div className="details-grid">

        <section>

          <div className="rating-large">

            <Star fill="currentColor" />

            <b>{hotel.rating}</b>

            <span>
              Excellent • {hotel.reviews} reviews
            </span>

          </div>

          <h2>
            About this stay
          </h2>

          <p className="large-copy">
            {hotel.description}
          </p>

          <h2>
            Popular amenities
          </h2>

          <div className="amenity-grid">

            <span>
              <Wifi />
              Free Wi-Fi
            </span>

            <span>
              <Coffee />
              Breakfast
            </span>

            <span>
              <Waves />
              Swimming pool
            </span>

            <span>
              <Dumbbell />
              Fitness centre
            </span>

            <span>
              <Car />
              Free parking
            </span>

            <span>
              <ShieldCheck />
              24/7 security
            </span>

          </div>

        </section>

        <aside className="price-box">

          <small>FROM</small>

          <strong>
            ₹{hotel.price.toLocaleString()}
          </strong>

          <span>
            per night
          </span>

          <button
            className="primary-btn full"
            onClick={onBook}
          >
            Reserve this stay
          </button>

          <p>
            <ShieldCheck size={15} />
            Free cancellation on selected rooms
          </p>

        </aside>

      </div>

    </main>
  );
}


/* BOOKING MODAL */

function BookingModal({
  hotel,
  guests,
  onClose,
  onConfirm,
}) {

  const [name, setName] = useState("");
  const [room, setRoom] =
    useState("Deluxe Room");

  return (

    <div
      className="modal-backdrop"
      onMouseDown={(event) => {

        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }

      }}
    >

      <div className="modal">

        <button
          className="close"
          onClick={onClose}
        >
          <X />
        </button>

        <p className="eyebrow">
          RESERVE YOUR STAY
        </p>

        <h2>{hotel.name}</h2>

        <p className="muted">
          {hotel.city} • {guests} guest
          {guests > 1 ? "s" : ""}
        </p>

        <div className="modal-room">

          <img
            src={hotel.image}
            alt={hotel.name}
          />

          <div>

            <b>
              Choose your room
            </b>

            <select
              value={room}
              onChange={(e) =>
                setRoom(e.target.value)
              }
            >
              <option>
                Deluxe Room
              </option>

              <option>
                Premium Suite
              </option>

              <option>
                Family Room
              </option>
            </select>

            <strong>
              ₹{hotel.price.toLocaleString()}
              {" "} / night
            </strong>

          </div>

        </div>

        <label className="modal-label">

          Guest name

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter your full name"
          />

        </label>

        <button
          className="primary-btn full"
          disabled={!name.trim()}
          onClick={() =>
            onConfirm(
              hotel,
              name,
              room
            )
          }
        >
          Confirm booking
        </button>

      </div>

    </div>
  );
}


/* BOOKINGS PAGE */

function Bookings({
  bookings,
  confirmation,
  setConfirmation,
  onExplore,
}) {

  return (

    <main className="bookings-page">

      {confirmation && (

        <div className="success">

          <CheckCircle2 />

          <div>

            <b>
              Booking confirmed!
            </b>

            <span>
              Your reservation{" "}
              {confirmation.id} is ready.
            </span>

          </div>

          <button
            onClick={() =>
              setConfirmation(null)
            }
          >
            ×
          </button>

        </div>

      )}

      <p className="eyebrow">
        YOUR TRAVEL
      </p>

      <h1>
        My Bookings
      </h1>

      {bookings.length === 0 ? (

        <div className="empty booking-empty">

          <CalendarDays size={45} />

          <h2>
            No bookings yet
          </h2>

          <p>
            When you reserve a hotel,
            your trips will appear here.
          </p>

          <button
            className="primary-btn"
            onClick={onExplore}
          >
            Explore hotels
          </button>

        </div>

      ) : (

        <div className="booking-list">

          {bookings.map((booking) => (

            <div
              className="booking-card"
              key={booking.id}
            >

              <div className="booking-icon">
                <Building2 />
              </div>

              <div className="booking-info">

                <div>

                  <span className="confirmed">
                    CONFIRMED
                  </span>

                  <small>
                    {booking.id}
                  </small>

                </div>

                <h2>
                  {booking.hotel}
                </h2>

                <p>
                  {booking.city} •{" "}
                  {booking.room}
                </p>

                <div className="booking-meta">

                  <span>
                    <CalendarDays />
                    {booking.checkIn}
                    {" → "}
                    {booking.checkOut}
                  </span>

                  <span>
                    <Users />
                    {booking.guests} guests
                  </span>

                  <span>
                    <Clock3 />
                    2 nights
                  </span>

                </div>

              </div>

              <div className="booking-total">

                <small>
                  Total
                </small>

                <strong>
                  ₹{booking.total.toLocaleString()}
                </strong>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}

export default App;