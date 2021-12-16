import React from 'react';
import { Event } from '../../../../../../models';
interface Props {
  event: Event;
}
const ListItem: React.FC<Props> = ({ event }) => {
  return <li></li>;
};

export default ListItem;
