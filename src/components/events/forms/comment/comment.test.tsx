import { render } from '@testing-library/react';
import React from 'react';
import { mount } from 'enzyme';
import Comment, { Props } from './Comment';
import EventsRepository from '../../../../repositories/events';
import mockData from '../../../../repositories/mock/mockData';
import { RecoilRoot } from 'recoil';
import { userState, UserState } from '../../../../recoil/atoms/user';
import { act } from 'react-dom/test-utils';

describe('Comment.tsx', () => {
  const comment = mockData.eventComments[0];
  const props: Props = {
    eventId: 'abc',
  };
  const userRecoilState: UserState = {
    administratedEvents: [],
    attendingEvents: [],
    token: 'abc',
  };
  describe('Smoke tests', () => {
    it('should render Comment component', () => {
      render(
        <RecoilRoot>
          <Comment {...props} />
        </RecoilRoot>
      );
    });
  });
  describe('Black box tests', () => {
    it('should render text area for comment content', () => {
      const wrapper = mount(
        <RecoilRoot>
          <Comment {...props} />
        </RecoilRoot>
      );
      const textArea = wrapper.find('[data-test="text-area-comment"]');
      expect(textArea.exists()).toBe(true);
      const contentLabel = wrapper.find('[data-test="label-comment-content"]');
      expect(contentLabel.exists()).toBe(true);
    });
    it('should have a button to add comment', async () => {
      const repoSpy = jest
        .spyOn(EventsRepository.prototype, 'addEventComment')
        .mockResolvedValue({ data: { ...comment } });
      const wrapper = mount(
        <RecoilRoot initializeState={(snap) => snap.set(userState, { ...userRecoilState })}>
          <Comment {...props} />
        </RecoilRoot>
      );
      expect(repoSpy).toHaveBeenCalledTimes(0);
      const addCommentBtn = wrapper.find('[data-test="btn-add-comment"]');
      await act(async () => {
        addCommentBtn.simulate('click');
      });
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('White box tests', () => {
    it('should take an event id as a prop', () => {
      const wrapper = mount(
        <RecoilRoot initializeState={(snap) => snap.set(userState, { ...userRecoilState })}>
          <Comment {...props} />
        </RecoilRoot>
      );
      const comment = wrapper.find(Comment);
      expect(comment.props()).toStrictEqual(props);
    });
  });
});
