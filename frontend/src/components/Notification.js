const Notification = ({ addedMessage }) => {
  if (addedMessage === null) return null;
  return <div className="added-notification">{addedMessage}</div>;
};

export default Notification;
