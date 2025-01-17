import React, {Component} from 'react';
import permissionIcon from '@jetbrains/icons/permission';

import hubConfig from '../../.storybook/hub-config';

import reactDecorator from '../../.storybook/react-decorator';

import Auth from '@jetbrains/ring-ui/components/auth/auth';
import HTTP from '@jetbrains/ring-ui/components/http/http';
import List from '@jetbrains/ring-ui/components/list/list';
import Icon from '@jetbrains/ring-ui/components/icon/icon';


import QueryAssist from '@jetbrains/ring-ui/components/query-assist/query-assist';

export default {
  title: 'Components/Query Assist',
  decorators: [reactDecorator()],

  parameters: {
    component: QueryAssist,
    framework: 'react'
  },
  args: {
    // https://github.com/storybookjs/storybook/issues/12635#issuecomment-703392498
    theme: undefined,
    translations: undefined,
    placeholder: 'placeholder',
    glass: true,
    clear: true,
    hint: 'hint',
    hintOnSelection: 'hint on selection'
  },
  argTypes: {
    theme: {},
    translations: {}
  }
};

class Basic extends Component {
  constructor() {
    super();
    this.auth.init().then(() => this.setState({authReady: true}));
  }

  state = {authReady: false};
  auth = new Auth(hubConfig);
  http = new HTTP(this.auth, this.auth.getAPIPath());

  dataSource = props => {
    const params = {
      query: {
        ...props,
        fields: `query,caret,styleRanges${props.omitSuggestions ? '' : ',suggestions'}`
      }
    };

    return this.http.get('users/queryAssist', params);
  };

  render() {
    if (!this.state.authReady) {
      return <span>Loading...</span>;
    }

    return (
      <QueryAssist
        {...this.props}
        dataSource={this.dataSource}
      />
    );
  }
}
export const basic = args => <Basic {...args}/>;

basic.storyName = 'basic';
basic.parameters = {hermione: {skip: true}};
basic.args = {
  query: 'test',
  focus: true,
  hint: 'lol',
  hintOnSelection: 'lol selected',
  popupClassName: 'test'
};

export const noAuth = args => <QueryAssist {...args}/>;

noAuth.storyName = 'no auth';
noAuth.args = {
  dataSource: ({query, caret}) => ({
    query,
    caret,
    styleRanges: [
      {start: 0, length: 1, style: 'text'},
      {start: 1, length: 1, style: 'field_value'},
      {start: 2, length: 1, style: 'field_name'},
      {start: 3, length: 1, style: 'operator'}
    ],
    suggestions: [
      {
        prefix: 'login: ',
        option: 'test',
        suffix: ' ',
        description: '1',
        matchingStart: 0,
        matchingEnd: query.length,
        caret: 2,
        completionStart: 0,
        completionEnd: query.length,
        group: 'Logins'
      },
      {
        prefix: 'login: ',
        option: 'test.1',
        suffix: ' ',
        description: '2',
        matchingStart: 0,
        matchingEnd: query.length,
        caret: 2,
        completionStart: 0,
        completionEnd: query.length,
        group: 'Logins'
      },
      {
        prefix: 'name: ',
        option: 'another',
        suffix: ' ',
        description: '2',
        matchingStart: 0,
        matchingEnd: query.length,
        caret: 2,
        completionStart: 0,
        completionEnd: query.length,
        group: 'Names'
      }
    ]
  })
};
noAuth.parameters = {
  hermione: {
    actions: [
      {type: 'capture', name: 'queryAssist', selector: ['[data-test~=ring-query-assist]']},
      {type: 'click', selector: '[data-test=ring-query-assist-input]'},
      {type: 'sendKeys', selector: '[data-test=ring-query-assist-input]', value: 'test '},
      {
        type: 'capture',
        name: 'withPopup',
        selector: ['[data-test~=ring-query-assist]', '[data-test~=ring-query-assist-popup]']
      }
    ]
  }
};

