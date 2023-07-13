import { Link } from "react-router-dom";

import { data } from "../../db/data";

import "./index.css";

export function Home() {
    return (
        <div className="container">
            <div className="header">
                <h1 className="header__title">MeetUp</h1>
                <input
                    className="header__search"
                    type="search"
                    placeholder="Search by event title and tags"
                />
            </div>
            <div>
                <div className="header-options">
                    <h2>Meetup Events</h2>
                    <select>
                        <option value="both">Both</option>
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                    </select>
                </div>
                <div className="meetups">
                    {data.meetups.map((meetup) => (
                        <div key={meetup.id} className="meetup">
                            <Link
                                className="meetup__link"
                                to={`/event/${meetup.id}`}
                            >
                                <img
                                    className="meetup__thumbnail"
                                    src={meetup.eventThumbnail}
                                    alt={meetup.eventType}
                                />
                                <p className="meetup__time">
                                    {meetup.eventStartTime}
                                </p>
                                <p className="meetup__title">{meetup.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
