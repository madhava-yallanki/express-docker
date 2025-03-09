import { JSX } from 'react';
import { SurveySession } from './session.js';

export const Home = (): JSX.Element => {
  return (
    <div className="h-screen flex flex-col justify-center items-center p-4">
      <SurveySession />
    </div>
  );
};
