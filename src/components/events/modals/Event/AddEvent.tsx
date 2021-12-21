import React, { useState } from 'react';
import { Event } from '../../../../models';
import Input, { Props as IInput } from '../../../input/Input';
import BaseModal, { Props as IBaseModal } from '../../../modals/BaseModal';

export interface Props extends IBaseModal {
  event?: Event;
}

const AddEvent: React.FC<Props> = ({ closeModal, visible, modalRef, event }) => {
  return <BaseModal {...{ visible, closeModal, modalRef }}></BaseModal>;
};

export default AddEvent;
