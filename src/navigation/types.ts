export type AppPhase = 'Loader' | 'Onboarding' | 'Main';

export type MainTab =
  | 'PrompterTab'
  | 'WorkshopTab'
  | 'BlogTab'
  | 'TipsTab'
  | 'GameTab'
  | 'ShopTab';

export type AppOverlay =
  | {type: 'none'}
  | {type: 'PrompterConfigure'}
  | {type: 'PrompterSession'}
  | {type: 'PrompterResults'}
  | {type: 'WorkshopEditor'}
  | {type: 'BlogArticle'; articleId: string}
  | {type: 'GameChallenge'}
  | {type: 'GameResults'};
