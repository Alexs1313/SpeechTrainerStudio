import {PrompterCategoryId, PrompterText} from './prompter';
import {WorkshopFilterId} from './workshop';

export type ShopText = PrompterText & {
  price: number;
};

export type ShopFilterId = WorkshopFilterId;
