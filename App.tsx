import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {SpeechTrainerStudioApp} from './SpeechTrainerStudioApp';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <SpeechTrainerStudioApp />
    </SafeAreaProvider>
  );
}

export default App;
