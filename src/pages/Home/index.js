import { useState } from "react";
import { Link } from "react-router-dom";

import { data } from "../../db/data";

import "./index.css";

export function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [eventType, setEventType] = useState("Both");

    let filteredMeetups = data.meetups;

    function formatDate(string) {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
    }

    // filter by event type
    filteredMeetups =
        eventType === "Both"
            ? data.meetups
            : filteredMeetups.filter(
                  (meetup) => meetup.eventType === eventType
              );

    // filter by title
    filteredMeetups = filteredMeetups.filter((meetup) =>
        meetup.title.toLowerCase().includes(searchQuery?.toLowerCase())
    );

    // filter by tags
    filteredMeetups = filteredMeetups.filter((meetup) =>
        meetup.eventTags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div className="container">
            <div className="header">
                <h1 className="header__title">MeetUp</h1>
                <input
                    className="header__search"
                    type="search"
                    placeholder="Search by event title and tags"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
            </div>
            <div>
                <div className="header-options">
                    <h2>Meetup Events</h2>
                    <div>
                        Select Event Type:{" "}
                        <select
                            onChange={(event) =>
                                setEventType(event.target.value)
                            }
                        >
                            <option defaultChecked value="Both">
                                Both
                            </option>
                            <option value="Offline">Offline</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>
                </div>
                {filteredMeetups != undefined || filteredMeetups === "" ? (
                    <div className="meetups">
                        {filteredMeetups.map((meetup) => (
                            <div key={meetup.id} className="meetup">
                                <Link
                                    className="meetup__link link link--decor-none"
                                    to={`/event/${meetup.id}`}
                                >
                                    <img
                                        className="meetup__thumbnail"
                                        src={meetup.eventThumbnail}
                                        alt={meetup.eventType}
                                    />
                                    <p className="meetup__time">
                                        {formatDate(meetup.eventStartTime)}
                                    </p>
                                    <p className="meetup__title">
                                        {meetup.title}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
