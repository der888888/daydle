import { useEffect, useState } from "react";
import Doodle, { type DoodleType } from "./Doodle";



type CalendarEvent = {
  id: string;
  date: string;
  title: string;
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


const weekdays = [
  "Sun", "Mon", "Tue", "Wed",
  "Thu", "Fri", "Sat"
];



const doodleOptions: DoodleType[] = [
  "dog",
  "cake",
  "plane",
  "star",
  "smile",
  "tree",
];



function App() {
  
    const today = new Date();

    const [currentDate, setCurrentDate] = useState(
        () => new Date(today.getFullYear(), today.getMonth(), 1)
    );

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    
    const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const savedEvents = localStorage.getItem("daydle-events");

    if (!savedEvents) {
        return [];
    }

    try {
        const parsed: unknown = JSON.parse(savedEvents);

        if (!Array.isArray(parsed)) {
        return [];
        }

        return parsed.filter(
        (event): event is CalendarEvent =>
            typeof event === "object" &&
            event !== null &&
            typeof event.id === "string" &&
            typeof event.date === "string" &&
            typeof event.title === "string"
        );
    } catch (error) {
        console.error("Failed to load events:", error);
        return [];
    }
    });

    const [eventTitle, setEventTitle] = useState("");

    const [doodles, setDoodles] = useState<
    Record<string, DoodleType>
    >(() => {
    try {
        const saved = localStorage.getItem("daydle-doodles");

        if (!saved) return {};

        const parsed: unknown = JSON.parse(saved);

        if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
        ) {
        return {};
        }

        return Object.fromEntries(
        Object.entries(parsed).filter(
            ([date, type]) =>
            /^\d{4}-\d{2}-\d{2}$/.test(date) &&
            doodleOptions.includes(type as DoodleType)
        )
        ) as Record<string, DoodleType>;
    } catch {
        return {};
    }
    });


    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();


    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthName = currentDate.toLocaleString("en-US", {
        month: "long"
    });

    const emptyDays = Array.from(
        { length: firstDay },
        (_, index) => index
    );

    const days = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1
    );

    useEffect(() => {
    localStorage.setItem(
        "daydle-events",
        JSON.stringify(events)
    );
    }, [events]);


    useEffect(() => {
    localStorage.setItem(
        "daydle-doodles",
        JSON.stringify(doodles)
    );
    }, [doodles]);


    function changeMonth(offset: number) {
        setCurrentDate(
            new Date(year, month + offset, 1)
        );
        setSelectedDate(null);
    }

    function goToToday() {
        setCurrentDate(
            new Date(today.getFullYear(), today.getMonth(), 1)
        );
        setSelectedDate(null);
    }


    function selectDate(day: number) {
        setSelectedDate(new Date(year, month, day));
    }


    function deleteEvent(id: string) {
        setEvents((previous) =>
            previous.filter((event) => event.id !== id)
        );
    }


    function addEvent() {
    if (!selectedDate || !eventTitle.trim()) {
        return;
    }
    

    

    const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        date: formatDate(selectedDate),
        title: eventTitle.trim(),
    };

    setEvents((previous) => [...previous, newEvent]);
    setEventTitle("");
    }

    function updateDoodle(type: DoodleType | null) {
  if (!selectedDate) return;

  const dateKey = formatDate(selectedDate);

  setDoodles((previous) => {
    const updated = { ...previous };

    if (type === null) {
      delete updated[dateKey];
    } else {
      updated[dateKey] = type;
    }

    return updated;
  });
}


    return (
        <main className="calendar-app">
            
        <header className="calendar-header">
            <div className="month-heading">
                <h1>{monthName}</h1>
                <span>{year}</span>
            </div>

            <div className="calendar-controls">
                <button
                    type="button"
                    aria-label="Previous month"
                    onClick={() => changeMonth(-1)}
                >
                    ‹
                </button>

                <button
                    type="button"
                    className="today-button"
                    onClick={goToToday}
                >
                Today
                </button>

                <button
                type="button"
                aria-label="Next month"
                onClick={() => changeMonth(1)}
                >
                    ›
                </button>
            </div>
        </header>


            <div className="calendar-grid">
            {weekdays.map((day) => (
                <div className="weekday" key={day}>
                {day}
                </div>
            ))}

            {emptyDays.map((index) => (
                <div
                key={`empty-${index}`}
                className="day-cell empty"
                />
            ))}

            
            {days.map((day) => {
            const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

            const isSelected =
                selectedDate !== null &&
                day === selectedDate.getDate() &&
                month === selectedDate.getMonth() &&
                year === selectedDate.getFullYear();

            
            const dateKey = formatDate(new Date(year, month, day));

            const dayEvents = events.filter(
            (event) => event.date === dateKey
            );


            return (
                <button
                type="button"
                key={day}
                
                className={`day-cell
                ${isToday ? "today" : ""}
                ${isSelected ? "selected" : ""}
                ${doodles[dateKey] ? "has-doodle" : ""}
                `}

                onClick={() => selectDate(day)}
                aria-pressed={isSelected}
                aria-label={`${monthName} ${day}, ${year}`}
                >
                <span className="day-number">{day}</span>

                <div className="day-events">
                {dayEvents.slice(0, 2).map((event) => (              
                    <div
                    key={event.id}
                    className="day-event"
                    title={event.title}
                    >
                    {event.title}
                    </div>

                ))}

                {dayEvents.length > 2 && (
                    <span className="more-events">
                    +{dayEvents.length - 2} more
                    </span>
                )}
                </div>

                {doodles[dateKey] && (
                <Doodle
                    type={doodles[dateKey]}
                    className={`day-doodle doodle-${doodles[dateKey]}`}
                />
                )}


                </button>
            );
            })}

            </div>

{selectedDate && (
  <>
    <button
      type="button"
      className="panel-backdrop"
      aria-label="Close event panel"
      onClick={() => setSelectedDate(null)}
    />

    <aside
      className="event-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-panel-title"
    >
      <div className="panel-header">
        <div>
          <p className="panel-label">MY LITTLE PLANS ✿</p>

          <h2 id="event-panel-title">
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h2>

          <p className="panel-weekday">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </p>
        </div>

        <button
          type="button"
          className="close-panel"
          aria-label="Close"
          onClick={() => setSelectedDate(null)}
        >
          ×
        </button>
      </div>

      <div className="panel-divider" />

      <h3>Events</h3>

      <div className="selected-events">
        {events.filter(
          (event) =>
            event.date === formatDate(selectedDate)
        ).length === 0 ? (
          <p className="empty-message">
            Nothing planned yet. ☁
          </p>
        ) : (
          events
            .filter(
              (event) =>
                event.date === formatDate(selectedDate)
            )
            .map((event) => (
              <div className="panel-event" key={event.id}>
                <span className="event-dot" />
                <span>{event.title}</span>

                <button
                type="button"
                className="delete-event-btn"
                onClick={() => deleteEvent(event.id)}
                aria-label={`Delete ${event.title}`}
                title="Delete event"
                >
                ×
                </button>
              </div>
            ))
        )}
      </div>

    <section className="doodle-editor">
    <h3>Little doodles ✿</h3>

    <div className="doodle-options">
        <button
        type="button"
        className={`doodle-option ${
            !doodles[formatDate(selectedDate)] ? "active" : ""
        }`}
        onClick={() => updateDoodle(null)}
        aria-label="Remove doodle"
        >
        None
        </button>

        {doodleOptions.map((type) => (
        <button
            key={type}
            type="button"
            className={`doodle-option ${
            doodles[formatDate(selectedDate)] === type
                ? "active"
                : ""
            }`}
            onClick={() => updateDoodle(type)}
            aria-label={`Select ${type} doodle`}
            aria-pressed={
            doodles[formatDate(selectedDate)] === type
            }
        >
            <Doodle type={type} />
        </button>
        ))}
    </div>
    </section>

            <form
                className="event-form"
                onSubmit={(e) => {
                e.preventDefault();
                addEvent();
                }}
                >
                    <label htmlFor="event-title">
                    Add a little plan
                    </label>

                    <input
                    id="event-title"
                    type="text"
                    placeholder="What's your plan?"
                    value={eventTitle}
                    maxLength={80}
                    onChange={(e) => setEventTitle(e.target.value)}
                    />

                    <button type="submit" className="add-event-btn">
                    + Add event
                    </button>
                </form>
                </aside>
            </>
            )}
        </main>
    );
}

export default App;
