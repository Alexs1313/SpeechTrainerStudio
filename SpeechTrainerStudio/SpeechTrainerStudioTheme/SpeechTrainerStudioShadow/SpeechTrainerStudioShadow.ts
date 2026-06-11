import {Platform, ViewStyle} from 'react-native';

type SpeechTrainerStudioShadowStyle = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
>;

export function speechTrainerStudioShadow(
  style: SpeechTrainerStudioShadowStyle,
): ViewStyle {
  return Platform.OS === 'android' ? {} : style;
}
