import React from 'react';

import {BlogProvider} from '../context/BlogContext';
import {GameProvider} from '../context/GameContext';
import {PrompterProvider} from '../context/PrompterContext';
import {ShopProvider} from '../context/ShopContext';
import {WorkshopProvider} from '../context/WorkshopContext';
import {AppShell} from './AppShell';
import {NavigationProvider} from './NavigationContext';

export function AppNavigator() {
  return (
    <NavigationProvider>
      <PrompterProvider>
        <WorkshopProvider>
          <BlogProvider>
            <GameProvider>
              <ShopProvider>
                <AppShell />
              </ShopProvider>
            </GameProvider>
          </BlogProvider>
        </WorkshopProvider>
      </PrompterProvider>
    </NavigationProvider>
  );
}
