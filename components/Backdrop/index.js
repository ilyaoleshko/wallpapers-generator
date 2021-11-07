import { View } from "react-native";
import { styles } from "../../common/styles";

const Backdrop = ({ opacity = "0.15" }) => {
  return (
    <View
      style={[
        styles.backdrop,
        { backgroundColor: `rgba(0, 0, 0, ${opacity})` },
      ]}
    />
  );
};

export default Backdrop;
