import { useState } from "react";

const EmailModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  eventTitle: string;
}> = ({ isOpen, onClose, onSubmit, eventTitle }) => {
  const [email, setEmail] = useState("");
  const [isOptedIn, setIsOptedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && isOptedIn) {
      onSubmit(email);
      setEmail("");
      setIsOptedIn(false);
      onClose();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">
          Get Tickets for {eventTitle}
        </h3>
        <div onSubmit={handleSubmitForm}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={isOptedIn}
                onChange={(e) => setIsOptedIn(e.target.checked)}
                className="mt-1"
                required
              />
              <span className="text-sm text-gray-600">
                I agree to receive event updates and promotional emails. You can
                unsubscribe at any time.
              </span>
            </label>
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitForm}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={!email || !isOptedIn}
            >
              Get Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
