import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import CommentsModal, { Props } from './Comments';
import EventsRepository from '../../../../repositories/events';
import mockData from '../../../../repositories/mock/mockData';
import { RecoilRoot } from 'recoil';
import { act } from 'react-dom/test-utils';
import { CommentsState, eventCommentsState } from '../../../../recoil/atoms/comments';
import { userState, UserState } from '../../../../recoil/atoms/user';

describe('Comments.tsx', () => {
  const props: Props = {
    eventId: 'abc',
    closeModal: () => {},
    modalRef: 'my-modal',
    visible: true,
  };
  const recoilCommentState: CommentsState = {
    eventComments: [{ eventId: props.eventId, comments: [...mockData.eventComments] }],
  };
  const recoilUserState: UserState = {
    administratedEvents: [],
    attendingEvents: [],
    token: 'abc',
  };

  describe('Smoke tests', () => {
    it('should render CommentsModal component', () => {
      render(
        <RecoilRoot>
          <CommentsModal {...props} />
        </RecoilRoot>
      );
    });
  });
  describe('Black box tests', () => {
    it('should receive event id and receive base modal as a props', () => {
      const wrapper = mount(
        <RecoilRoot>
          <CommentsModal {...props} />
        </RecoilRoot>
      );
      const commentsModal = wrapper.find(CommentsModal);
      expect(commentsModal.props()).toStrictEqual(props);
    });
    it('should receive comments from event id when component loads', async () => {
      const eventSpy = jest.spyOn(EventsRepository.prototype, 'getEventComments').mockResolvedValue({ data: [] });
      expect(eventSpy).toHaveBeenCalledTimes(0);
      await act(async () => {
        mount(
          <RecoilRoot>
            <CommentsModal {...props} />
          </RecoilRoot>
        );
      });
      expect(eventSpy).toHaveBeenCalledTimes(1);
    });
    it('Should render a Comment component', () => {
      const wrapper = mount(
        <RecoilRoot initializeState={(snap) => snap.set(eventCommentsState, { ...recoilCommentState })}>
          <CommentsModal {...props} />
        </RecoilRoot>
      );
      const commentComponent = wrapper.find('[data-test="component-comment"]');
      expect(commentComponent.exists()).toBe(true);
      expect(commentComponent.length).toBe(2);
    });
    it('should have a base modal wrapper', () => {
      const wrapper = mount(
        <RecoilRoot>
          <CommentsModal {...props} />
        </RecoilRoot>
      );
      const baseModal = wrapper.find('[data-test="outer-modal"]');
      expect(baseModal.exists()).toBe(true);
    });
    describe('authorized user', () => {
      it('should have a button to create a new comment', () => {
        const wrapper = mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, { ...recoilUserState })}>
            <CommentsModal {...props} />
          </RecoilRoot>
        );
        const btnNewComment = wrapper.find('[data-test="btn-new-comment"]');
        expect(btnNewComment.exists()).toBe(true);
      });
      it('should render new comment form when clicked', () => {
        const wrapper = mount(
          <RecoilRoot initializeState={(snap) => snap.set(userState, { ...recoilUserState })}>
            <CommentsModal {...props} />
          </RecoilRoot>
        );
        let newCommentForm = wrapper.find('[data-test="form-comment"]');
        expect(newCommentForm.exists()).toBe(false);
        const btnNewComment = wrapper.find('[data-test="btn-new-comment"]');
        btnNewComment.simulate('click');
        newCommentForm = wrapper.find('[data-test="form-comment"]');
        expect(newCommentForm.exists()).toBe(true);
      });
    });
  });

  describe('White box tests', () => {});
});
