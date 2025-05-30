import { Calendar, ExternalLink, MapPin, Star, Ticket } from "lucide-react";
import EmailModal from "./EmailModal";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'

interface Event {
  title: string;
  date: {
    start_date: string;
    when: string;
  };
  address: string[];
  link: string;
  description: string;
  ticket_info: Array<{
    source: string;
    link: string;
    link_type: string;
  }>;
  venue: {
    name: string;
    rating: number;
    reviews: number;
  };
  thumbnail: string;
  image: string;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleGetTickets = (email: string) => {
    console.log(`Email captured: ${email} for event: ${event.title}`);
    setModalOpen(false)
    toast.success(`Event details for ${event.title} are send to email ${email}`)
  };

  const ticketSources = event.ticket_info.filter(info => info.link_type === 'tickets');

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image || event.thumbnail} 
            alt={event.title}
            className="w-full h-full object-cover"
            
          />
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-sm font-medium">
            {event.date.start_date}
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
          
          {/* Date and Time */}
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{event.date.when}</span>
          </div>

          {/* Location */}
          <div className="flex items-start text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <div className="font-medium">{event.venue.name}</div>
              <div>{event.address.join(', ')}</div>
            </div>
          </div>

          {/* Venue Rating */}
          <div className="flex items-center text-gray-600 mb-3">
            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
            <span className="text-sm font-medium mr-1">{event.venue.rating}</span>
            <span className="text-sm">({event.venue.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{event.description}</p>

          {/* Ticket Sources */}
          {ticketSources.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">Available on:</div>
              <div className="flex flex-wrap gap-1">
                {ticketSources.slice(0, 3).map((source, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {source.source}
                  </span>
                ))}
                {ticketSources.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    +{ticketSources.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setModalOpen(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
            >
              <Ticket className="w-4 h-4 mr-2" />
              Get Tickets
            </button>
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        <ToastContainer/>
      </div>

      <EmailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleGetTickets}
        eventTitle={event.title}
      />
    </>
  );
};

export default EventCard