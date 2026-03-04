import Time "mo:core/Time";
import Order "mo:core/Order";
import Int "mo:core/Int";

actor {
  type Message = {
    senderRole : Text;
    content : Text;
    timestamp : Time.Time;
  };

  module Message {
    public func compare(message1 : Message, message2 : Message) : Order.Order {
      Int.compare(message1.timestamp, message2.timestamp);
    };
  };
};
