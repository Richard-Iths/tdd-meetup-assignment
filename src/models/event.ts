export interface Event {
  id: string;
  name: string;
  event_admin: string;
  description: string;
  created_at: string;
  updated_at: string;
  max_attendees: number;
  min_attendees: number;
  daley_visitors: number;
  place: string;
  time: string;
  date: string;
  due_date: string;
  image: string;
}

export interface EventComment {
  event_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  name: string;
  user_id: string;
}

export interface Event_Rating {
  user_id: string;
  event_id: string;
  rating: number;
}
