import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {SpeechTrainerStudioTabBar} from './SpeechTrainerStudio/SpeechTrainerStudioComponents/SpeechTrainerStudioTabs/SpeechTrainerStudioTabBar';
import {BlogStack} from './SpeechTrainerStudio/SpeechTrainerStudioScreens/SpeechTrainerStudioBlog/SpeechTrainerStudioBlogStack/SpeechTrainerStudioBlogStack';
import {PrompterStack} from './SpeechTrainerStudio/SpeechTrainerStudioScreens/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompterStack/SpeechTrainerStudioPrompterStack';
import {GameStack} from './SpeechTrainerStudio/SpeechTrainerStudioScreens/SpeechTrainerStudioGame/SpeechTrainerStudioGameStack/SpeechTrainerStudioGameStack';
import {ShopStack} from './SpeechTrainerStudio/SpeechTrainerStudioScreens/SpeechTrainerStudioShop/SpeechTrainerStudioShopStack/SpeechTrainerStudioShopStack';
import {DictionTipsScreen} from './SpeechTrainerStudio/SpeechTrainerStudioScreens/SpeechTrainerStudioTips/SpeechTrainerStudioDictionTipsScreen/SpeechTrainerStudioDictionTipsScreen';
import {WorkshopStack} from './SpeechTrainerStudio/SpeechTrainerStudioScreens/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshopStack/SpeechTrainerStudioWorkshopStack';

export type MainTabParamList = {
  Prompter: undefined;
  Workshop: undefined;
  Blog: undefined;
  Tips: undefined;
  Game: undefined;
  Shop: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export function SpeechTrainerStudioTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <SpeechTrainerStudioTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Prompter" component={PrompterStack} />
      <Tab.Screen name="Workshop" component={WorkshopStack} />
      <Tab.Screen name="Blog" component={BlogStack} />
      <Tab.Screen name="Tips" component={DictionTipsScreen} />
      <Tab.Screen name="Game" component={GameStack} />
      <Tab.Screen name="Shop" component={ShopStack} />
    </Tab.Navigator>
  );
}