const template = item =>
  React.createElement(
    'span',
    null,
    `My name is ${item.description}, my ${item.prefix} is ${item.option}`
  );

export const withCustomRenderer = args => <QueryAssist {...args}/>;

withCustomRenderer.args = {
  useCustomItemRender: true,
  dataSource: ({query, caret}) => ({
    query,
    caret,
    styleRanges: [
      {start: 0, length: 1, style: 'text'},
      {start: 1, length: 1, style: 'field_value'},
      {start: 2, length: 1, style: 'field_name'},
      {start: 3, length: 1, style: 'operator'}
    ],
    suggestions: [
      {
        prefix: 'login:',
        option: 'John.Abrams',
        description: 'John Abrams',
        group: 'Logins'
      },
      {
        prefix: 'login:',
        option: 'lenni',
        description: 'Lenni Joy',
        group: 'Names'
      }
    ].map(i => {
      i.rgItemType = List.ListProps.Type.CUSTOM;
      i.template = template(i);
      i.data = i;
      return i;
    })
  })
};
withCustomRenderer.storyName = 'with custom renderer';
withCustomRenderer.parameters = {hermione: {skip: true}};

export const darkThemeNoAuth = args => (
  <div style={{background: '#000', padding: '24px', margin: '-16px', paddingBottom: 0}}>
    <QueryAssist {...args}/>
  </div>
);

darkThemeNoAuth.args = {
  theme: QueryAssist.Theme.DARK,
  dataSource: ({query, caret}) => ({
    query,
    caret,
    styleRanges: [
      {start: 0, length: 1, style: 'text'},
      {start: 1, length: 1, style: 'field_value'},
      {start: 2, length: 1, style: 'field_name'},
      {start: 3, length: 1, style: 'operator'}
    ],
    suggestions: [
      {
        prefix: 'login: ',
        option: 'test',
        suffix: ' ',
        description: '1',
        matchingStart: 0,
        matchingEnd: query.length,
        caret: 2,
        completionStart: 0,
        completionEnd: query.length,
        group: 'logins'
      },
      {
        prefix: 'login: ',
        option: 'test.1',
        suffix: ' ',
        description: '2',
        matchingStart: 0,
        matchingEnd: query.length,
        caret: 2,
        completionStart: 0,
        completionEnd: query.length,
        group: 'logins'
      }
    ]
  })
};

darkThemeNoAuth.storyName = 'dark theme (no-auth)';

darkThemeNoAuth.parameters = {
  hermione: {
    actions: [
      {type: 'capture', name: 'queryAssist', selector: ['[data-test~=ring-query-assist]']},
      {type: 'click', selector: '[data-test=ring-query-assist-input]'},
      {
        type: 'capture',
        name: 'withPopup',
        selector: ['[data-test~=ring-query-assist]', '[data-test~=ring-query-assist-popup]']
      }
    ]
  }
};

class QueryAssistExample extends Component {
  constructor() {
    super();
    const auth = new Auth(hubConfig);
    this.http = new HTTP(auth, auth.getAPIPath());
    auth.init().then(() => this.setState({authReady: true}));
  }

  state = {authReady: false};

  dataSource = props => {
    const params = {
      query: {
        ...props,
        fields: `query,caret,styleRanges${props.omitSuggestions ? '' : ',suggestions'}`
      }
    };

    return this.http.get('users/queryAssist', params);
  };

  render() {
    if (!this.state.authReady) {
      return <span>Loading...</span>;
    }

    return (
      <QueryAssist
        {...this.props}
        dataSource={this.dataSource}
      />
    );
  }
}

export const withCustomActions = args => <QueryAssistExample {...args}/>;

withCustomActions.args = {
  query: 'test',
  focus: true,
  hint: 'lol',
  hintOnSelection: 'lol selected',
  popupClassName: 'test',
  actions: [<Icon glyph={permissionIcon} key="custom-action"/>]
};
withCustomActions.storyName = 'with custom actions';
withCustomActions.parameters = {hermione: {skip: true}};
