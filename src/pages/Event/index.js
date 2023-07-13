import { useState } from "react";
import { useParams } from "react-router";

import { data } from "../../db/data";

import "./index.css";

export function Event() {
    const { eventId } = useParams();
    const event = data.meetups.find((meetup) => meetup.id === eventId);
    const [rsvp, setRSVP] = useState(false);
    const [showRSVPForm, setShowRSVPForm] = useState(false);
    const currentTime = new Date();
    const eventStartTime = new Date(event.eventStartTime);

    return (
        <div className="container flex gap-48">
            <div className="info">
                <h2 className="info__title">{event.title}</h2>
                <p className="info__hosted">
                    Hosted by:{" "}
                    <span className="highlight">{event.hostedBy}</span>
                </p>
                <img
                    className="info__img"
                    src={event.eventThumbnail}
                    alt={event.title}
                />
                <h3 className="details">Details</h3>
                <p>{event.eventDescription}</p>
                <h3>Additional Information</h3>
                <p>
                    <span className="highlight">Dress Code:</span>{" "}
                    {event.additionalInformation.dressCode}
                </p>
                <p>
                    <span className="highlight">Age Restriction:</span>
                    {event.additionalInformation.ageRestrictions}
                </p>
                <h3>Event Tags</h3>
                <div className="flex tags">
                    {event.eventTags.map((tag) => (
                        <span className="tag">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="right-container ">
                <div className="location">
                    <div>
                        <span className="highlight">Time:</span>{" "}
                        {event.eventStartTime} to {event.eventEndTime}
                    </div>
                    <div>
                        <span className="highlight">Address:</span>{" "}
                        {event.address}
                    </div>
                    <div>
                        <span className="highlight">Price:</span> {event.price}
                    </div>
                </div>
                <div>
                    <h3>Speakers {event.speakers.length}</h3>
                    <div className="speakers">
                        {event.speakers.map((speaker) => (
                            <div className="speaker">
                                <img
                                    className="speaker__img"
                                    src={speaker.image}
                                />
                                <p className="highlight speaker__name">
                                    {speaker.name}
                                </p>
                                <p className="speaker__designatio">
                                    {speaker.designation}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="rsvp">
                    {rsvp ? (
                        <button className="button button--primary" disabled>
                            Already RSVP
                        </button>
                    ) : (
                        <div>
                            {currentTime < eventStartTime ? (
                                <button
                                    className="button button--primary"
                                    onClick={() => setShowRSVPForm(true)}
                                >
                                    RSVP
                                </button>
                            ) : (
                                <>
                                    <span className="highlight">RSVP: </span>
                                    <span>
                                        "Event has started, registration closed"
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div
                    className="modal"
                    style={{ display: showRSVPForm ? "block" : "none" }}
                >
                    <div className="modal__content">
                        <h3>Complete your RSVP</h3>
                        <span>Fill in your personal information</span>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label htmlFor="name">Email</label>
                            <input type="email" />
                        </div>
                        {event.isPaid ? (
                            <p>You have to make payment at the venue.</p>
                        ) : (
                            ""
                        )}
                        <button
                            className="button button--primary"
                            onClick={() => {
                                setRSVP(true);
                                setShowRSVPForm(false);
                            }}
                        >
                            RSVP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
