import { StyleSheet } from "react-native"
import { MyColor } from "./drawer/screen/Home"

export const globalStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    margin: 8,
    borderRadius: 15,
    padding: 8,
  },
  imgContainer: {
    paddingRight: 10,
  },
  thumbImg: {
    width: 90,
    aspectRatio: 1,
    borderRadius: 15,
    resizeMode: 'contain'
  },
  title: {
    fontWeight: '600',
  },
  radioDetails: {
    width: 120,
  },
  radioImg: {
    height: 150,
    width: 150,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  radioControl: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // zIndex: -1,
  },
  radioWrapper: {
    alignItems: 'center',
    // justifyContent: 'center',
    // zIndex: -1,
  },
  radioTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
  },
  radioDetailWr: {
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})