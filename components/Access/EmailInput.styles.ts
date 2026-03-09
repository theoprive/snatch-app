import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';

export const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    height: 56,
    overflow: 'hidden',
  },

  ghostOverlay: {
    position: 'absolute',
    left: 16,
    top: 0,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    pointerEvents: 'box-none',
    zIndex: 1,
  },

  ghostText: {
    fontFamily: Fonts.Regular,
    fontSize: 16,
    color: Colors.text,
    opacity: 0.3,
  },

  suggestionGhost: {
    fontFamily: Fonts.Regular,
    fontSize: 16,
    color: Colors.text,
    opacity: 0.5,
    paddingLeft: 2,
  },

  input: {
    flex: 1,
    height: '100%',
    fontFamily: Fonts.Regular,
    fontSize: 16,
    color: Colors.text,
    paddingLeft: 16,
    paddingRight: 0,
  },

  clearButton: {
    width: 32,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearText: {
    fontSize: 16,
    color: Colors.secondaryText,
  },

  arrowButton: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  arrowText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
