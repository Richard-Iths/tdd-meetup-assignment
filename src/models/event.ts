export interface Event {
  name: string;
  event_admin: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  max_attendees: number;
  min_attendees: number;
  daley_visitors: number;
  place: string;
  time: string;
  date: Date;
  due_date: Date;
  image: string;
}

export interface EventComments {
  event_id: string;
  user_id: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
}
