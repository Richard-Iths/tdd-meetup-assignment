import { render } from '@testing-library/react';
import React from 'react';
import { mount, shallow } from 'enzyme';
import Comment, { Props } from './Comment';

describe('Comment.tsx', () => {
  const props: Props = {
    event_id: '123',
    comment: 'helllo',
    created_at: new Date('2010-11-11'),
    updated_at: new Date(),
    name: 'Kalle Grillkorv',
  };
  describe('Smoke tests', () => {
    it('Should render Comment component', () => {
      render(<Comment {...props} />);
    });
  });
  describe('Black box tests', () => {
    it('should receive EventCommon type props', () => {
      const wrapper = mount(<Comment {...props} />);
      expect(wrapper.props()).toStrictEqual(props);
    });

    it('should display created_at', () => {
      const wrapper = mount(<Comment {...props} />);
      const createdAt = wrapper.find('[data-test="comment-created-at"]');
      expect(createdAt.exists()).toBe(true);
      expect(createdAt.text().includes(props.created_at.toString())).toBe(true);
    });
    it('should display name', () => {
      const wrapper = mount(<Comment {...props} />);
      const name = wrapper.find('[data-test="comment-name"]');
      expect(name.exists()).toBe(true);
      expect(name.text()).toStrictEqual(props.name);
    });
    it('should display comment', () => {
      const wrapper = mount(<Comment {...props} />);
      const comment = wrapper.find('[data-test="comment-text"]');
      expect(comment.exists()).toBe(true);
      expect(comment.text()).toStrictEqual(props.comment);
    });
  });

  describe('White box tests', () => {});
});
