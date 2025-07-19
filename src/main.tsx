import { render } from 'preact';
import { App } from '@/app';

render(
  <App />,
  (() => {
    const app = document.createElement('div');
    app.id = 'bili-tasks-app';
    document.body.append(app);
    console.log(11111)
    return app;
  })(),
);
