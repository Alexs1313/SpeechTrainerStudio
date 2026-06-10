import {PrompterCategoryId, PrompterText} from '../../SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter/SpeechTrainerStudioPrompter';
import {WorkshopFilterId} from '../../SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop/SpeechTrainerStudioWorkshop';

export type ShopText = PrompterText & {
  price: number;
};

export type ShopFilterId = WorkshopFilterId;
